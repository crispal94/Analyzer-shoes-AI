'use client'

export const PhotographyTips = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-accent">lightbulb</span>
        <h3 className="text-lg font-bold text-white">Photography Tips</h3>
      </div>

      <div className="group flex gap-4 rounded-xl border border-surface-border bg-surface-card p-4 transition-all hover:border-primary/50 shadow-hero">
        <div className="shrink-0 size-10 rounded-lg bg-surface-border flex items-center justify-center text-white group-hover:text-primary transition-colors">
          <span className="material-symbols-outlined">wb_sunny</span>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-white text-sm font-bold">Good Lighting</h4>
          <p className="text-text-secondary text-xs leading-relaxed">
            Avoid heavy shadows. Natural daylight works best for texture analysis.
          </p>
        </div>
      </div>

      <div className="group flex gap-4 rounded-xl border border-surface-border bg-surface-card p-4 transition-all hover:border-primary/50 shadow-hero">
        <div className="shrink-0 size-10 rounded-lg bg-surface-border flex items-center justify-center text-white group-hover:text-primary transition-colors">
          <span className="material-symbols-outlined">layers</span>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-white text-sm font-bold">Flat Surface</h4>
          <p className="text-text-secondary text-xs leading-relaxed">
            Place the shoe on a solid, contrasting color table or floor.
          </p>
        </div>
      </div>

      <div className="group flex gap-4 rounded-xl border border-surface-border bg-surface-card p-4 transition-all hover:border-primary/50 shadow-hero">
        <div className="shrink-0 size-10 rounded-lg bg-surface-border flex items-center justify-center text-white group-hover:text-primary transition-colors">
          <span className="material-symbols-outlined">visibility</span>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-white text-sm font-bold">Clear Sole View</h4>
          <p className="text-text-secondary text-xs leading-relaxed">
            Ensure the tread pattern is fully visible and not obstructed.
          </p>
        </div>
      </div>
    </div>
  )
}
