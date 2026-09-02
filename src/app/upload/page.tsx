'use client'

import { Button } from '@heroui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { AppShell, pageLeadClass, pageTitleClass } from '@/components/AppShell'
import { CameraCapture } from '@/components/upload/CameraCapture'
import { PhotographyTips } from '@/components/upload/PhotographyTips'
import { UploadArea } from '@/components/upload/UploadArea'
import { UploadedPhotoCard } from '@/components/upload/UploadedPhotoCard'
import { UploadStep } from '@/components/upload/UploadStep'
import {
  REQUIRED_VIEWS,
  VIEW_INSTRUCTIONS,
  VIEW_LABELS,
  useUpload,
  type RequiredView,
} from '@/context/UploadContext'

const VIEW_ALT: Record<RequiredView, string> = {
  side: 'Side view of a running shoe',
  sole: 'Sole view of a running shoe',
  top: 'Top view of a running shoe',
}

export default function UploadPage() {
  const { assignFileToView, isComplete, removeFile, requiredCount, state } = useUpload()
  const router = useRouter()
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const remaining = REQUIRED_VIEWS.length - requiredCount

  return (
    <>
      <AppShell>
        <UploadStep activeStep={2} />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <aside className="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-4">
            <PhotographyTips />
          </aside>

          <div className="order-1 flex flex-col gap-6 lg:order-2 lg:col-span-8">
            <div className="flex flex-col gap-2">
              <h1 className={pageTitleClass}>Upload photos</h1>
              <p className={pageLeadClass}>
                Add a side, sole, and top photo. Three views are required before you can continue.
              </p>
            </div>

            <UploadArea disabled={isComplete} onUseCamera={() => setIsCameraOpen(true)} />

            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-surface-border" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                Uploaded ({requiredCount}/3)
              </span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-surface-border" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {REQUIRED_VIEWS.map((view) => (
                <UploadedPhotoCard
                  key={view}
                  alt={VIEW_ALT[view]}
                  description={VIEW_INSTRUCTIONS[view]}
                  file={state[view]}
                  viewName={VIEW_LABELS[view]}
                  onAssign={(file) => assignFileToView(file, view)}
                  onRemove={state[view] ? () => removeFile(view) : undefined}
                />
              ))}
            </div>

            <div className="sticky bottom-4 mt-4 flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white/90 p-4 shadow-lg backdrop-blur-lg dark:border-surface-border dark:bg-surface-card/90 md:static">
              <Button
                className="font-semibold"
                startContent={
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                }
                variant="light"
                onPress={() => router.push('/')}
              >
                Back
              </Button>
              <div className="flex items-center gap-3">
                <span
                  className={`hidden text-xs font-medium sm:inline-block ${
                    isComplete
                      ? 'text-zinc-800 dark:text-accent'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {isComplete
                    ? 'All photos uploaded'
                    : `${remaining} photo${remaining !== 1 ? 's' : ''} remaining`}
                </span>
                <Button
                  className="font-semibold"
                  color={isComplete ? 'primary' : 'default'}
                  endContent={
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  }
                  isDisabled={!isComplete}
                  onPress={() => {
                    if (isComplete) router.push('/analyze')
                  }}
                >
                  Next step
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onComplete={() => setIsCameraOpen(false)}
      />
    </>
  )
}
