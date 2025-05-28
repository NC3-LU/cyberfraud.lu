import Link from 'next/link'
import { Icon } from '@/components/Icon'

type FooterItem = {
  type: 'link' | 'text'
  label: string
  icon?: string
}

type FooterItemLink = FooterItem & {
  type: 'link'
  url: string
}

type FooterItemText = FooterItem & {
  type: 'text'
  title: string
}

const isLink = (item: FooterItem): item is FooterItemLink => item.type === 'link'

type CardProps = {
  title: string
  body?: string | string[]
  className?: string
  icon?: string
  iconSize?: string
  footerItems?: (FooterItemLink | FooterItemText)[]
  style?: 'light' | 'dark' | 'alert'
}

export const Card = ({
  title,
  body,
  icon,
  iconSize = 'normal',
  footerItems,
  className = '',
  style = 'light',
}: CardProps) => {
  return (
    <div className={'relative'}>
      {style === 'dark' ? (
        <div className='absolute inset-0 bg-white/80 [clip-path:polygon(0_0,100%_0,100%_90%,85%_100%,0_100%)]' />
      ) : (
        <></>
      )}
      <div className={`card ${style} ${className}`}>
        {icon ? (
          <div className={'card-icon'}>
            <Icon
              name={icon}
              className={`${iconSize === 'normal' ? 'w-[152px]' : 'w-[189px]'} ${style === 'alert' || style === 'dark' ? 'text-white' : 'text-secondary'}`}
              containerClassName={`${style === 'dark' ? 'w-[65px]' : ''}`}
            />
          </div>
        ) : (
          <></>
        )}
        <div className={'card-body'}>
          <div className={'card-title'}>{title}</div>
          {body ? (
            Array.isArray(body) ? (
              body.map((b, i) => (
                <p
                  key={`card_${title}_body_${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    i
                  }`}
                >
                  {b}
                </p>
              ))
            ) : (
              <p>{body}</p>
            )
          ) : (
            <></>
          )}
          {footerItems ? (
            <div className={'card-footer'}>
              {footerItems.map((item) => {
                return (
                  <div className={'card-footer-item text-sm'} key={`card_${title}_${item.label}`}>
                    <div className={''}>
                      <Icon
                        name={item.icon || 'arrow'}
                        className={'text-secondary'}
                        containerClassName={`${item.icon ? 'w-[20px]' : 'w-[15px]'}`}
                      />
                    </div>
                    {isLink(item) ? (
                      <Link href={item.url} target={'_blank'} rel={'noreferrer noopener'}>
                        {item.label}
                      </Link>
                    ) : (
                      <div className={'flex flex-col'}>
                        <div className={'font-semibold'}>{item.title}</div>
                        <div>{item.label}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
