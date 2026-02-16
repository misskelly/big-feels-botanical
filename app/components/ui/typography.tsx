import { type ComponentPropsWithoutRef, type ElementType } from 'react'

/* ═══════════════════════════════════════════════════════════════
   TYPOGRAPHY COMPONENTS — Big Feels Botanical
   
   Accessible, semantic, reusable type primitives.
   
   Design principles:
   1. Every component renders the correct semantic HTML element
   2. All font sizes use clamp() for fluid scaling (no layout jumps)
   3. Line heights meet or exceed WCAG 1.4.12 minimums
   4. Max-width is set on body text to enforce readable line length
   5. Components are polymorphic — you can override the element via `as`
   
   Usage:
     <Heading level={1}>Seed to Soul</Heading>
     <Body>Your paragraph text here.</Body>
     <Eyebrow>North Denver · Est. 2025</Eyebrow>
═══════════════════════════════════════════════════════════════ */

// ── Utility: polymorphic component types ─────────────────────

type PolymorphicProps<E extends ElementType, P = object> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'> & {
    as?: E
  }

// ── Heading ──────────────────────────────────────────────────

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingOwnProps {
  /** Semantic heading level (1-6). Determines both the HTML tag and visual style. */
  level: HeadingLevel
  /** Optional: Override the visual style independently from the semantic level.
   *  Useful when you need an h2 that *looks* like an h3. */
  visualLevel?: HeadingLevel
}

const headingStyles: Record<HeadingLevel, string> = {
  1: [
    'font-display font-semibold',
    'text-[clamp(2.25rem,1.5rem+3.5vw,4rem)]',
    'leading-[1.15] tracking-tight',
    // Fraunces variable axes: large optical size, wonk on, medium softness
    "[font-variation-settings:'opsz'_72,'WONK'_1,'SOFT'_50]",
  ].join(' '),
  2: [
    'font-display font-medium',
    'text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)]',
    'leading-[1.25] tracking-tight',
    "[font-variation-settings:'opsz'_36,'WONK'_1,'SOFT'_50]",
  ].join(' '),
  3: [
    'font-display font-semibold',
    'text-[clamp(1.25rem,1rem+1.2vw,1.75rem)]',
    'leading-[1.35]',
    "[font-variation-settings:'opsz'_24,'WONK'_0,'SOFT'_25]",
  ].join(' '),
  4: [
    'font-display font-semibold',
    'text-[clamp(1.125rem,1rem+0.6vw,1.3rem)]',
    'leading-[1.35]',
    "[font-variation-settings:'opsz'_18,'WONK'_0,'SOFT'_25]",
  ].join(' '),
  5: [
    'font-body font-semibold',
    'text-[clamp(1rem,0.9rem+0.5vw,1.125rem)]',
    'leading-[1.5]',
  ].join(' '),
  6: [
    'font-body font-semibold',
    'text-[clamp(0.875rem,0.8rem+0.35vw,1rem)]',
    'leading-[1.5] uppercase tracking-[0.05em]',
  ].join(' '),
}

type HeadingProps<E extends ElementType = 'h1'> = PolymorphicProps<
  E,
  HeadingOwnProps
>

export function Heading<E extends ElementType = 'h1'>({
  level,
  visualLevel,
  as,
  className,
  children,
  ...rest
}: HeadingProps<E>) {
  const Tag = as ?? (`h${level}` as ElementType)
  const style = headingStyles[visualLevel ?? level]

  return (
    <Tag className={`${style} text-ink ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

// ── Display / Hero Heading ───────────────────────────────────

type DisplayProps<E extends ElementType = 'h1'> = PolymorphicProps<E>

export function Display<E extends ElementType = 'h1'>({
  as,
  className,
  children,
  ...rest
}: DisplayProps<E>) {
  const Tag = as ?? ('h1' as ElementType)

  return (
    <Tag
      className={[
        'font-display font-medium',
        'text-[clamp(3rem,2rem+5vw,6rem)]',
        'leading-[1.1] tracking-tight',
        "[font-variation-settings:'opsz'_144,'WONK'_1,'SOFT'_50]",
        'text-ink',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// ── Body ─────────────────────────────────────────────────────

type BodyVariant = 'base' | 'lg' | 'sm'

interface BodyOwnProps {
  /** Text size variant. All meet WCAG line height minimums. */
  variant?: BodyVariant
}

const bodyStyles: Record<BodyVariant, string> = {
  base: [
    'font-body',
    'text-[clamp(1rem,0.9rem+0.5vw,1.125rem)]',
    'leading-[1.6]', // exceeds 1.5× WCAG minimum
    'max-w-[65ch]', // optimal line length
    'text-ink',
  ].join(' '),
  lg: [
    'font-body',
    'text-[clamp(1.125rem,1rem+0.6vw,1.3rem)]',
    'leading-[1.6]',
    'max-w-[65ch]',
    'text-ink-soft',
  ].join(' '),
  sm: [
    'font-body',
    'text-[clamp(0.875rem,0.8rem+0.35vw,1rem)]',
    'leading-[1.6]',
    'max-w-[65ch]',
    'text-ink-soft',
  ].join(' '),
}

type BodyProps<E extends ElementType = 'p'> = PolymorphicProps<E, BodyOwnProps>

export function Body<E extends ElementType = 'p'>({
  variant = 'base',
  as,
  className,
  children,
  ...rest
}: BodyProps<E>) {
  const Tag = as ?? ('p' as ElementType)

  return (
    <Tag className={`${bodyStyles[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

// ── Eyebrow / Label ──────────────────────────────────────────

type EyebrowProps<E extends ElementType = 'span'> = PolymorphicProps<E>

export function Eyebrow<E extends ElementType = 'span'>({
  as,
  className,
  children,
  ...rest
}: EyebrowProps<E>) {
  const Tag = as ?? ('span' as ElementType)

  return (
    <Tag
      className={[
        'font-body font-semibold',
        'text-[clamp(0.75rem,0.7rem+0.25vw,0.875rem)]',
        'leading-normal',
        'uppercase tracking-[0.12em]', // 0.12em matches WCAG 1.4.12 minimum
        'text-accent',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// ── Caption ──────────────────────────────────────────────────

type CaptionProps<E extends ElementType = 'span'> = PolymorphicProps<E>

export function Caption<E extends ElementType = 'span'>({
  as,
  className,
  children,
  ...rest
}: CaptionProps<E>) {
  const Tag = as ?? ('span' as ElementType)
  const finalClassName = className ?? ''

  return (
    <Tag
      className={[
        'font-body',
        'text-[clamp(0.75rem,0.7rem+0.25vw,0.875rem)]',
        'leading-[1.6]',
        'text-ink-muted',
        finalClassName,
      ].join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// ── SkipLink ─────────────────────────────────────────────────

interface SkipLinkProps {
  /** ID of the target element to skip to. Defaults to "main-content". */
  targetId?: string
}

export function SkipLink({ targetId = 'main-content' }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      Skip to main content
    </a>
  )
}
