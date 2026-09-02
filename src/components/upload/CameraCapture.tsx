'use client'

import { Button } from '@heroui/button'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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

type CameraIssue = 'unsupported' | 'permission' | 'unavailable' | 'generic'

const blobToFile = (blob: Blob, view: RequiredView) =>
  new File([blob], `${view}-view-${Date.now()}.jpg`, { type: blob.type || 'image/jpeg' })

const classifyMediaError = (error: unknown): CameraIssue => {
  const name = error instanceof Error ? error.name : ''

  if (name === 'NotAllowedError' || name === 'SecurityError') {
    return 'permission'
  }

  if (
    name === 'NotFoundError' ||
    name === 'DevicesNotFoundError' ||
    name === 'OverconstrainedError' ||
    name === 'NotReadableError' ||
    name === 'TrackStartError'
  ) {
    return 'unavailable'
  }

  return 'generic'
}

const ISSUE_COPY: Record<CameraIssue, { title: string; body: string }> = {
  unsupported: {
    title: 'Camera is not available here',
    body: 'This browser cannot open a webcam. Choose a photo from your device instead.',
  },
  permission: {
    title: 'Camera permission blocked',
    body: 'Allow camera access in the browser prompt or site settings, then retry. You can also choose a photo from your files.',
  },
  unavailable: {
    title: 'No webcam found',
    body: 'Connect a camera or choose a photo from your device. Capture stays disabled until a live preview is available.',
  },
  generic: {
    title: 'Could not start the camera',
    body: 'Another app may be using it. Retry, or choose a photo from your device.',
  },
}

