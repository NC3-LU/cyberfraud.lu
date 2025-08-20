export interface CookiebotConfig {
  id: string
  src: string
  enabled?: boolean
  timeout?: number
  attributes: {
    cbid: string // The unique ID for your Cookiebot domain group.
    type?: string // 	Overrides the default dialog type with one of the following values: "optin", "optout", "optinout", "leveloptin", "inlineoptin", "optionaloptin"
    level?: string // Overrides the default consent method with one of the following values: "implied", "strict"
    culture?: string // To force a specific language variant of the consent dialog, set the value of this attribute to a culture neutral ISO 639-1 language code, e.g. "EN" for English. Setting this attribute with a valid language overrides the "Auto-detect user language" setting in the Cookiebot manager.
    framework?: string // Enables Cookiebot to signal consent to other consent frameworks implemented on a website in addition to the default consent framework in Cookiebot. The value of the attribute must match the shortcode of the external framework. Currently supported third party consent frameworks: Shortcode "IAB": IAB Europe Transparency & Consent Framework.
    blockingmode?: string // Defines if Cookiebot should automatically block all cookies until a user has consented, value: "auto". If you omit this attribute, behavior will equal value: "none".
    consentmode?: string // Allows you to disable Google Consent Mode by passing a value of "disabled".
  }
}

export const cookiebotConfig: CookiebotConfig = {
  id: process.env.NEXT_PUBLIC_CM_COOKIEBOT_ID || '',
  src: process.env.NEXT_PUBLIC_CM_COOKIEBOT_SCRIPT_SRC || '',
  enabled: process.env.NEXT_PUBLIC_CM_COOKIEBOT_CBID !== undefined,
  timeout: 2000,
  attributes: {
    cbid: process.env.NEXT_PUBLIC_CM_COOKIEBOT_CBID || '',
    blockingmode: 'none', //
  },
}
