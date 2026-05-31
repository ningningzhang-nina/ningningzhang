import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllLifePosts, getAllLifeTags } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'life' });
  return { title: t('title') };
}

function formatYearMonth(date: string, locale: string): string {
  if (!date || date.length < 7) return date;
  const [year, month] = date.slice(0, 7).split('-');
  if (locale === 'zh') {
    return `${year}年${parseInt(month)}月`;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default async function LifePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'life' });
  const posts = getAllLifePosts();
  const allTags = getAllLifeTags();

  // 按年月分组
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const key = post.date.slice(0, 7);
    if (!acc[key]) acc[key] = [];
    acc[key].push(post);
    return acc;
  }, {});
  const sortedKeys = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-2">{t('title')}</h1>
        <p className="text-[15px] text-[#888]">{t('subtitle')}</p>
      </div>

      {/* 标签云 */}
      {allTags.length > 0 && (
        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-3">
            {locale === 'zh' ? '标签' : 'Tags'}
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/life/tag/${encodeURIComponent(tag)}`}
                className="px-3 py-1.5 bg-white border border-[#ebebeb] rounded-full text-[13px] text-[#555] hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 按年月分组 */}
      {sortedKeys.length === 0 && (
        <p className="text-[15px] text-[#bbb]">
          {locale === 'zh' ? '暂无内容，在 content/life/ 目录添加 .md 文件。' : 'No posts yet. Add .md files to content/life/.'}
        </p>
      )}

      {sortedKeys.map((key) => (
        <section key={key} className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-4">
            {formatYearMonth(key, locale)}
          </h2>
          <div className="space-y-3">
            {grouped[key].map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/life/${post.slug}`}
                className="group flex items-start justify-between gap-4 bg-white border border-[#ebebeb] rounded-xl p-4 hover:border-[#d0d0d0] hover:shadow-sm transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-[#0a0a0a] mb-1 group-hover:text-black">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-[#888] leading-relaxed line-clamp-1 mb-2">
                    {post.content.replace(/^#+\s.*/gm, '').trim().slice(0, 80)}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-[#f5f5f5] rounded-full text-[11px] text-[#666]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[12px] text-[#bbb] shrink-0 mt-0.5">{post.date.slice(8, 10)}日</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
