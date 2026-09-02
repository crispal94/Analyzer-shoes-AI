'use client'

import { Button } from '@heroui/button'
import { useRef, useState } from 'react'

import { useUpload } from '@/context/UploadContext'

interface UploadAreaProps {
  disabled?: boolean
  onAdded?: () => void
  onUseCamera?: () => void
}

export const UploadArea = ({ disabled, onAdded, onUseCamera }: UploadAreaProps) => {
  const { addFiles } = useUpload()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const takeFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList)

    if (disabled || files.length === 0) {
      return
    }

    addFiles(files)
    onAdded?.()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (disabled) return
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      takeFiles(e.dataTransfer.files)
    }
  }

  return (
    <div
      className={`relative ${disabled ? 'cursor-not-allowed' : ''}`}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        multiple
        accept="image/*"
        className="hidden"
        disabled={disabled}
        type="file"
        onChange={(e) => {
          const files = e.target.files ? Array.from(e.target.files) : []

          e.target.value = ''
          takeFiles(files)
        }}
      />
      <div
        className={`flex flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
          disabled
            ? 'border-zinc-200 bg-zinc-50 dark:border-surface-border dark:bg-surface-card/40'
            : isDragging
              ? 'border-primary bg-primary/5'
              : 'border-zinc-300 bg-white hover:border-primary/50 dark:border-surface-border dark:bg-surface-card/50 dark:hover:border-primary/50 dark:hover:bg-surface-card'
        }`}
      >
        <div
          className={`flex size-16 items-center justify-center rounded-full ${
            disabled
              ? 'bg-zinc-200 text-zinc-500 dark:bg-surface-border dark:text-zinc-400'
              : 'bg-primary/10 text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-3xl">
            {disabled ? 'check_circle' : 'cloud_upload'}
          </span>
        </div>
        <div className="flex max-w-md flex-col items-center gap-2 text-center">
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {disabled ? 'All three views are filled' : 'Drop photos or choose files'}
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {disabled
              ? 'Remove a view below if you need to replace a photo.'
              : 'JPG, PNG, WebP, or HEIC. Side, sole, and top views, up to 20MB each.'}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            className="font-semibold"
            color="primary"
            isDisabled={disabled}
            startContent={
              <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
            }
            onPress={() => fileInputRef.current?.click()}
          >
            Select files
          </Button>
          {onUseCamera && (
            <Button
              className="font-semibold"
              isDisabled={disabled}
              startContent={
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              }
              variant="bordered"
              onPress={onUseCamera}
            >
              Use camera
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
