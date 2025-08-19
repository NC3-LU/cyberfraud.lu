import { render, screen } from '@testing-library/react'
import type { ImageProps } from 'next/image'

// Mock the consent store
jest.mock('@/lib/consent', () => ({
  useConsentStore: jest.fn(),
}))
import { useConsentStore } from '@/lib/consent'
const mockUseConsentStore = useConsentStore as jest.MockedFunction<typeof useConsentStore>

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: ImageProps) => {
    return <img src={src as string} alt={alt ?? 'mock'} />
  },
}))

import { YouTubeVideo } from './YouTubeVideo'

beforeEach(() => {
  jest.clearAllMocks()

  // Default store
  mockUseConsentStore.mockReturnValue({
    consent: {
      marketing: false,
      necessary: false,
      preferences: false,
      statistics: false,
      method: 'implied',
    },
    isInitialized: false,
    hasResponse: false,
  })
})

describe('YouTubeVideo', () => {
  const mockProps = {
    videoUrl: 'https://youtube.com/watch?v=123',
    embedUrl: 'https://youtube.com/embed/123',
    image: '/mock-image.jpg',
    width: 1280,
    height: 720,
  }

  describe('Consent scenarios', () => {
    it('renders the placeholder image link when consent manager is not initialized', () => {
      mockUseConsentStore.mockReturnValue({
        consent: null,
        isInitialized: false,
        hasResponse: false,
      })

      const { container } = render(<YouTubeVideo {...mockProps} />)

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', mockProps.videoUrl)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')

      // a11y: link must have an accessible name from the image alt
      expect(
        screen.getByRole('link', { name: /video @youtube/i })
      ).toBeInTheDocument()

      expect(container.querySelector('iframe')).not.toBeInTheDocument()

      const image = screen.getByRole('img', { name: 'Video @YouTube' })
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', mockProps.image)
    })

    it('renders the placeholder image link when marketing consent is not granted', () => {
      mockUseConsentStore.mockReturnValue({
        consent: {
          marketing: false,
          necessary: true,
          preferences: true,
          statistics: true,
          method: 'explicit',
        },
        isInitialized: true,
        hasResponse: true,
      })

      const { container } = render(<YouTubeVideo {...mockProps} />)

      const link = screen.getByRole('link', { name: /video @youtube/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', mockProps.videoUrl)
      expect(container.querySelector('iframe')).not.toBeInTheDocument()
      expect(screen.getByRole('img', { name: 'Video @YouTube' })).toBeInTheDocument()
    })

    it('renders an iframe when marketing consent is granted', () => {
      mockUseConsentStore.mockReturnValue({
        consent: {
          marketing: true,
          necessary: true,
          preferences: true,
          statistics: true,
          method: 'explicit',
        },
        isInitialized: true,
        hasResponse: true,
      })

      const { container } = render(<YouTubeVideo {...mockProps} />)

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe).toHaveAttribute('src', mockProps.embedUrl)

      expect(iframe).toHaveAttribute('title', 'YouTube video player')
      expect(iframe).toHaveAttribute('allow')
      expect(iframe?.getAttribute('allow')).toMatch(/autoplay/)
      expect(iframe).toHaveAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
      expect(iframe).toHaveAttribute('allowfullscreen')

      expect(screen.queryByRole('link')).toBeNull()
      expect(screen.queryByRole('img')).toBeNull()
    })
  })

  describe('Edge cases', () => {
    it('falls back to link+image when embedUrl is falsy even if marketing consent is granted', () => {
      mockUseConsentStore.mockReturnValue({
        consent: { marketing: true, necessary: true, preferences: true, statistics: true, method: 'explicit' },
        isInitialized: true,
        hasResponse: true,
      })

      const { container } = render(<YouTubeVideo {...{ ...mockProps, embedUrl: '' }} />)

      const link = screen.getByRole('link', { name: /video @youtube/i })
      expect(link).toBeInTheDocument()
      expect(container.querySelector('iframe')).not.toBeInTheDocument()
    })

    it('updates UI when consent changes from no-marketing → marketing (rerender)', () => {
      // Start without marketing consent
      mockUseConsentStore.mockReturnValue({
        consent: { marketing: false, necessary: true, preferences: true, statistics: true, method: 'explicit' },
        isInitialized: true,
        hasResponse: true,
      })

      const { container, rerender } = render(<YouTubeVideo {...mockProps} />)

      expect(screen.getByRole('link', { name: /video @youtube/i })).toBeInTheDocument()
      expect(container.querySelector('iframe')).not.toBeInTheDocument()

      // Toggle marketing consent
      mockUseConsentStore.mockReturnValue({
        consent: { marketing: true, necessary: true, preferences: true, statistics: true, method: 'explicit' },
        isInitialized: true,
        hasResponse: true,
      })

      rerender(<YouTubeVideo {...mockProps} />)

      const iframe = container.querySelector('iframe')
      expect(iframe).not.toBeNull()
      expect(iframe).toHaveAttribute('src', mockProps.embedUrl)
      expect(screen.queryByRole('link')).toBeNull()
    })
  })
})
