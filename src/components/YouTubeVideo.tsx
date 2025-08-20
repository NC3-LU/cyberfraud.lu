'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { StaticRequire, StaticImport } from 'next/dist/shared/lib/get-img-props'
import { useConsentStore } from '@/lib/consent'

type YouTubeVideoProps = {
  videoUrl: string
  embedUrl?: string
  image: string | StaticRequire | StaticImport
  alt?: string
  title?: string
}

export const YouTubeVideo = ({ videoUrl, embedUrl, image, alt, title }: YouTubeVideoProps) => {
  const { consent } = useConsentStore()
  const imgAlt = alt ?? 'Video @YouTube'
  const iframeTitle = title ?? 'YouTube video player'

  if (!embedUrl || !consent?.marketing) {
    return (
      <Link
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={imgAlt}
      >
        <Image src={image} alt={imgAlt} />
      </Link>
    )
  }

  return (
    <iframe
      src={embedUrl}
      title={iframeTitle}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      loading="lazy"
      className="aspect-video h-auto w-full"
    />
  )
}
