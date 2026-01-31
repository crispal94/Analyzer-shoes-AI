import { Link } from '@heroui/link'

export const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-zinc-500">© 2023 RunWise AI. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            color="foreground"
            href="#"
          >
            Privacy
          </Link>
          <Link
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            color="foreground"
            href="#"
          >
            Terms
          </Link>
          <Link
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
            color="foreground"
            href="#"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
}
