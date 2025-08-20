'use client'

import dynamic from 'next/dynamic'

export { cookiebotConfig } from './cookiebot-config'

export const CookiebotProvider = dynamic(() => import('./cookiebot-provider'), { ssr: false, loading: () => null })
