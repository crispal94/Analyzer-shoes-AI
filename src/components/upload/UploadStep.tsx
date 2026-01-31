'use client'

export const UploadStep = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-border -z-10" />

        {/* Step 1: Guide (Completed) */}
        <div className="flex flex-col items-center gap-2 bg-background-page px-2">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,111,238,0.4)]">
            <span className="material-symbols-outlined text-xl">check</span>
          </div>
          <span className="text-sm font-medium text-white">Guide</span>
        </div>

        {/* Step 2: Upload (Active) */}
        <div className="flex flex-col items-center gap-2 bg-background-page px-2">
          <div className="size-10 rounded-full bg-surface-card border-2 border-primary flex items-center justify-center text-primary font-bold shadow-[0_0_15px_rgba(0,111,238,0.25)] relative">
            2<div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
          </div>
          <span className="text-sm font-bold text-primary">Upload</span>
        </div>

        {/* Step 3: Analysis (Pending) */}
        <div className="flex flex-col items-center gap-2 bg-background-page px-2">
          <div className="size-10 rounded-full bg-surface-card border-2 border-surface-border flex items-center justify-center text-text-secondary font-bold">
            3
          </div>
          <span className="text-sm font-medium text-text-secondary">Analysis</span>
        </div>
      </div>
    </div>
  )
}
