import Image from 'next/image'
import Link from 'next/link'
import { Display, Heading, Body, Eyebrow } from '@/app/components/ui'
import { getGalleryImages } from '@/lib/gallery'

// Image URLs are signed for 7 days (see lib/gallery.ts). Re-render hourly so
// a cached page never serves links that have expired.
export const revalidate = 3600

export default async function HomePage() {
  const images = await getGalleryImages(6)
  return (
    <>
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
            href="#about"
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
            beautifully imperfect. We source locally when possible, forage with
            care, and let the botanicals lead.
          </Body>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <article
                key={image.id}
                className="overflow-hidden rounded-xl border border-border bg-surface-card"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10">
            <Link
              href="/gallery"
              className="font-body text-sm font-medium text-ink underline underline-offset-4 hover:no-underline"
            >
              View the full gallery
            </Link>
          </p>
        </div>
      </section>

      {/* About preview */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-8 border-t border-border-soft bg-surface-warm px-6 py-16 md:py-24"
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
              We believe flowers should make you feel something — a catch in the
              chest, a slow exhale, the particular joy of noticing how light
              hits a petal at four in the afternoon. That&apos;s the big
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
    </>
  )
}
