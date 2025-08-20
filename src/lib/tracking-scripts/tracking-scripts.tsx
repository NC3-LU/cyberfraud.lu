'use client'

import { SnapPixel } from './snap-pixel/snap-pixel'
import { MetaPixel } from './meta-pixel/meta-pixel'
import { Matomo } from './matomo/matomo'
import { useConsentStore } from '@/lib/consent/store/use-consent-store'

/**
 *
 * This React component conditionally renders tracking scripts according to the user's explicitly given consent and
 * according to purpose (e.g. marketing, statistics.
 *
 * This is implemented alongside a cookie consent management script that updates its consent values, loaded and response
 * states to a consent store.
 *
 * The consent store should have the states with following types:
 * - consent: { preferences?: boolean, statistics?: boolean, marketing?: boolean }
 * - isInitialized: boolean
 * - hasResponse: boolean
 *
 * (Refactor as needed)
 *
 * ## Usage - ./src/app/layout.tsx (root layout)
 *
 * ```tsx title=./src/app/layout.tsx
 *  import { TrackingScripts } from '@lib/tracking-scripts'
 *
 *  export default async function RootLayout({ children }: { children: React.ReactNode }) {
 *
 *    return (
 *      <html>
 *        <body>
 *          {process.env.NODE_ENV === 'production'
 *            ? <TrackingScripts />
 *            : null
 *          }
 *          {children}
 *        </body>
 *      </html>
 *    )
 *  }
 *
 * ```
 *
 */

export const TrackingScripts = () => {
  const { hasResponse, isInitialized, consent } = useConsentStore()

  if (!isInitialized || !hasResponse) {
    return null
  }

  return (
    <>
      {consent?.marketing && <SnapPixel />}
      {consent?.marketing && <MetaPixel />}
      {consent?.statistics && <Matomo />}
    </>
  )
}
