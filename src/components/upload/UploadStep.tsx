'use client'

import Link from 'next/link'

const STEPS = [
  { id: 1, href: '/', label: 'Start' },
  { id: 2, href: '/upload', label: 'Photos' },
  { id: 3, href: '/analyze', label: 'Review' },
] as const

export const UploadStep = ({ activeStep = 2 }: { activeStep?: 1 | 2 | 3 }) => {
  return (
    <nav aria-label="Capture steps" className="mx-auto w-full max-w-xs md:max-w-3xl">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-[8%] right-[8%] top-5 h-0.5 bg-zinc-200 dark:bg-surface-border"
        />
        <ol className="relative flex items-start justify-between">
          {STEPS.map((step) => {
            const isComplete = activeStep > step.id
            const isCurrent = activeStep === step.id

            return (
              <li
                key={step.id}
                className="flex flex-col items-center gap-2 bg-background-light px-2 dark:bg-background-page"
              >
                <Link
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`relative flex size-10 items-center justify-center rounded-full text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-page ${
                    isComplete || isCurrent
                      ? 'bg-primary text-white shadow-[0_4px_12px_rgba(0,111,238,0.35)]'
                      : 'border-2 border-zinc-300 bg-white text-zinc-500 dark:border-surface-border dark:bg-surface-card dark:text-zinc-400'
                  }`}
                  href={step.href}
                >
                  <span className="relative z-10">
                    {isComplete ? (
                      <span className="material-symbols-outlined text-xl">check</span>
                    ) : (
                      step.id
                    )}
                  </span>
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-primary/20 motion-reduce:hidden motion-safe:animate-ping" />
                  )}
                </Link>
                <span
                  className={`text-sm ${
                    isCurrent
                      ? 'font-bold text-primary'
                      : isComplete
                        ? 'font-medium text-zinc-900 dark:text-zinc-50'
                        : 'font-medium text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {step.label}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
