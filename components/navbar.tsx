'use client'

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@heroui/navbar'
import { Link } from '@heroui/link'
import { Button } from '@heroui/button'
import { Badge } from '@heroui/badge'
import { Avatar } from '@heroui/avatar'

export const Navbar = () => {
  return (
    <HeroNavbar
      maxWidth="xl"
      position="sticky"
      classNames={{
        base: 'bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800'
      }}
    >
      <NavbarContent justify="start">
        <NavbarBrand className="gap-3">
          <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">
              sprint
            </span>
          </div>
          <p className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            RunWise AI
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-16" justify="center">
        <NavbarItem>
          <Link
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium"
            href="#"
            color="foreground"
          >
            Analyze
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium"
            href="#"
            color="foreground"
          >
            My Collection
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium"
            href="#"
            color="foreground"
          >
            Shop
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-2">
          <Button
            isIconOnly
            radius="full"
            variant="light"
            className="text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Badge content="" color="primary" shape="circle" size="sm">
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
            </Badge>
          </Button>

          <Avatar
            isBordered
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIZPh2JfSbo04ojTBv8cE7eBFbQc4N_8isVqH_PDQ10Af9j0K7Yd5C4NOfuANqmV5LnkQ-F76ozD8POTp8aZUMfBux-fVugiCwBniq6Vszp1SmOguXjed_oRcpMrsX3LonTDl5xTn2mUtU42nFGv-XkTpOX-81SFOVEhzU45_IazR1dWx9kmZAbzWIe9QgY-soeyh25WYjwbCN4RrVbV8PuqlxNcTjffnou8JAjfwGPI7djPzwnNn7nIkJvJhLGwJm_54qc6VAH0c"
            size="sm"
            className="cursor-pointer ring-2 ring-zinc-100 dark:ring-zinc-800"
          />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}
