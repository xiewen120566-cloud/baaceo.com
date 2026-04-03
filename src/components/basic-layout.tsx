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
          id="google-gpt-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.googletag = window.googletag || { cmd: [] };
            `,
          }}
        />
        <Script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
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
