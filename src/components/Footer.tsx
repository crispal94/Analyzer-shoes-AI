export const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-zinc-200 py-8 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} RunWise AI
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Side, sole, and top photos for wear review
        </p>
      </div>
    </footer>
  )
}
