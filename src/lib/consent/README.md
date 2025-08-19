## Cookie consent provider for Next.js apps

## Introduction
A simple cookie consent management system that can be expanded with multiple 3rd party cookie consent management providers with a unified interface.

### Currently supported providers:
- Cookiebot *(used in the examples below)*
- Axeptio

## Implementation guide

Consider **./src/lib/consent** as the root path in the following instructions.

1. Verify that there is a provider component implemented for the chosen consent management service in **./providers/***.
2. Verify that **./index.ts** exports the desired provider component as CookieConsentProvider and the **useConsentStore** hook. 

```tsx
// src/lib/consent/index.ts

export { useConsentStore } from './store/use-consent-store'
export { CookiebotProvider as CookieConsentProvider } from './providers/cookiebot'
```
3. Import CookieConsentProvider from **./index.ts** into the NextJS App Router's root layout (src/app/layout.tsx), inside the <head></head>.

```tsx 
// src/app/layout.tsx

import { CookieConsentProvider } from '@/lib/consent'

export default function RootLayout({ children }) {
  return (
    <html>
    <head>
      <CookieConsentProvider />
    </head>
    <body>{children}</body>
    </html>
  )
}
```
### Content blocking 

Although cookie consent management solutions may offer automatic script blocking, it is best practice to fully control 
the render of features in the app that require prior and explicit user consent, in compliance with the regulations that 
apply.

#### Reading the consent state in components and conditional rendering

By reading the consent states for preferences, statistics or marketing, you can  implement conditional rendering in 
the components to ensure that the rendered features reflect what the user explicitly consented to.

We can use the **useConsentStore** hook to read the consent provider's states and current user's consent preferences:

```tsx
// src/components/MyComponent.tsx
import { useConsentStore } from '@/lib/consent'

const MyComponent = () => {
  const { consent, isInitialized, hasResponse } = useConsentStore()
  
  if (!isInitialized) {
    return <div>Loading consent preferences...</div>
  }
  
  if (!hasResponse) {
    return (<div>Please accept or decline cookies to continue.</div>)
  }
  
  return (
    <div>
      {consent?.marketing 
        ? <div>Rendered marketing content</div>
        : <div>No marketing content</div>
      }
    </div>
  )
}
```

## Environment variables (production and development)

```bash 
# Example: Cookiebot

NEXT_PUBLIC_CM_COOKIEBOT_ID=CookieBot
NEXT_PUBLIC_CM_COOKIEBOT_SCRIPT_SRC=https://consent.cookiebot.com/uc.js
NEXT_PUBLIC_CM_COOKIEBOT_CBID=12345678-1234-1234-1234-123456789012
```
The required configuration and variables are typically provided in the administration page of the 3rd party cookie 
consent management service. 

## Implementing more providers

Other cookie consent providers can be used with the same approach. 

Cookiebot is just one example, and more providers can be created and added to the **./providers** directory. 

Examine each file, API or SDK references online to better understand how to integrate more 3rd party cookie banner
scripts into this Next.js solution.