import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'

export const Footer = () => {
  return (
    <div className={'bg-content py-16 pt-36'}>
      <div className={'section text-white'}>
        <div className={'flex flex-col'}>
          <div className={'flex items-end justify-between mb-24 gap-4 '}>
            <div className={'max-w-max mr-24'}>
              <div className={'uppercase font-secondary text-2xl  mb-8'}>
                Luxembourg House
                <br />
                of Cybersecurity
              </div>
              <div className={'text-base'}>
                122 rue Adolphe Fischer
                <br />
                L-1521 Luxembourg
              </div>
            </div>
            <div className={'max-w-max text-base'}>
              <div>
                <Link href={'mailto:info@lhc.lu'} className={'hover:text-primary hover:underline'}>
                  info@lhc.lu
                </Link>
              </div>
              <div>(+352) 274 00 98 601</div>
            </div>
            <div className={'flex-4/12 flex items-start pl-16 gap-16'}>
              <div>
                <Link
                  href={'https://x.com/cyberluxembourg'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={'hover:text-primary hover:underline'}
                >
                  <FaXTwitter className={'text-5xl'} />
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.linkedin.com/company/cybersecurity-luxembourg/'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={'hover:text-primary hover:underline'}
                >
                  <FaLinkedinIn className={'text-5xl'} />
                </Link>
              </div>
            </div>
            <div className={'w-[290px] text-right'}>
              <Image
                src={'/images/cy_logo_inverted.svg'}
                alt={'Cybersecurity Luxembourg'}
                width={500}
                height={222}
                className={'object-contain w-full h-auto'}
                priority={true}
              />
            </div>
          </div>
        </div>
        <div className={'text-base'}>Terms of Service & Privacy Policy</div>
      </div>
    </div>
  )
}
