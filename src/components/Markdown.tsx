'use client'

import MarkdownDefault, { type Components } from 'react-markdown'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

/**
 * A Markdown component that renders markdown content with custom styling and link behavior.
 *
 * @param {string} [className] - An optional class name to apply to the root div element.
 * @param {React.ReactNode} [children] - The Markdown content to be rendered.
 */

interface MarkdownProps {
  className?: string
  children?: string
}

export const Markdown = ({ className, children }: MarkdownProps) => {
  const components: Components = {
    hr: () => <hr className={'mx-0 mt-8 mb-4 text-gray-300'} />,
    p: ({ children }) => <p className={'indent-0'}>{children}</p>,
    h1: ({ children }) => <h1 className={'mt-8 mb-12'}>{children}</h1>,
    h2: ({ children }) => <h2 className={'mt-8 mb-2'}>{children}</h2>,
    ol: ({ children }) => <ol className={'list-decimal pl-6'}>{children}</ol>,
    ul: ({ children }) => <ul className={'list-disc pl-6'}>{children}</ul>,
    a: ({ href, children, ...props }) => {
      const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

      if (!href) return children

      if (isInternalLink) {
        return (
          <Link href={href} {...props} className={'text-primary font-semibold hover:underline'}>
            {children}
          </Link>
        )
      }

      return (
        <Link
          href={href}
          {...props}
          rel={'noopener noreferrer'}
          target={'_blank'}
          className={'font-semibold text-primary hover:underline'}
        >
          {children}
        </Link>
      )
    },
  }

  return (
    <div className={twMerge('', className)}>
      <MarkdownDefault components={components}>{children}</MarkdownDefault>
    </div>
  )
}
