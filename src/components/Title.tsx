import React from 'react'

type TitleProps = {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  title:
    | string
    | Array<{
        title: string
        style: string
      }>
  style?: string
  className?: string
}

export const TitleItem = ({
  title,
  style = 'primary',
  className = '',
}: {
  title: string
  style?: string
  className?: string
}) => {
  return <span className={`${style} inline-block p-2 px-3 max-w-max ${className}`}>{title}</span>
}

export const Title = ({ level, title, style, className = '' }: TitleProps) => {
  return React.createElement(
    level,
    {
      className: !Array.isArray(title)
        ? `${style} p-2 px-3 max-w-max ${className}`
        : `flex flex-col items-start ${className}`,
    },
    Array.isArray(title)
      ? title.map((t, index) => <TitleItem title={t.title} style={t.style} key={`title_${t.title}_${index}`} />)
      : title,
  )
}
