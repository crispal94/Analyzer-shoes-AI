'use client'

import { Button } from '@heroui/button'
import { useRouter } from 'next/navigation'

import { AppShell, pageLeadClass, pageTitleClass } from '@/components/AppShell'
import { UploadStep } from '@/components/upload/UploadStep'
import { UploadedPhotoCard } from '@/components/upload/UploadedPhotoCard'
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

export default function AnalyzePage() {
  const { isComplete, requiredCount, state } = useUpload()
  const router = useRouter()

  if (!isComplete) {
    return (
      <AppShell>
        <UploadStep activeStep={3} photosReady={false} />
        <div className="flex flex-col gap-4">
          <h1 className={pageTitleClass}>Photos needed</h1>
          <p className={pageLeadClass}>
            Review starts after a side, sole, and top photo are in place. {requiredCount} of 3 views
            are ready.
          </p>
          <div>
            <Button
              color="primary"
              startContent={
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              }
              onPress={() => router.replace('/upload')}
            >
              Back to photos
            </Button>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <UploadStep activeStep={3} photosReady />

      <div className="flex max-w-3xl flex-col gap-2">
        <h1 className={pageTitleClass}>Review photos</h1>
        <p className={pageLeadClass}>
          All three required views are ready. Wear analysis is not connected yet — this step
          confirms the capture flow instead of leaving you on a dead end.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {REQUIRED_VIEWS.map((view) => (
          <UploadedPhotoCard
            key={view}
            alt={VIEW_ALT[view]}
            description={VIEW_INSTRUCTIONS[view]}
            file={state[view]}
            viewName={VIEW_LABELS[view]}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-surface-border dark:bg-surface-card">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-zinc-700 dark:text-accent">science</span>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Analysis placeholder
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          AI wear detection is not implemented in this build. Your side, sole, and top photos stay
          in session so you can go back and recapture any view.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            className="font-semibold"
            startContent={<span className="material-symbols-outlined text-[18px]">arrow_back</span>}
            variant="bordered"
            onPress={() => router.push('/upload')}
          >
            Back to photos
          </Button>
          <Button
            className="font-semibold"
            color="primary"
            endContent={<span className="material-symbols-outlined text-[18px]">home</span>}
            onPress={() => router.push('/')}
          >
            Done
          </Button>
        </div>
      </div>
    </AppShell>
  )
}
