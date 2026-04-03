import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { PropsWithChildren } from "react";
import Script from "next/script";

import { Locale } from "@/i18n/routing";

import { Providers } from "./providers";

interface Props extends PropsWithChildren {
  locale: Locale;
}

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <Script
          id="google-gpt-stub"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.googletag = window.googletag || {
  cmd: [],
  pubads: function() { return {}; },
  enableServices: function() {},
  defineSlot: function() { return { addService: function() { return {}; } }; }
};
            `,
          }}
        />
        <Script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script
          id="google-gpt-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.googletag = window.googletag || {cmd: []};
googletag.cmd.push(function() {
  googletag.defineSlot('/23319049762/ad-2', [320, 100], 'div-gpt-ad-1775218163351-0').addService(googletag.pubads());
  googletag.defineSlot('/23319049762/ad-2', [320, 100], 'div-gpt-ad-1775218163351-1').addService(googletag.pubads());
  googletag.pubads().collapseEmptyDivs(true);
  googletag.pubads().addEventListener('slotRenderEnded', function(event) {
    console.log('GAM slotRenderEnded:', {
      slotId: event.slot.getSlotElementId(),
      isEmpty: event.isEmpty,
      size: event.size
    });
  });
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
