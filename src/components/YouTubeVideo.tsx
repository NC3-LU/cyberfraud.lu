'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { StaticRequire, StaticImport } from 'next/dist/shared/lib/get-img-props'

type YouTubeVideoProps = {
  videoUrl: string
  embedUrl: string
  image: string | StaticRequire | StaticImport
  hasConsent?: boolean
}

export const YouTubeVideo = ({ videoUrl, embedUrl, image, hasConsent = false }: YouTubeVideoProps) => {
  const [isEmbedded, setIsEmbedded] = React.useState<boolean>(false)

  if (!hasConsent) {
    return (
      <Link href={videoUrl} target={'_blank'} rel='noopener noreferrer'>
        <Image src={image} alt={'Video @YouTube'} />
      </Link>
    )
  }

  return (
    <>
      {!isEmbedded ? (
        <Image src={image} alt={'YouTubeVideo'} className={'cursor-pointer'} onClick={() => setIsEmbedded(true)} />
      ) : (
        <>
          <iframe
            src={embedUrl}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
            className={'w-full h-auto aspect-video'}
          />
        </>
      )}
    </>
  )
}
