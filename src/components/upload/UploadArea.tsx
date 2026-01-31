import { useRef, useState } from 'react'
import { useUpload } from '@/context/UploadContext'

interface UploadAreaProps {
  disabled?: boolean
}

export const UploadArea = ({ disabled }: UploadAreaProps) => {
  const { addFiles } = useUpload()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (disabled) return

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      addFiles(droppedFiles)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      addFiles(selectedFiles)
      e.target.value = ''
    }
  }

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div
      className={`relative group ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept="image/*"
        onChange={handleFileInput}
      />
      <div
        className={`absolute inset-0 bg-primary/5 rounded-xl blur-xl opacity-0 transition-opacity duration-500 ${isDragging ? 'opacity-100' : 'group-hover:opacity-100'}`}
      ></div>
      <div
        className={`relative flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-surface-border bg-surface-card/50 px-6 py-12 transition-all ${isDragging ? 'border-primary bg-surface-card' : 'group-hover:border-primary/50 group-hover:bg-surface-card'}`}
      >
        <div
          className={`size-16 rounded-full bg-surface-border flex items-center justify-center text-primary mb-2 transition-transform duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}
        >
          <span className="material-symbols-outlined text-3xl">cloud_upload</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-white text-lg font-bold">Click or drag files to upload</p>
          <p className="text-text-secondary text-sm max-w-xs">
            Supported formats: JPG, PNG, HEIC (Max 20MB)
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-3 transition-colors mt-2 shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
          <span>Select Files</span>
        </button>
      </div>
    </div>
  )
}
