import type React from 'react'
import { Fjalla_One, Roboto } from 'next/font/google'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import './globals.css'
import i18nConfig from '@/i18nConfig'
import { notFound } from 'next/navigation'
import type { Locale } from '@/types'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Cyberfraud.lu',
  description: 'Cybersecurity Luxembourg',
}

const fjalla = Fjalla_One({ subsets: ['latin'], weight: '400', variable: '--font-fjalla' })
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = headersList.get('x-next-i18n-router-locale') || 'en'

  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={`${fjalla.variable} ${roboto.variable}`}>
      <body>
        {process.env.NODE_ENV === 'production' ? (
          <>
            <Script id={'snapchat-pixel'} strategy={'beforeInteractive'}>
              {`<!-- Snap Pixel Code -->
        (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
      {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
        a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
        r.src=n;var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);})(window,document,
        'https://sc-static.net/scevent.min.js');

        snaptr('init', '535377c6-c8c4-4bcd-a07e-82a720887f13', {
        'user_email': '__INSERT_USER_EMAIL__'
      });
        snaptr('track', 'PAGE_VIEW');
      <!-- End Snap Pixel Code -->`}
            </Script>
            <Script id={'meta-pixel'} strategy={'beforeInteractive'}>
              {`<!-- Meta Pixel Code -->
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '1229938371838750');
                  fbq('track', 'PageView');
                <!-- End Meta Pixel Code -->`}
            </Script>
            <Script id={'matomo'} strategy={'beforeInteractive'}>
              {`
              <!-- Matomo -->
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
              var u="https://matomo.lhc.lu/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '9']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
            <!-- End Matomo Code -->
            `}
            </Script>
          </>
        ) : (
          <></>
        )}
        {children}
      </body>
    </html>
  )
}
