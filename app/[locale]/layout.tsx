import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
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
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex min-h-screen bg-[#f4f7fa]">
        <NextIntlClientProvider messages={messages}>
          <Sidebar locale={locale} />
          <main className="ml-64 min-h-screen flex-1">
            <div className="px-12 py-12 xl:px-16">
              {children}
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
