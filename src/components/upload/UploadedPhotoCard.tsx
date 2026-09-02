'use client'

import { useRef } from 'react'

import { isImageFile } from '@/context/UploadContext'
import { useObjectUrl } from '@/hooks/useObjectUrl'

interface UploadedPhotoCardProps {
  file: File | null
  alt: string
  viewName: string
  onAssign?: (file: File) => void
  onRemove?: () => void
}

export const UploadedPhotoCard = ({
  file,
  alt,
  viewName,
  onAssign,
  onRemove,
}: UploadedPhotoCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const src = useObjectUrl(file)

  const handleAssign = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = e.target.files?.[0]

    e.target.value = ''

    if (nextFile && isImageFile(nextFile)) {
      onAssign?.(nextFile)
    }
  }

  if (!file) {
    return (
      <button
        className="relative rounded-xl border-2 border-dashed border-surface-border bg-surface-card/30 aspect-[4/3] flex flex-col items-center justify-center gap-2 group hover:border-text-secondary/50 transition-colors"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        <span className="material-symbols-outlined text-text-secondary group-hover:text-white transition-colors">
          add_photo_alternate
        </span>
        <span className="text-xs font-medium text-text-secondary">{viewName}</span>
        <input
          ref={inputRef}
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleAssign}
          onClick={(e) => e.stopPropagation()}
        />
      </button>
    )
  }

  return (
    <div className="relative group overflow-hidden rounded-xl border border-surface-border bg-neutral-900 aspect-[4/3] shadow-hero">
      <div className="absolute inset-0 z-0">
        {/* User-uploaded blob URLs are not valid next/image sources */}
        <img
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover blur-xl scale-110 opacity-60 grayscale-[20%]"
          src={src}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute inset-0 z-10 p-2">
        <img
          alt={alt}
          className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
          src={src}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 z-30">
        <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
          {viewName}
        </span>
        {onRemove && (
          <button
            aria-label={`Remove ${viewName}`}
            className="size-8 rounded-full bg-white/10 hover:bg-red-500/90 text-white backdrop-blur-md flex items-center justify-center transition-colors"
            type="button"
            onClick={onRemove}
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        )}
      </div>
      <div className="absolute top-3 right-3 z-40">
        <div className="flex items-center gap-1.5 bg-accent text-black backdrop-blur-md px-2 py-1 rounded-full shadow-lg shadow-accent/20">
          <span className="material-symbols-outlined text-[14px] filled">check_circle</span>
          <span className="text-[10px] font-bold uppercase tracking-wide">Ready</span>
        </div>
      </div>
    </div>
  )
}
