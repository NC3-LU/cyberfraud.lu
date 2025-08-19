'use client'

import React from 'react'
import { useConsentStore } from '@/lib/consent/store/use-consent-store'
import { axeptioConfig } from '@/lib/consent/providers/axeptio/axeptio-config'
import type { Axeptio, ConsentChoices } from '@/lib/consent/providers/axeptio/types'

/**
 * AxeptioProvider is a React component that initializes and manages the Axeptio consent management script.
 * It handles the loading of the Axeptio script, updates consent states based on user interactions,
 * and synchronizes consent data with the application's state.
 *
 * The provider configures Axeptio settings with clientId and cookiesVersion, then sets up event listeners
 * for the 'cookies:complete' callback which fires when users make consent choices. It manages script
 * loading through Axeptio's callback queue (_axcb) and handles both scenarios where Axeptio is already
 * loaded or needs to be initialized.
 *
 * The component appends the Axeptio script to the document head asynchronously and handles cleanup
 * by removing event listeners when the component unmounts.
 *
 * Consent state updates are propagated through the useConsentStore hook to maintain consistency
 * across the application's consent management system.
 *
 * Find the name of the required environment variables in the axeptio-config.ts file.
 *
 * References:
 * - Developer docs: https://support.axeptio.eu/en/collections/724389-developpers-ressouces
 *
 */

const AxeptioProvider = () => {
  const { setConsent, setIsInitialized } = useConsentStore()

  React.useEffect(() => {
    window.axeptioSettings = {
      clientId: axeptioConfig.clientId,
      cookiesVersion: axeptioConfig.cookiesVersion,
    }

    // Check if the environment variable is defined before proceeding with initialization
    if (!axeptioConfig.clientId) {
      setIsInitialized(true)
      return
    }

    const setupListeners = (axeptio: Axeptio) => {
      axeptio.off('cookies:complete')
      axeptio.on('cookies:complete', (choices: ConsentChoices) => {
        setConsent({ ...choices })
      })
    }

    if (window.axeptio) {
      setupListeners(window.axeptio)
      return
    }

    const script = document.createElement('script')

    // Add the necessary attributes and values specific to Axeptio to the script

    script.src = axeptioConfig.src
    script.async = true

    document.head.appendChild(script)
    window._axcb = window._axcb || []

    // Add event listeners to synchronize states between Axeptio and the consent store
    window._axcb.push(setupListeners)

    return () => {
      if (window.axeptio) {
        window.axeptio.off('cookies:complete')
      }
    }
  }, [setIsInitialized, setConsent])

  return null
}

export default AxeptioProvider
