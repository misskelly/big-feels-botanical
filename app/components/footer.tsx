import Link from 'next/link'
import { Caption } from './ui'

export default function Footer() {
  return (
    <footer className="border-t border-border-soft px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Caption as="p">
          &copy; {new Date().getFullYear()} Big Feels Botanical. All rights
          reserved.
        </Caption>
        <nav aria-label="Footer">
          <ul className="flex gap-6 font-body text-sm text-ink-muted">
            <li>
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-ink"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <a
                href="mailto:hello@bigfeelsbotanical.com"
                className="transition-colors hover:text-ink"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
