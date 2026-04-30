import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Sidebar from '@/components/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'ningningzhang', template: '%s | ningningzhang' },
  description: 'Personal website — research, projects, blog, and life.',
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

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex min-h-screen bg-[#fafafa]">
        <NextIntlClientProvider messages={messages}>
          <Sidebar locale={locale} />
          <main className="ml-60 flex-1 min-h-screen">
            <div className="max-width-content px-14 py-12">
              {children}
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
