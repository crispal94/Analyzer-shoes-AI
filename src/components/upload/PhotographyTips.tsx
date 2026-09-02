'use client'

const TIPS = [
  {
    icon: 'wb_sunny',
    title: 'Good lighting',
    body: 'Avoid heavy shadows. Natural daylight works best for texture.',
  },
  {
    icon: 'layers',
    title: 'Flat surface',
    body: 'Place the shoe on a solid, contrasting table or floor.',
  },
  {
    icon: 'visibility',
    title: 'Full view',
    body: 'Keep the whole shoe in frame so side, sole, or top is complete.',
  },
] as const

export const PhotographyTips = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-zinc-700 dark:text-accent">lightbulb</span>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Photography tips</h2>
      </div>

      {TIPS.map((tip) => (
        <div
          key={tip.title}
          className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-hero-light dark:border-surface-border dark:bg-surface-card dark:shadow-hero"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800 dark:bg-surface-border dark:text-zinc-50">
            <span className="material-symbols-outlined">{tip.icon}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{tip.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{tip.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
