'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/Footer'
import { UploadStep } from '@/components/upload/UploadStep'
import { UploadedPhotoCard } from '@/components/upload/UploadedPhotoCard'
import { REQUIRED_VIEWS, VIEW_LABELS, useUpload, type RequiredView } from '@/context/UploadContext'

const VIEW_ALT: Record<RequiredView, string> = {
  side: 'Side View',
  sole: 'Sole View',
  top: 'Top View',
}

export default function AnalyzePage() {
  const { isComplete, state } = useUpload()
  const router = useRouter()

  useEffect(() => {
    if (!isComplete) {
      router.replace('/upload')
    }
  }, [isComplete, router])

  if (!isComplete) {
    return null
  }

  return (
    <div className="bg-background-page text-white font-sans min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full px-4 py-8 md:py-12">
        <div className="w-full max-w-5xl flex flex-col gap-10">
          <UploadStep activeStep={3} />

          <div className="flex flex-col gap-2 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Review Photos
            </h1>
            <p className="text-text-secondary">
              All three required views are ready. Wear analysis is not connected yet — this step
              confirms the capture flow instead of leaving you on a dead end.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REQUIRED_VIEWS.map((view) => (
              <UploadedPhotoCard
                key={view}
                alt={VIEW_ALT[view]}
                file={state[view]}
                viewName={VIEW_LABELS[view]}
              />
            ))}
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-card p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-accent">science</span>
              <h2 className="text-lg font-bold">Analysis placeholder</h2>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              AI wear detection is not implemented in this build. Your side, sole, and top photos
              stay in session so you can go back and recapture any view.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-white/5 border border-surface-border"
                type="button"
                onClick={() => router.push('/upload')}
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Back to photos
              </button>
              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white hover:shadow-lg hover:shadow-primary/25"
                type="button"
                onClick={() => router.push('/')}
              >
                Done
                <span className="material-symbols-outlined text-[18px]">home</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
