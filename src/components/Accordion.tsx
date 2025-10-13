'use client'

import { CloseButton, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { LuCircleMinus, LuCirclePlus } from 'react-icons/lu'
import { Icon } from '@/components/Icon'

type AccordionProps = {
  title: string
  body: string | TrustedHTML
  icon: string
}

export const Accordion = ({ title, body, icon }: AccordionProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className='relative accordion'>
          <div className={'accordion-icon'}>
            <Icon name={icon} className={'text-secondary'} containerClassName={'w-[50px]'} />
          </div>
          <div className={'accordion-close-icon'}>
            <CloseButton>{open ? <LuCircleMinus /> : <LuCirclePlus />}</CloseButton>
          </div>
          <div className={'flex flex-col w-full items-center justify-center px-4 xl:px-0'}>
            <DisclosureButton className={'accordion-title'}>
              <div>
                <div className={'accordion-close-button'} />

                {title}
              </div>
            </DisclosureButton>

            <DisclosurePanel transition={true} className='accordion-body'>
              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: fine here */}
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </DisclosurePanel>
          </div>
        </div>
      )}
    </Disclosure>
  )
}
