'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/Footer'
import { CameraCapture } from '@/components/upload/CameraCapture'
import { PhotographyTips } from '@/components/upload/PhotographyTips'
import { UploadArea } from '@/components/upload/UploadArea'
import { UploadedPhotoCard } from '@/components/upload/UploadedPhotoCard'
import { UploadStep } from '@/components/upload/UploadStep'
import { REQUIRED_VIEWS, VIEW_LABELS, useUpload, type RequiredView } from '@/context/UploadContext'

const VIEW_ALT: Record<RequiredView, string> = {
  side: 'Side View',
  sole: 'Sole View',
  top: 'Top View',
}

export default function UploadPage() {
  const { assignFileToView, isComplete, removeFile, requiredCount, state } = useUpload()
  const router = useRouter()
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  return (
    <div className="bg-background-page text-white font-sans min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full px-4 py-8 md:py-12">
        <div className="w-full max-w-5xl flex flex-col gap-10">
          <UploadStep activeStep={2} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              <PhotographyTips />
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Upload Photos
                </h1>
                <p className="text-text-secondary">
                  We need at least 3 photos to generate an accurate AI model.
                </p>
              </div>

              <UploadArea disabled={isComplete} onUseCamera={() => setIsCameraOpen(true)} />

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-surface-border" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Uploaded ({requiredCount}/3)
                </span>
                <div className="h-[1px] flex-1 bg-surface-border" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {REQUIRED_VIEWS.map((view) => (
                  <UploadedPhotoCard
                    key={view}
                    alt={VIEW_ALT[view]}
                    file={state[view]}
                    viewName={VIEW_LABELS[view]}
                    onAssign={(file) => assignFileToView(file, view)}
                    onRemove={state[view] ? () => removeFile(view) : undefined}
                  />
                ))}
              </div>

              <div className="sticky bottom-4 md:static mt-4 flex items-center justify-between rounded-xl bg-surface-card/90 p-4 backdrop-blur-lg border border-surface-border shadow-2xl">
                <button
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-white/5 transition-colors"
                  type="button"
                  onClick={() => router.push('/')}
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Back
                </button>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs ${
                      isComplete ? 'text-accent' : 'text-text-secondary'
                    } hidden sm:inline-block font-medium`}
                  >
                    {isComplete
                      ? 'All photos uploaded!'
                      : `${3 - requiredCount} photo${3 - requiredCount !== 1 ? 's' : ''} remaining`}
                  </span>
                  <button
                    className={`flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-bold transition-all ${
                      isComplete
                        ? 'bg-primary text-white hover:shadow-lg hover:shadow-primary/25'
                        : 'bg-surface-border text-text-secondary cursor-not-allowed'
                    }`}
                    disabled={!isComplete}
                    type="button"
                    onClick={() => {
                      if (isComplete) router.push('/analyze')
                    }}
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
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onComplete={() => setIsCameraOpen(false)}
      />
    </div>
  )
}
