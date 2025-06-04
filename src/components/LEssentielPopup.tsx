'use client'

import { Popup } from '@/components/Popup'
import { Title } from '@/components/Title'
import Link from 'next/link'
import React from 'react'
import essentiel from '@/assets/essentiel_image.png'
import Image from 'next/image'

export const LEssentielPopup = ({ isOpen = false }: { isOpen?: boolean }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(isOpen)

  return (
    <Popup
      content={
        <div className={'flex w-full items-center justify-start z-10'}>
          <div className={'items-center justify-center hidden lg:flex xl:flex-2/5'}>
            <Image src={essentiel} alt={"L'Essentiel"} className={'w-full object-contain'} />
          </div>
          <div className={'flex flex-col py-4 lg:py-16 px-4 xl:pl-0 xl:pr-16 xl:flex-3/5'}>
            <div>
              <Title level={'h1'} title={[{ title: 'Felicitations! ', style: 'secondary' }]} className={'uppercase'} />
              <Title level={'h2'} title={[{ title: 'Vous n’êtes PAS tombé sur ', style: 'primary' }]} />
              <Title level={'h2'} title={[{ title: 'un site frauduleux... ', style: 'primary' }]} />
            </div>
            <div className={'mt-4 lg:mt-16'}>
              <p className={'text-secondary font-semibold'}>Pourtant, l’annonce vous avait prévenu !</p>
              <p className={' font-semibold'}>
                Avant de scanner un QR Code bizarre, vérifiez toutes les infos et{' '}
                <b>renseignez-vous sur les bons réflexes à avoir sur cyberfraud.lu</b>, la plateforme officielle de
                prévention contre la cyberfraude au Luxembourg.
              </p>
            </div>
            <div className={'w-full flex justify-center mt-16'}>
              <Link
                href={'/'}
                onClick={() => setIsPopupOpen(false)}
                className={
                  'bg-black text-white w-full py-6 p-8 [clip-path:polygon(0_0,100%_0,100%_70%,95%_100%,0_100%)] uppercase'
                }
              >
                Continuer ma navigation sur <span className={'text-secondary'}>cyberfraud.lu</span>
              </Link>
            </div>
          </div>
        </div>
      }
      isPopupOpen={isPopupOpen}
    />
  )
}
