'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, CloseButton } from '@headlessui/react'
import {} from 'react-icons/fa6'
import { LuCircleMinus, LuCirclePlus } from 'react-icons/lu'
import { Icon } from '@/components/Icon'

type AccordionProps = {
  title: string
  body: string | TrustedHTML
  icon: string
}

export const Accordion = ({ title, body, icon }: AccordionProps) => {
  return (
    <div className={'accordion'}>
      <div className={'flex items-center justify-center w-[200px] p-4'}>
        <Icon name={icon} className={'text-secondary'} containerClassName={'w-[50px]'} />
      </div>
      <Disclosure>
        {({ open }) => (
          <div className='relative bg-white w-full overflow-hidden flex flex-col items-center justify-center py-12'>
            <div
              className={`transition duration-200 ease-out absolute top-0 right-0 w-0 h-0 ${!open ? 'border-t-[50px] border-l-[50px]' : 'border-t-[80px] border-l-[80px]'} border-t-primary border-l-transparent`}
            />
            <div
              className={`absolute top-0 right-0 flex items-center justify-center ${!open ? 'w-8 h-8' : 'w-12 h-12'} text-white`}
            >
              <CloseButton>{open ? <LuCircleMinus /> : <LuCirclePlus />}</CloseButton>
            </div>

            <DisclosureButton className={'accordion-title'}>{title}</DisclosureButton>

            <DisclosurePanel transition={true} className='accordion-body'>
              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </DisclosurePanel>
          </div>
        )}
      </Disclosure>
    </div>
  )
}