export const CameraCapture = ({ isOpen, onClose, onComplete }: CameraCaptureProps) => {
  const { assignFileToView, state } = useUpload()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const capturedRef = useRef(false)
  const filledRef = useRef<Set<RequiredView>>(new Set())
  const activeViewRef = useRef<RequiredView>('side')
  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  const [mounted, setMounted] = useState(false)
  const [activeView, setActiveView] = useState<RequiredView>('side')
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [issue, setIssue] = useState<CameraIssue | null>(null)
  const [isStarting, setIsStarting] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [hasPreview, setHasPreview] = useState(false)

  activeViewRef.current = activeView

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
      setIssue('unsupported')
      setIsStarting(false)

      return
    }

    setIsStarting(true)
    setIssue(null)
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
      } catch (constrainedError) {
        if (classifyMediaError(constrainedError) === 'permission') {
          throw constrainedError
        }

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

      setIssue(null)
    } catch (error) {
      setIssue(classifyMediaError(error))
    } finally {
      setIsStarting(false)
    }
  }, [facingMode, stopStream])

  const completeIfDone = useCallback(
    (filled: Set<RequiredView>) => {
      const next = REQUIRED_VIEWS.find((view) => !filled.has(view))

      if (!next) {
        stopStream()
        onCompleteRef.current()

        return true
      }

      setActiveView(next)

      return false
    },
    [stopStream]
  )

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    capturedRef.current = false
    filledRef.current = new Set(REQUIRED_VIEWS.filter((view) => Boolean(state[view])))
    completeIfDone(filledRef.current)
    // Snapshot filled slots only when the overlay opens.
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

  const takePhotoForView = (file: File, view: RequiredView) => {
    capturedRef.current = true
    filledRef.current.add(view)
    assignFileToView(file, view)
    completeIfDone(filledRef.current)
  }

  const handleCapture = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const view = activeViewRef.current

    if (!video || !canvas || video.readyState < 2) {
      return
    }

    setIsCapturing(true)

    try {
      canvas.width = video.videoWidth || 1280
      canvas.height = video.videoHeight || 720

      const context = canvas.getContext('2d')

      if (!context) {
        setIssue('generic')

        return
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.92)
      )

      if (!blob) {
        setIssue('generic')

        return
      }

      takePhotoForView(blobToFile(blob, view), view)
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

    takePhotoForView(file, activeViewRef.current)
  }

  if (!mounted || !isOpen) {
    return null
  }

  const filledCount = Math.max(
    filledRef.current.size,
    REQUIRED_VIEWS.filter((view) => Boolean(state[view])).length
  )
  const captureStep = Math.min(filledCount + 1, REQUIRED_VIEWS.length)
  const viewLabel = VIEW_LABELS[activeView]
  const canCapture = !isCapturing && hasPreview && !issue
  const canFlip = !isStarting && !issue && Boolean(navigator.mediaDevices?.getUserMedia)

  return createPortal(
    <div className="dark fixed inset-0 z-[200] flex h-dvh max-h-dvh flex-col overflow-hidden bg-background-page text-zinc-50">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-surface-border px-4 py-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Capture {captureStep} of {REQUIRED_VIEWS.length}
          </p>
          <h2 className="text-lg font-bold text-zinc-50">{viewLabel}</h2>
        </div>
        <Button isIconOnly aria-label="Close camera" variant="light" onPress={handleDismiss}>
          <span className="material-symbols-outlined">close</span>
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        <p className="text-sm text-zinc-300">{VIEW_INSTRUCTIONS[activeView]}</p>

        <div className="relative mx-auto aspect-[4/3] w-full max-h-[46dvh] max-w-3xl overflow-hidden rounded-xl border border-surface-border bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`absolute inset-0 h-full w-full object-cover ${
              facingMode === 'user' ? 'scale-x-[-1]' : ''
            } ${hasPreview ? 'opacity-100' : 'opacity-0'}`}
          />
          <canvas ref={canvasRef} className="hidden" />
          {isStarting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm text-zinc-300">
              Starting camera…
            </div>
          )}
          {!isStarting && issue && (
            <div
              aria-live="polite"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 px-6 text-center"
              role="status"
            >
              <span className="material-symbols-outlined text-[40px] text-zinc-400">
                {issue === 'permission' ? 'videocam_off' : 'no_photography'}
              </span>
              <p className="text-base font-bold text-zinc-50">{ISSUE_COPY[issue].title}</p>
              <p className="max-w-md text-sm leading-relaxed text-zinc-300">
                {ISSUE_COPY[issue].body}
              </p>
              <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                {issue !== 'unsupported' && (
                  <Button
                    className="font-semibold"
                    variant="bordered"
                    onPress={() => void startStream()}
                  >
                    Retry camera
                  </Button>
                )}
                <Button
                  className="font-semibold"
                  color="primary"
                  onPress={() => fileInputRef.current?.click()}
                >
                  Choose photo
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            className="font-semibold"
            isDisabled={!canFlip}
            startContent={
              <span className="material-symbols-outlined text-[20px]">cameraswitch</span>
            }
            variant="light"
            onPress={() =>
              setFacingMode((current) => (current === 'environment' ? 'user' : 'environment'))
            }
          >
            Flip camera
          </Button>
          <Button
            className="font-semibold"
            startContent={
              <span className="material-symbols-outlined text-[20px]">photo_library</span>
            }
            variant="light"
            onPress={() => fileInputRef.current?.click()}
          >
            Choose photo
          </Button>
        </div>
      </div>

      <div className="shrink-0 border-t border-surface-border bg-surface-card/90 px-4 py-4 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
          <Button className="font-semibold" variant="light" onPress={handleDismiss}>
            Cancel
          </Button>
          <div className="flex flex-col items-end gap-1">
            {!canCapture && (
              <p className="text-xs text-zinc-400">
                {isCapturing ? 'Saving still…' : 'Live preview required to capture'}
              </p>
            )}
            <Button
              className="font-semibold"
              color="primary"
              isDisabled={!canCapture}
              startContent={
                <span className="material-symbols-outlined text-[22px]">photo_camera</span>
              }
              onPress={() => void handleCapture()}
            >
              Capture {viewLabel}
            </Button>
          </div>
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
