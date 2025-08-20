/**
 * Types inferred from Cookiebot SDK: https://www.cookiebot.com/en/developer/
 */

export interface Consent {
  necessary: boolean
  preferences: boolean
  statistics: boolean
  marketing: boolean
  method: 'implied' | 'explicit' | null
}

export interface Cookiebot {
  consent: Consent
  consented: boolean
  declined: boolean
  hasResponse: boolean
  doNotTrack: boolean
  regulations: {
    gdprApplies: boolean
    ccpaApplies: boolean
    lgpdApplies: boolean
  }
  show: () => void
  hide: () => void
  renew: () => void
  withdraw: () => void
  getScript: (url: string, async?: boolean, callback?: () => void) => string
  runScripts: () => void
  submitCustomConsent: (optinPreferences: boolean, optinStatistics: boolean, optinMarketing: boolean) => void
}

declare global {
  interface Window {
    Cookiebot?: Cookiebot
    CookiebotCallback_OnLoad?: () => void
    CookiebotCallback_OnAccept?: () => void
    CookiebotCallback_OnDecline?: () => void
    CookiebotCallback_OnDialogInit?: () => void
    CookiebotCallback_OnDialogDisplay?: () => void
    CookiebotCallback_OnTagsExecuted?: () => void
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: Needed for "declare global {}"
export {}
