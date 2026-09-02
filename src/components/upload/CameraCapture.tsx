'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  isImageFile,
  REQUIRED_VIEWS,
  VIEW_INSTRUCTIONS,
  VIEW_LABELS,
  useUpload,
  type RequiredView,
} from '@/context/UploadContext'

interface CameraCaptureProps {
  isOpen: boolean
  onClose: (didCapture: boolean) => void
  onComplete: () => void
}

const blobToFile = (blob: Blob, view: RequiredView) =>
  new File([blob], `${view}-view-${Date.now()}.jpg`, { type: blob.type || 'image/jpeg' })

export const CameraCapture = ({ isOpen, onClose, onComplete }: CameraCaptureProps) => {
  const { assignFileToView, nextEmptyView, state } = useUpload()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const capturedRef = useRef(false)

  const [mounted, setMounted] = useState(false)
  const [activeView, setActiveView] = useState<RequiredView>('side')
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [error, setError] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [hasPreview, setHasPreview] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setHasPreview(false)
  }, [])

  const startStream = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera is not supported in this browser. You can still choose a photo instead.')

      return
    }

    setIsStarting(true)
    setError(null)
    stopStream()

    try {
      let stream: MediaStream

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: facingMode },
            height: { ideal: 1080 },
            width: { ideal: 1920 },
          },
        })
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        })
      }

      streamRef.current = stream

      const video = videoRef.current

      if (video) {
        video.srcObject = stream
        await video.play()
        setHasPreview(true)
      }

      setError(null)
    } catch {
      setError(
        'Could not access the camera. Check browser permissions, or choose a photo from your device.'
      )
    } finally {
      setIsStarting(false)
    }
  }, [facingMode, stopStream])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    capturedRef.current = false

    if (!nextEmptyView) {
      onComplete()

      return
    }

    setActiveView(nextEmptyView)
    // Only reset the active view when the overlay opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      stopStream()

      return
    }

    void startStream()

    return () => {
      stopStream()
    }
  }, [facingMode, isOpen, startStream, stopStream])

  const handleDismiss = () => {
    stopStream()
    onClose(capturedRef.current)
  }

  const advanceAfterCapture = (view: RequiredView) => {
    capturedRef.current = true

    const remaining = REQUIRED_VIEWS.filter((item) => item !== view && !state[item])

    if (remaining.length === 0) {
      stopStream()
      onComplete()

      return
    }

    setActiveView(remaining[0])
  }

  const handleCapture = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas || video.readyState < 2) {
      return
    }

    setIsCapturing(true)

    try {
      canvas.width = video.videoWidth || 1280
      canvas.height = video.videoHeight || 720

      const context = canvas.getContext('2d')

      if (!context) {
        setError('Could not capture a still from the camera.')

        return
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.92)
      )

      if (!blob) {
        setError('Could not capture a still from the camera.')

        return
      }

      assignFileToView(blobToFile(blob, activeView), activeView)
      advanceAfterCapture(activeView)
    } finally {
      setIsCapturing(false)
    }
  }

  const handleFallbackFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    e.target.value = ''

    if (!file || !isImageFile(file)) {
      return
    }

    assignFileToView(file, activeView)
    advanceAfterCapture(activeView)
  }

  if (!mounted || !isOpen) {
    return null
  }

  const filledCount = REQUIRED_VIEWS.filter((view) => Boolean(state[view])).length
  const captureStep = Math.min(filledCount + 1, REQUIRED_VIEWS.length)
  const viewLabel = VIEW_LABELS[activeView]

  return createPortal(
    <div className="fixed inset-0 z-[200] flex flex-col bg-background-page text-white">
      <div className="flex items-center justify-between gap-3 border-b border-surface-border px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">
            Capture {captureStep} of {REQUIRED_VIEWS.length}
          </p>
          <h2 className="text-lg font-bold">{viewLabel}</h2>
        </div>
        <button
          aria-label="Close camera"
          className="flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/5"
          type="button"
          onClick={handleDismiss}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        <p className="text-sm text-text-secondary">{VIEW_INSTRUCTIONS[activeView]}</p>

        <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-surface-border bg-black aspect-[4/3]">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`absolute inset-0 h-full w-full object-cover ${
              facingMode === 'user' ? 'scale-x-[-1]' : ''
            }`}
          />
          <canvas ref={canvasRef} className="hidden" />
          {isStarting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm text-text-secondary">
              Starting camera…
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-sm text-text-secondary">
            {error}
          </div>
        )}

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-white/5"
            type="button"
            onClick={() =>
              setFacingMode((current) => (current === 'environment' ? 'user' : 'environment'))
            }
          >
            <span className="material-symbols-outlined text-[20px]">cameraswitch</span>
            Flip Camera
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-white/5"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined text-[20px]">photo_library</span>
            Choose Photo
          </button>
        </div>
      </div>

      <div className="border-t border-surface-border bg-surface-card/90 px-4 py-4 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
          <button
            className="rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-white/5"
            type="button"
            onClick={handleDismiss}
          >
            Cancel
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:bg-surface-border disabled:text-text-secondary"
            disabled={isCapturing || !hasPreview}
            type="button"
            onClick={() => void handleCapture()}
          >
            <span className="material-symbols-outlined text-[22px]">photo_camera</span>
            Capture {viewLabel}
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFallbackFile}
      />
    </div>,
    document.body
  )
}
