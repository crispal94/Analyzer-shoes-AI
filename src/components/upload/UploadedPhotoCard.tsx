import Image from 'next/image'

interface UploadedPhotoCardProps {
  src: string
  alt: string
  viewName: string
  isReady?: boolean
  isPlaceholder?: boolean
  onRemove?: () => void
}

export const UploadedPhotoCard = ({
  src,
  alt,
  viewName,
  isReady,
  isPlaceholder,
  onRemove,
}: UploadedPhotoCardProps) => {
  if (isPlaceholder) {
    return (
      <div className="relative rounded-xl border-2 border-dashed border-surface-border bg-surface-card/30 aspect-[4/3] flex flex-col items-center justify-center gap-2 group hover:border-text-secondary/50 transition-colors">
        <span className="material-symbols-outlined text-text-secondary group-hover:text-white transition-colors">
          add_photo_alternate
        </span>
        <span className="text-xs font-medium text-text-secondary">{viewName}</span>
      </div>
    )
  }

  return (
    <div className="relative group overflow-hidden rounded-xl border border-surface-border bg-surface-card aspect-[4/3] shadow-hero">
      <Image
        fill
        alt={alt}
        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={src}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 z-10">
        <span className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
          {viewName}
        </span>
        <button
          className="size-8 rounded-full bg-white/10 hover:bg-red-500/90 text-white backdrop-blur-md flex items-center justify-center transition-colors"
          onClick={onRemove}
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
      {isReady && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 bg-accent text-black backdrop-blur-md px-2 py-1 rounded-full shadow-lg shadow-accent/20">
            <span className="material-symbols-outlined text-[14px] filled">check_circle</span>
            <span className="text-[10px] font-bold uppercase tracking-wide">Ready</span>
          </div>
        </div>
      )}
    </div>
  )
}
