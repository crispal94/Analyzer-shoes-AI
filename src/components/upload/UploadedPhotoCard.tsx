'use client'

import { useRef } from 'react'

import { isImageFile } from '@/context/UploadContext'
import { useObjectUrl } from '@/hooks/useObjectUrl'

interface UploadedPhotoCardProps {
  file: File | null
  alt: string
  viewName: string
  description?: string
  onAssign?: (file: File) => void
  onRemove?: () => void
}

export const UploadedPhotoCard = ({
  file,
  alt,
  viewName,
  description,
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
        className="group relative flex aspect-[4/3] min-h-[7.5rem] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-3 text-center outline-none transition-colors hover:border-zinc-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-surface-border dark:bg-surface-card/30 dark:hover:border-zinc-500 dark:focus-visible:ring-offset-background-page"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        <span className="material-symbols-outlined text-zinc-500 group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-50">
          add_photo_alternate
        </span>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{viewName}</span>
        {description && (
          <span className="hidden text-[11px] leading-snug text-zinc-500 sm:block dark:text-zinc-400">
            Tap to add
          </span>
        )}
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
    <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-900 shadow-hero dark:border-surface-border">
      <div className="absolute inset-0 z-0">
        {/* User-uploaded blob URLs are not valid next/image sources */}
        <img
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-110 object-cover opacity-60 blur-xl grayscale-[20%]"
          src={src}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute inset-0 z-10 p-2">
        <img alt={alt} className="h-full w-full object-contain drop-shadow-2xl" src={src} />
      </div>

      <div className="absolute inset-0 z-30 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-3 opacity-100 md:opacity-0 md:group-hover:opacity-100">
        <span className="rounded bg-black/50 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {viewName}
        </span>
        {onRemove && (
          <button
            aria-label={`Remove ${viewName}`}
            className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white outline-none backdrop-blur-md transition-colors hover:bg-red-500/90 focus-visible:ring-2 focus-visible:ring-white"
            type="button"
            onClick={onRemove}
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        )}
      </div>
      <div className="absolute right-3 top-3 z-40">
        <div className="flex items-center gap-1.5 rounded-full bg-accent px-2 py-1 text-black shadow-md">
          <span className="material-symbols-outlined filled text-[14px]">check_circle</span>
          <span className="text-[10px] font-bold uppercase tracking-wide">Ready</span>
        </div>
      </div>
    </div>
  )
}
