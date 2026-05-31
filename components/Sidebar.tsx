'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const navItems = [
  { key: 'home', href: '/', icon: '01' },
  { key: 'about', href: '/about', icon: '02' },
  { key: 'papers', href: '/papers', icon: '03' },
  { key: 'blog', href: '/blog', icon: '04' },
  { key: 'projects', href: '/projects', icon: '05' },
  { key: 'life', href: '/life', icon: '06' },
] as const;

export default function Sidebar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const isActive = (href: string) => {
    const localePath = `/${locale}${href === '/' ? '' : href}`;
    if (href === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(localePath);
  };

  const localizedHref = (href: string) => `/${locale}${href === '/' ? '' : href}`;

  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-[#dfe5ec] bg-[#f7f9fb]">
      {/* Profile */}
      <div className="px-7 pb-7 pt-9">
        <div className="mb-5 flex h-14 w-14 items-center justify-center border border-[#c8d2df] bg-white text-[20px] font-semibold text-[#102033] shadow-sm">
          NZ
        </div>
        <div className="text-[16px] font-semibold text-[#102033]">张宁宁</div>
        <div className="mt-0.5 text-[13px] font-medium text-[#536276]">Ningning Zhang</div>
        <div className="mt-3 h-px w-12 bg-[#b68a3a]" />
        <div className="mt-3 text-[12px] leading-5 text-[#6d7b8c]">Ph.D. in Statistics<br />The University of Hong Kong</div>
      </div>

      <div className="mb-4 px-4">
        <div className="h-px bg-[#dfe5ec]" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map(({ key, href, icon }) => (
            <li key={key}>
              <Link
                href={localizedHref(href)}
                className={`flex items-center gap-3 px-3 py-2.5 text-[14px] transition-colors duration-100 ${
                  isActive(href)
                    ? 'bg-white text-[#102033] font-semibold shadow-sm'
                    : 'text-[#536276] hover:bg-white hover:text-[#102033]'
                }`}
              >
                <span className={`w-7 text-[11px] font-semibold ${isActive(href) ? 'text-[#b68a3a]' : 'text-[#9aa7b6]'}`}>{icon}</span>
                <span>{t(key)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom: lang switch + social */}
      <div className="px-4 pb-6 pt-4">
        <div className="mb-4 h-px bg-[#dfe5ec]" />

        {/* Language switcher */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase text-[#8a96a6]">Lang</span>
          <Link
            href={otherLocalePath}
            className="ml-auto border border-[#c8d2df] bg-white px-2.5 py-1 text-[12px] text-[#536276] transition-colors hover:border-[#102033]"
          >
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
        </div>

        {/* Social links */}
        <div className="flex gap-3">
          <a href="mailto:zhangnn0725@163.com"
            className="text-[12px] text-[#6d7b8c] hover:text-[#102033] transition-colors">
            Email
          </a>
          <a href="https://ningningzhang-nina.github.io/" target="_blank" rel="noopener noreferrer"
            className="text-[12px] text-[#6d7b8c] hover:text-[#102033] transition-colors">
            主页
          </a>
        </div>
      </div>
    </aside>
  );
}
