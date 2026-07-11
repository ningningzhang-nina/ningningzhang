'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'papers', href: '/papers' },
  { key: 'blog', href: '/blog' },
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
] as const;

export default function Sidebar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const isActive = (href: string) => {
    const localePath = localizedHref(href);
    if (href === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(localePath);
  };

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
        <Link href={`/${locale}`} className="brand-mark group">
          <span className="block text-[17px] font-bold tracking-[0.07em]">NINGNING ZHANG</span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.19em] md:block">Forecasting · Optimization</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={localizedHref(href)}
              className={`nav-link text-[13px] font-semibold transition-colors ${
                isActive(href) ? 'active' : ''
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/projects`}
            className="mobile-project-link text-[12px] font-semibold md:hidden"
          >
            {locale === 'zh' ? '项目' : 'Work'}
          </Link>
          <Link href={otherLocalePath} className="language-switch">
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
        </div>
      </div>
    </header>
  );
}
