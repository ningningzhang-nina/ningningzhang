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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resumeHref = `${basePath}/${locale === 'zh' ? 'Ningning_Zhang_Resume_ZH.pdf' : 'Ningning_Zhang_Resume_EN.pdf'}`;

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;
  const isActive = (href: string) => {
    const localePath = localizedHref(href);
    if (href === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(localePath);
  };

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex h-[68px] max-w-[1160px] items-center justify-between px-5 md:px-8">
        <Link href={`/${locale}`} className="brand-mark group">
          <span className="block text-[17px] font-bold tracking-[0.07em]">NINGNING ZHANG</span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.19em] md:block">Pricing · Decision Intelligence</span>
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
          <a href={resumeHref} download className="resume-download">
            {locale === 'zh' ? '简历下载' : 'Resume PDF'}
          </a>
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
