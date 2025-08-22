'use client'

import MarkdownDefault, { type Components } from 'react-markdown'
import Link from 'next/link'
import rehypeSlug from 'rehype-slug';

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
    h1: ({ children, id }) => <h1 id={id} className={'mt-8 mb-12'}>{children}</h1>,
    h2: ({ children, id }) => <h2 id={id} className={'mt-8 mb-2'}>{children}</h2>,
    h3: ({ children, id }) => <h3 id={id} className={'mt-8 mb-2'}>{children}</h3>,
    ol: ({ children }) => <ol className={'list-decimal pl-6'}>{children}</ol>,
    ul: ({ children }) => <ul className={'list-disc pl-6'}>{children}</ul>,
    a: ({ href, children, ...props }) => {
      if (!href) {
        return children
      }

      const isInternalLink = href.startsWith('/') || href.startsWith('#')

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
    <div className={className}>
      <MarkdownDefault rehypePlugins={[rehypeSlug]} components={components}>{children}</MarkdownDefault>
    </div>
  )
}
