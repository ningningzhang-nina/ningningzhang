'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'papers', href: '/papers' },
  { key: 'blog', href: '/blog' },
  { key: 'travel', href: '/travel' },
  { key: 'projects', href: '/projects' },
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
    <header className="sticky top-0 z-50 border-b border-[#18385c] bg-[#0f2742]">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/profile/avatar.jpeg`}
            alt="Ningning Zhang"
            className="h-10 w-10 rounded-full border border-[#bda36b] object-cover"
          />
          <span>
            <span className="block text-[15px] font-semibold text-white">Ningning Zhang</span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-[#d6c28b]">Academic Profile</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={localizedHref(href)}
              className={`text-[13px] font-medium transition-colors ${
                isActive(href) ? 'text-white' : 'text-[#b8c6d8] hover:text-white'
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <Link
          href={otherLocalePath}
          className="rounded-full border border-[#5d7390] px-3 py-1.5 text-[12px] font-medium text-[#dbe5f1] transition-colors hover:border-[#d6c28b] hover:text-white"
        >
          {otherLocale === 'zh' ? '中文' : 'EN'}
        </Link>
      </div>
    </header>
  );
}
