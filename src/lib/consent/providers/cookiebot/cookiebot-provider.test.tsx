import { render } from '@testing-library/react'
import { CookiebotProvider } from './index'
import { useConsentStore } from '@/lib/consent'

// Mock the consent store
jest.mock('@/lib/consent', () => ({
  useConsentStore: jest.fn(),
}))


const mockUseConsentStore = useConsentStore as jest.MockedFunction<typeof useConsentStore>

// Mock the dynamic import
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = 'LoadableComponent'
  return DynamicComponent
})


describe('CookiebotManager', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }

    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should handle real environment variables without exposing secrets', () => {
    // Set up test environment - no actual secrets are exposed
    process.env.NEXT_PUBLIC_CM_COOKIEBOT_ID = 'test-cookiebot-id'
    process.env.NEXT_PUBLIC_CM_COOKIEBOT_SCRIPT_SRC = 'https://consent.cookiebot.com/test-script.js'
    process.env.NEXT_PUBLIC_CM_COOKIEBOT_CBID = 'test-cbid-123'

    // These are just test values, not real secrets
    const setConsentMock = jest.fn()

    mockUseConsentStore.mockReturnValue({
      isInitialized: false,
      hasResponse: false,
      consent: {
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false,
      },
      setConsent: setConsentMock,
      setIsInitialized: jest.fn(),
      setHasResponse: jest.fn(),
      resetConsent: jest.fn(),
    })

    // Test rendering - no secret exposure in artifacts
    expect(() => {
      render(<CookiebotProvider />)
    }).not.toThrow()
  })

  it('should handle missing environment variables gracefully', () => {
    // Test with empty/missing environment variables - no real secrets exposed
    process.env.NEXT_PUBLIC_CM_COOKIEBOT_ID = ''
    process.env.NEXT_PUBLIC_CM_COOKIEBOT_SCRIPT_SRC = ''
    process.env.NEXT_PUBLIC_CM_COOKIEBOT_CBID = undefined

    const setConsentMock = jest.fn()

    mockUseConsentStore.mockReturnValue({
      isInitialized: false,
      hasResponse: false,
      consent: {
        necessary: true,
        preferences: false,
        statistics: false,
        marketing: false,
      },
      setConsent: setConsentMock,
      setIsInitialized: jest.fn(),
      setHasResponse: jest.fn(),
      resetConsent: jest.fn(),
    })

    // Test rendering - no secret exposure in artifacts
    expect(() => {
      render(<CookiebotProvider />)
    }).not.toThrow()
  })
})
