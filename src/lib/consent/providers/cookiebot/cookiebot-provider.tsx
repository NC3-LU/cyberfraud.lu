'use client'

import React from 'react'
import { useConsentStore } from '@/lib/consent/store/use-consent-store'
import { cookiebotConfig } from '@/lib/consent/providers/cookiebot/cookiebot-config'

/**
 * CookiebotProvider is a React component that initializes and manages the Cookiebot consent management script.
 * It handles the loading of the Cookiebot script, updates consent states based on user interactions,
 * and synchronizes consent data with the application's state.
 *
 * The provider sets up event listeners for various Cookiebot callbacks including load, accept, decline,
 * and dialog display events. It also manages the initialization state and updates consent values
 * from the Cookiebot object when available.
 *
 * The component appends the Cookiebot script to the document head with configured attributes
 * and handles script loading errors by logging them to the console.
 *
 * Consent state updates are propagated through the useConsentStore hook to maintain consistency
 * across the application's consent management system.
 *
 * You will find the name of the required environment variables in the cookiebot-config.ts file.
 *
 * For testing purposes, use http://127.0.0.1:3000 instead of http://localhost:3000 as the latter cannot be used by
 * Cookiebot as origin.
 *
 * References:
 * - Developer docs: https://www.cookiebot.com/en/developer/
 * - Cookiebot event handling, callbacks and attributes below
 *
 */

const CookiebotProvider = () => {
  const initRef = React.useRef(false)

  const { setConsent, setIsInitialized, setHasResponse, setIsDialogOpen } = useConsentStore()

  React.useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    // Check if the environment variable is defined before proceeding with initialization
    if (!cookiebotConfig.attributes.cbid) {
      setIsInitialized(true) // Set the initialization flag to true to avoid unnecessary initialization
      return
    }

    const updateConsentState = () => {
      if (typeof window !== 'undefined' && window.Cookiebot) {
        const cb = window.Cookiebot

        if (cb) {
          setConsent({
            necessary: cb.consent.necessary,
            preferences: cb.consent.preferences,
            statistics: cb.consent.statistics,
            marketing: cb.consent.marketing,
          })

          setHasResponse(cb?.hasResponse)
        }

        setIsInitialized(true)
      }
    }

    const script = document.createElement('script')

    // Add the necessary attributes and values specific to Cookiebot to the script

    script.id = 'Cookiebot'
    script.src = cookiebotConfig.src
    script.async = true
    script.setAttribute('type', 'text/javascript')

    const { cbid, type, level, culture, framework, blockingmode, consentmode } = cookiebotConfig.attributes

    if (cbid) script.setAttribute('data-cbid', cbid)
    if (type) script.setAttribute('data-type', type)
    if (level) script.setAttribute('data-level', level)
    if (culture) script.setAttribute('data-culture', culture)
    if (framework) script.setAttribute('data-framework', framework)
    if (blockingmode) script.setAttribute('data-blockingmode', blockingmode)
    if (consentmode) script.setAttribute('data-consentmode', consentmode)

    // Add event listeners to synchronize states between Cookiebot and the consent store

    script.onload = () => {
      setIsInitialized(true)
      updateConsentState()
    }

    script.onerror = () => {
      console.error('Failed to load Cookiebot script')
      setIsInitialized(true)
    }

    window.CookiebotCallback_OnLoad = () => {
      // Cookiebot and existing consent data loads
      updateConsentState()
    }

    window.CookiebotCallback_OnAccept = () => {
      // User accepted all, changed a consent to true the confirmed
      // or previously granted consent is loaded with Cookiebot
      setIsDialogOpen(false)
      updateConsentState()
    }

    window.CookiebotCallback_OnDecline = () => {
      // User declined all, withdrew consent, or changed a consent to false then confirmed
      // or previously declined consent is loaded with Cookiebot

      setIsDialogOpen(false)
      updateConsentState()
    }

    window.CookiebotCallback_OnDialogDisplay = () => {
      // The main consent banner or modal is rendered
      setIsDialogOpen(true)
    }

    // Script injection
    document.head.appendChild(script)
  }, [setHasResponse, setConsent, setIsInitialized, setIsDialogOpen])

  return null
}

export default CookiebotProvider

/**
 * Cookiebot SDK
 * https://www.cookiebot.com/en/developer/
 *
 * Event handling
 * Name	Description
 * CookiebotOnConsentReady	The event is triggered when the user's consent state is ready, either from being submitted or loaded from an existing cookie. Listen for this event if you need to retreive the user's consent and run additional scripts as soon as possible based on consent values.
 * CookiebotOnLoad	The event is triggered at the same time as the window.onload event when the user's consent has been loaded - either when the user submits consent or when the user navigates to a page where consent has already been submitted.
 * CookiebotOnAccept	The event is triggered if the user accepts the use of cookies. The event is also triggered if the user has consented at an earlier visit to the website.
 * CookiebotOnDecline	The event is triggered if the user declines the use of cookies by clicking the decline-button in the cookie consent dialog. The event is also triggered if the user already has declined at an earlier visit to the website.
 * CookiebotOnDialogInit	Fires when the cookie consent banner is initialized, before compiling the content of the banner.
 * CookiebotOnDialogDisplay	Fires when the cookie consent banner is displayed to the end user.
 * CookiebotOnTagsExecuted	Fires when tags marked up for prior consent (e.g. the attribute "data-cookieconsent") have been triggered.
 *
 * Callbacks
 *
 * Name	Description
 * CookiebotCallback_OnLoad	The asynchronous callback is triggered when the cookie banner has loaded to get the user's consent.
 * CookiebotCallback_OnAccept	The asynchronous callback is triggered when the user clicks the accept-button of the cookie consent dialog and whenever a consented user loads a page.
 * CookiebotCallback_OnDecline	The asynchronous callback is triggered when the user declines the use of cookies by clicking the decline-button in the cookie consent dialog. The callback is also triggered whenever a user that has declined the use of cookies loads a page.
 * CookiebotCallback_OnDialogInit	Fires when the cookie consent banner is initialized, before compiling the content of the banner.
 * CookiebotCallback_OnDialogDisplay	Fires when the cookie consent banner is displayed to the end user.
 * CookiebotCallback_OnTagsExecuted	Fires when tags marked up for prior consent (e.g. the attribute "data-cookieconsent") have been triggered.
 *
 * Script tag data attributes
 *
 * Name	Type	Mandatory	Description
 * data-cbid	string	yes	The unique ID for your Cookiebot domain group.
 * data-type	string	no	Overrides the default dialog type with one of the following values:
 * "optin", "optout", "optinout", "leveloptin", "inlineoptin", "optionaloptin"
 * data-level	string	no	Overrides the default consent method with one of the following values: "implied", "strict"
 * data-culture	string	no	To force a specific language variant of the consent dialog, set the value of this attribute to a culture neutral ISO 639-1 language code, e.g. "EN" for English. Setting this attribute with a valid language overrides the "Auto-detect user language" setting in the Cookiebot manager.
 * data-framework	string	no	Enables Cookiebot to signal consent to other consent frameworks implemented on a website in addition to the default consent framework in Cookiebot. The value of the attribute must match the shortcode of the external framework. Currently supported third party consent frameworks: Shortcode "IAB": IAB Europe Transparency & Consent Framework.
 * data-blockingmode	string	no	Defines if Cookiebot should automatically block all cookies until a user has consented, value: "auto". If not, (value: "none") cookie-setting scripts should manually be marked up as described in our manual implementation guide. If you omit this attribute, behavior will equal value: "none".
 * data-consentmode	string	no	Allows you to disable Google Consent Mode by passing a value of "disabled".
 */
