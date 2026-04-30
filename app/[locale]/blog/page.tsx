import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title') };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-2">{t('title')}</h1>
        <p className="text-[15px] text-[#888]">{t('subtitle')}</p>
      </div>

      <div className="divide-y divide-[#f5f5f5]">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group block py-5 -mx-2 px-2 rounded-lg hover:bg-[#fafafa] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-[16px] font-semibold text-[#0a0a0a] mb-1.5 group-hover:text-black">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="text-[14px] text-[#888] leading-relaxed mb-2 line-clamp-2">
                    {post.summary}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[11px] bg-[#f5f5f5] text-[#666] px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[13px] text-[#bbb]">{post.date.slice(0, 7)}</div>
                {post.readingTime && (
                  <div className="text-[12px] text-[#ccc] mt-0.5">{post.readingTime} {t('minRead')}</div>
                )}
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="text-[15px] text-[#bbb] py-5">
            {locale === 'zh' ? '暂无文章，请在 content/blog/zh/ 目录添加 .mdx 文件。' : 'No posts yet. Add .mdx files to content/blog/en/.'}
          </p>
        )}
      </div>
    </div>
  );
}
