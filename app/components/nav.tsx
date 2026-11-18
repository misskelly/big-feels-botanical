'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'home',
  },
  '/gallery': {
    name: 'gallery',
  },
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Big Feels Botanical home"
          className="flex items-center font-display text-xl font-semibold"
        >
          <Image
            src="/images/heart-only-logo-bw.svg"
            alt=""
            width={50}
            height={50}
            className="pr-2 brightness-0 dark:invert"
          />
          Big Feels Botanical
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-row">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path
              return (
                <li key={path} className="list-none">
                  <Link
                    href={path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative m-1 flex px-2 py-1 align-middle transition-colors hover:text-ink ${
                      isActive ? 'font-semibold text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
