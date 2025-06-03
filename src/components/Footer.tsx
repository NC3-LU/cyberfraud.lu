import Image from 'next/image'
import {} from 'react-icons/fa6'
import Link from 'next/link'

type FooterProps = {
  siteDescription: string
  patronage: string
}

export const Footer = ({ siteDescription, patronage }: FooterProps) => {
  return (
    <div className={'bg-content py-16 pt-10 xl:pt-18'}>
      <div className={'section text-white'}>
        <div className={'text-secondary uppercase mt-8 xl:mt-18 mb-16 text-center xl:text-left'}>
          <Link href={'/'} className={'font-semibold hover:underline'}>
            cyberfraud.lu
          </Link>{' '}
          {siteDescription}
        </div>
        <div
          className={
            'flex flex-col xl:flex-row items-center xl:items-end justify-center xl:justify-between mb-16 gap-16 xl:gap-2'
          }
        >
          <div
            className={
              'w-[80%] xl:w-full xl:max-w-max mx-auto xl:mx-0 flex flex-col items-center xl:items-start justify-center'
            }
          >
            <div className={'mb-4 uppercase text-base text-center xl:text-left'}>{patronage}</div>
            <div className={'w-full'}>
              <Link href={'https://meco.gouvernement.lu/fr.html'} target={'_blank'} rel={'noreferrer noopener'}>
                <Image src={'/images/meco.svg'} alt={'MECO'} width={200} height={200} className={'h-auto w-full'} />
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
            <div
              className={
                'w-full uppercase mt-4 justify-self-start text-center xl:text-left flex flex-col items-center justify-center xl:items-start'
              }
            >
              <div className={'w-full'}>
                Luxembourg House
                <br /> of Cybersecurity
              </div>
              <div className={'mt-2 w-full'}>
                <Link
                  href={'https://lhc.lu'}
                  target={'_blank'}
                  rel={'noreferrer noopener'}
                  className={'text-secondary normal-case hover:underline font-semibold'}
                >
                  lhc.lu
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={'text-base mx-auto xl:mx-0'}>Terms of Service & Privacy Policy</div>
      </div>
    </div>
  )
}
