'use client'

export const UploadStep = ({ activeStep = 2 }: { activeStep?: 2 | 3 }) => {
  const isAnalysis = activeStep === 3

  return (
    <div className="w-full max-w-xs md:max-w-3xl mx-auto">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-surface-border -z-10" />

        <div className="flex flex-col items-center gap-2 bg-background-page px-2">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(0,111,238,0.4)]">
            <span className="material-symbols-outlined text-xl">check</span>
          </div>
          <span className="text-sm font-medium text-white">Guide</span>
        </div>

        <div className="flex flex-col items-center gap-2 bg-background-page px-2">
          <div
            className={`size-10 rounded-full flex items-center justify-center font-bold relative ${
              isAnalysis
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(0,111,238,0.4)]'
                : 'bg-surface-card border-2 border-primary text-primary shadow-[0_0_15px_rgba(0,111,238,0.25)]'
            }`}
          >
            {isAnalysis ? (
              <span className="material-symbols-outlined text-xl">check</span>
            ) : (
              <>
                2<div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
              </>
            )}
          </div>
          <span
            className={`text-sm ${isAnalysis ? 'font-medium text-white' : 'font-bold text-primary'}`}
          >
            Upload
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 bg-background-page px-2">
          <div
            className={`size-10 rounded-full flex items-center justify-center font-bold ${
              isAnalysis
                ? 'bg-surface-card border-2 border-primary text-primary shadow-[0_0_15px_rgba(0,111,238,0.25)] relative'
                : 'bg-surface-card border-2 border-surface-border text-text-secondary'
            }`}
          >
            3
            {isAnalysis && (
              <div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
            )}
          </div>
          <span
            className={`text-sm ${
              isAnalysis ? 'font-bold text-primary' : 'font-medium text-text-secondary'
            }`}
          >
            Analysis
          </span>
        </div>
      </div>
    </div>
  )
}
