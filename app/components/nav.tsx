import Link from 'next/link'
import Image from 'next/image'

const navItems = {
  '/': {
    name: 'home',
  },
  '/about': {
    name: 'about',
  },
}

export function Navbar() {
  return (
    <header className="border-b border-border-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          aria-label="Big Feels Botanical home"
          className="flex font-display text-xl font-semibold"
        >
          <Image
            src="/images/heart-only-logo-bw.svg"
            alt="Big Feels Botanical"
            width={50}
            height={50}
            className="brightness-0 invert pr-2"
          />
          Big Feels Botanical
        </a>
        <nav
          className="flex flex-row items-end relative px-0 pb-2 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <ul className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <li key={path} className="list-none">
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
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
