import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/Footer'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-zinc-900 selection:bg-primary selection:text-white dark:bg-background-page dark:text-zinc-50">
      <Navbar />
      <main className="flex w-full flex-1 flex-col items-center px-4 py-8 md:py-12">
        <div className="flex w-full max-w-5xl flex-col gap-10">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export const pageTitleClass =
  'text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl'

export const pageLeadClass = 'max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400'
