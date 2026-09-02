'use client'

import { usePathname } from 'next/navigation'
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar'
import { Link } from '@heroui/link'

import { ThemeSwitch } from '@/components/theme-switch'

const NAV_ITEMS = [
  { href: '/', label: 'Start' },
  { href: '/upload', label: 'Photos' },
  { href: '/analyze', label: 'Review' },
] as const

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <HeroNavbar
      classNames={{
        base: 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800',
      }}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent justify="start">
        <NavbarBrand className="gap-3">
          <Link
            className="flex items-center gap-3 text-zinc-900 dark:text-zinc-50"
            color="foreground"
            href="/"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">sprint</span>
            </span>
            <span className="hidden text-xl font-bold tracking-tight sm:inline">RunWise AI</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="gap-3 sm:gap-8" justify="center">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <NavbarItem key={item.href} isActive={isActive}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'font-semibold text-primary'
                    : 'font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}
