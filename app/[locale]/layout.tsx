import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Ningning Zhang', template: '%s | Ningning Zhang' },
  description: 'Statistical forecasting, optimization, applied algorithms, and research.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'zh' | 'en')) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Sidebar locale={locale} />
          <main className="min-h-screen">
            <div>
              {children}
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
