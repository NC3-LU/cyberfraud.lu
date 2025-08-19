'use client'

import dynamic from 'next/dynamic'

export const AxeptioProvider = dynamic(() => import('././axeptio-provider'), { ssr: false })
