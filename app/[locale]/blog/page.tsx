import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getAllPosts, getAllBlogTags } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
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

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);
  const allTags = getAllBlogTags(locale);

  // 按年月分组
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const key = post.date.slice(0, 7); // "2025-08"
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
                href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}
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
          {locale === 'zh' ? '暂无文章，在 content/blog/zh/ 添加 .mdx 文件。' : 'No posts yet. Add .mdx files to content/blog/en/.'}
        </p>
      )}

      {sortedKeys.map((key) => (
        <section key={key} className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-4">
            {formatYearMonth(key, locale)}
          </h2>
          <div className="divide-y divide-[#f5f5f5]">
            {grouped[key].map((post) => {
              const isExternal = !!post.externalUrl;
              const inner = (
                <>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-[#0a0a0a] mb-1 group-hover:text-black">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="text-[13px] text-[#888] leading-relaxed mb-1.5 line-clamp-1">
                        {post.summary}
                      </p>
                    )}
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
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className="text-[12px] text-[#bbb]">{post.date.slice(8, 10)}日</span>
                    {isExternal && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#f0f5ff] text-[#3d7cf5] rounded font-medium">
                        知乎
                      </span>
                    )}
                  </div>
                </>
              );
              return isExternal ? (
                <a
                  key={post.slug}
                  href={post.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 py-4 -mx-2 px-2 rounded-lg hover:bg-[#fafafa] transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-4 py-4 -mx-2 px-2 rounded-lg hover:bg-[#fafafa] transition-colors"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
