'use client'

import React from 'react'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import Link from 'next/link'
import { IoCloseCircle } from 'react-icons/io5'

type PopupProps = {
  content: React.ReactNode
  isPopupOpen?: boolean
}

export const Popup = ({ content, isPopupOpen = false }: PopupProps) => {
  const [isOpen, setIsOpen] = React.useState(isPopupOpen)

  React.useEffect(() => {
    setIsOpen(isPopupOpen)
  }, [isPopupOpen])

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={'relative z-50 bg-white'}>
      <DialogBackdrop className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
      <div className='fixed inset-0 flex w-screen items-center justify-center lg:overflow-hidden overflow-y-auto'>
        <DialogPanel className='secondary-stripes-transparent p-4 flex items-center justify-center m-auto w-full xl:m-[10%] 2xl:m-[30%]'>
          <div className={'bg-white w-full h-full relative flex items-center justify-center'}>
            {content}
            <div className={'absolute top-[10px] right-[10px] z-20'}>
              <Link href={'/'} onClick={() => setIsOpen(false)} className={'cursor-pointer'}>
                <IoCloseCircle className={'text-secondary text-2xl xl:text-4xl'} />
              </Link>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
