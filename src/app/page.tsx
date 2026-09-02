'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { AppShell, pageLeadClass, pageTitleClass } from '@/components/AppShell'
import { CameraCapture } from '@/components/upload/CameraCapture'
import { UploadArea } from '@/components/upload/UploadArea'
import { UploadStep } from '@/components/upload/UploadStep'
import { REQUIRED_VIEWS, VIEW_INSTRUCTIONS, VIEW_LABELS } from '@/context/UploadContext'

export default function Home() {
  const router = useRouter()
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const goToUpload = () => router.push('/upload')

  return (
    <>
      <AppShell>
        <UploadStep activeStep={1} />

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className={pageTitleClass}>
              Shoe wear <span className="text-primary">photos</span>
            </h1>
            <p className={pageLeadClass}>
              Photograph a running shoe from the side, sole, and top. Upload files or use the
              camera, then continue to review.
            </p>
          </div>

          <UploadArea onAdded={goToUpload} onUseCamera={() => setIsCameraOpen(true)} />

          <ol className="grid gap-3 sm:grid-cols-3">
            {REQUIRED_VIEWS.map((view, index) => (
              <li
                key={view}
                className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-surface-border dark:bg-surface-card"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    {VIEW_LABELS[view]}
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {VIEW_INSTRUCTIONS[view]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </AppShell>
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={(didCapture) => {
          setIsCameraOpen(false)
          if (didCapture) goToUpload()
        }}
        onComplete={() => {
          setIsCameraOpen(false)
          goToUpload()
        }}
      />
    </>
  )
}
