import { Display, Heading, Body, Eyebrow, Caption } from '@/app/components/ui'

/**
 * Example homepage demonstrating all typography components
 * in a real Big Feels Botanical page layout.
 *
 * Accessibility features:
 * - Skip link (first focusable element)
 * - Semantic landmark structure (header, nav, main, footer)
 * - Single h1, logical heading hierarchy
 * - aria-label on duplicate nav landmarks
 * - aria-current="page" on active nav link
 * - All content inside landmarks
 * - max-width on body text for readable line length
 */

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <section
          aria-labelledby="hero-heading"
          className="px-6 pb-16 pt-24 text-center md:pb-24 md:pt-36"
        >
          <Eyebrow as="p" className="mb-4">
            Seed to Soul Floral Design
          </Eyebrow>
          <Display id="hero-heading">
            Big Feels
            <br />
            Botanical
          </Display>
          <Body variant="lg" className="mx-auto mt-6 max-w-[45ch] text-center">
            Fresh and dried arrangements rooted in texture, color, movement, and
            whimsy. Every stem chosen with intention.
          </Body>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="mailto:hello@bigfeelsbotanical.com"
              className="rounded-full bg-ink px-6 py-3 font-body text-sm font-medium text-surface transition-colors hover:bg-ink-soft"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="rounded-full border border-border px-6 py-3 font-body text-sm font-medium text-ink transition-colors hover:bg-surface-warm"
            >
              Our Story
            </a>
          </div>
        </section>

        {/* Featured */}
        <section
          aria-labelledby="featured-heading"
          className="border-t border-border-soft px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <Eyebrow as="p" className="mb-3">
              Featured
            </Eyebrow>
            <Heading level={2} id="featured-heading">
              Seasonal Arrangements
            </Heading>
            <Body className="mt-4">
              Each piece is one of a kind — designed with an eye toward the
              beautifully imperfect. We source locally when possible, forage
              with care, and let the botanicals lead.
            </Body>

            {/* Placeholder grid — replace with real arrangement cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {['Winter Solstice', 'Dried Meadow', 'Spring Forward'].map(
                (name) => (
                  <article
                    key={name}
                    className="overflow-hidden rounded-xl border border-border bg-surface-card"
                  >
                    <div className="aspect-[4/5] bg-surface-warm" />
                    <div className="p-5">
                      <Heading level={3} className="mb-1">
                        {name}
                      </Heading>
                      <Caption as="p">Fresh &amp; dried · Seasonal</Caption>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        {/* About preview */}
        <section
          aria-labelledby="about-heading"
          className="border-t border-border-soft bg-surface-warm px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <Eyebrow as="p" className="mb-3">
              About
            </Eyebrow>
            <Heading level={2} id="about-heading">
              The Story
            </Heading>
            <div className="mt-6 space-y-6">
              <Body>
                We believe flowers should make you feel something — a catch in
                the chest, a slow exhale, the particular joy of noticing how
                light hits a petal at four in the afternoon. That&apos;s the big
                feeling. That&apos;s what we&apos;re after.
              </Body>
              <Body>
                From seed to soul, our process honors the full life cycle of
                botanicals. We grow what we can, source locally what we
                can&apos;t, and design with deep respect for the imperfect, the
                asymmetrical, and the wildly beautiful.
              </Body>
            </div>
          </div>
        </section>
      </main>

      {/* ── Contentinfo landmark ─────────────────────────── */}
      <footer className="border-t border-border-soft px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Caption as="p">
            &copy; {new Date().getFullYear()} Big Feels Botanical. All rights
            reserved.
          </Caption>
          <nav aria-label="Footer">
            <ul className="flex gap-6 font-body text-sm text-ink-muted">
              <li>
                <a href="/privacy" className="hover:text-ink transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/accessibility"
                  className="hover:text-ink transition-colors"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  )
}
