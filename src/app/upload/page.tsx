'use client'

import { Navbar } from '@/components/navbar'
import { UploadStep } from '@/components/upload/UploadStep'
import { PhotographyTips } from '@/components/upload/PhotographyTips'
import { UploadArea } from '@/components/upload/UploadArea'
import { UploadedPhotoCard } from '@/components/upload/UploadedPhotoCard'
import { Footer } from '@/components/Footer'
import { useUpload } from '@/context/UploadContext'

export default function UploadPage() {
  const { files, removeFile } = useUpload()

  const placeholders = 3 - files.length
  const placeholderViews = ['Side View', 'Sole View', 'Top View'].slice(files.length)

  return (
    <div className="bg-background-page text-white font-sans min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full px-4 py-8 md:py-12">
        <div className="w-full max-w-5xl flex flex-col gap-10">
          <UploadStep />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar with Tips */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              <PhotographyTips />
            </div>

            {/* Main Upload Area */}
            <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Upload Photos
                </h1>
                <p className="text-text-secondary">
                  We need at least 3 photos to generate an accurate AI model.
                </p>
              </div>

              <UploadArea disabled={files.length >= 3} />

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-surface-border" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Uploaded ({files.length}/3)
                </span>
                <div className="h-[1px] flex-1 bg-surface-border" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {files.map((file, index) => (
                  <UploadedPhotoCard
                    key={index}
                    alt={file.name}
                    isReady={true}
                    src={URL.createObjectURL(file)}
                    viewName={`Photo ${index + 1}`}
                    onRemove={() => removeFile(index)}
                  />
                ))}
                {Array.from({ length: Math.max(0, placeholders) }).map((_, i) => (
                  <UploadedPhotoCard
                    key={`placeholder-${i}`}
                    alt=""
                    isPlaceholder={true}
                    src=""
                    viewName={placeholderViews[i] || 'Next Photo'}
                  />
                ))}
              </div>

              <div className="sticky bottom-4 md:static mt-4 flex items-center justify-between rounded-xl bg-surface-card/90 p-4 backdrop-blur-lg border border-surface-border shadow-2xl">
                <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Back
                </button>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs ${placeholders <= 0 ? 'text-accent' : 'text-text-secondary'} hidden sm:inline-block font-medium`}
                  >
                    {placeholders <= 0
                      ? 'All photos uploaded!'
                      : `${placeholders} photo${placeholders !== 1 ? 's' : ''} remaining`}
                  </span>
                  <button
                    className={`flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-bold transition-all ${
                      files.length >= 3
                        ? 'bg-primary text-white hover:shadow-lg hover:shadow-primary/25'
                        : 'bg-surface-border text-text-secondary cursor-not-allowed'
                    }`}
                    disabled={files.length < 3}
                  >
                    Next Step
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
