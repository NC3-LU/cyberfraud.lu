import { create } from 'zustand'
import { combine, devtools } from 'zustand/middleware'

/**
 * Store instance for managing consent states
 *
 * This store can be used to tracks the initialization status, response state, user consent preferences,
 * and dialog visibility for cookie consent management. It provides methods to update
 * these values and reset to initial state.
 *
 * It implements the Zustand state management library,
 * see documentation: https://zustand.docs.pmnd.rs/
 *
 * Usage:
 * Import useConsentStore like a hook in a component body and destructure the needed states and/or setter functions.
 * Use it like an application's global state, without the need for a provider component or prop drilling.
 *
 * @typedef {Object} ConsentStore
 * @property {boolean} isInitialized - Indicates if the consent system has been initialized
 * @property {boolean} hasResponse - Tracks whether user has provided consent response
 * @property {Object} consent - Current user consent preferences and settings
 * @property {boolean} isDialogOpen - Controls visibility of consent dialog
 *
 * @method setIsInitialized - Updates initialization status
 * @method setHasResponse - Updates response state
 * @method setConsent - Updates user consent preferences
 * @method setIsDialogOpen - Controls dialog visibility
 * @method reset - Resets all store values to initial state
 */

interface ConsentPreferences {
  necessary: boolean
  preferences: boolean
  statistics: boolean
  marketing: boolean
}

const initialState = {
  isInitialized: false,
  hasResponse: false,
  consent: null as Partial<ConsentPreferences> | null,
  isDialogOpen: false,
}

export const useConsentStore = create(
  devtools(
    combine(initialState, (set) => ({
      setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
      setHasResponse: (hasResponse: boolean) => set({ hasResponse }),
      setConsent: (consent: Partial<ConsentPreferences>) => set({ consent }),
      setIsDialogOpen: (isDialogOpen: boolean) => set({ isDialogOpen }),
      reset: () => set(initialState),
    })),
  ),
)
