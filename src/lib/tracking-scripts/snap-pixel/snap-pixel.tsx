'use client'

import Script from 'next/script'

export function SnapPixel() {
  return (
    <Script id={'snapchat-pixel'} type={'text/javascript'} strategy={'beforeInteractive'}>
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
  )
}
