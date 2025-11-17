import '@testing-library/jest-dom'

import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// vi.mock('lib/firebase', () => ({
//   db: {},
//   storage: {},
//   analytics: null,
//   app: {},
// }))

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

afterEach(() => {
  vi.restoreAllMocks()
})
