'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const navItems = [
  { key: 'home', href: '/', icon: '⌂' },
  { key: 'about', href: '/about', icon: '◉' },
  { key: 'projects', href: '/projects', icon: '◈' },
  { key: 'blog', href: '/blog', icon: '✐' },
  { key: 'papers', href: '/papers', icon: '◻' },
  { key: 'life', href: '/life', icon: '◎' },
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
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-[#ebebeb] flex flex-col z-50">
      {/* Profile */}
      <div className="px-7 pt-8 pb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0] flex items-center justify-center text-xl mb-4 select-none">
          人
        </div>
        <div className="text-[15px] font-semibold tracking-tight text-[#0a0a0a]">张宁宁 Ningning Zhang</div>
        <div className="text-[12px] text-[#999] mt-0.5">统计学博士 · 香港大学</div>
      </div>

      <div className="px-4 mb-2">
        <div className="h-px bg-[#f0f0f0]" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-0.5">
          {navItems.map(({ key, href, icon }) => (
            <li key={key}>
              <Link
                href={localizedHref(href)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] transition-colors duration-100 ${
                  isActive(href)
                    ? 'bg-[#f5f5f5] text-[#0a0a0a] font-medium'
                    : 'text-[#555] hover:bg-[#f9f9f9] hover:text-[#0a0a0a]'
                }`}
              >
                <span className="text-[16px] w-5 text-center opacity-70">{icon}</span>
                <span>{t(key)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom: lang switch + social */}
      <div className="px-4 pb-6 pt-4">
        <div className="h-px bg-[#f0f0f0] mb-4" />

        {/* Language switcher */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] text-[#bbb] uppercase tracking-wider">Lang</span>
          <Link
            href={otherLocalePath}
            className="ml-auto text-[12px] px-2.5 py-1 rounded-md border border-[#ebebeb] text-[#555] hover:bg-[#f5f5f5] transition-colors"
          >
            {otherLocale === 'zh' ? '中文' : 'EN'}
          </Link>
        </div>

        {/* Social links */}
        <div className="flex gap-3">
          <a href="mailto:zhangnn0725@163.com"
            className="text-[12px] text-[#bbb] hover:text-[#555] transition-colors">
            Email
          </a>
          <a href="https://ningningzhang-nina.github.io/" target="_blank" rel="noopener noreferrer"
            className="text-[12px] text-[#bbb] hover:text-[#555] transition-colors">
            主页
          </a>
        </div>
      </div>
    </aside>
  );
}
