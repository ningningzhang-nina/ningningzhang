import { getTranslations } from 'next-intl/server';
import { getAllLifePosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life' });
  return { title: t('title') };
}

export default async function LifePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'life' });
  const posts = getAllLifePosts();

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-2">{t('title')}</h1>
        <p className="text-[15px] text-[#888]">{t('subtitle')}</p>
      </div>

      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-[#f5f5f5] pb-10 last:border-0">
            <div className="flex items-baseline gap-3 mb-4">
              <h2 className="text-[18px] font-semibold text-[#0a0a0a]">{post.title}</h2>
              <span className="text-[13px] text-[#bbb]">{post.date.slice(0, 7)}</span>
            </div>

            {/* Images grid */}
            {post.images && post.images.length > 0 && (
              <div className={`grid gap-2 mb-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {post.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="aspect-video bg-[#f5f5f5] rounded-xl overflow-hidden">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            <p className="text-[15px] text-[#555] leading-relaxed whitespace-pre-line">
              {post.content.slice(0, 400)}{post.content.length > 400 ? '...' : ''}
            </p>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="text-[15px] text-[#bbb]">
            {locale === 'zh' ? '暂无内容，请在 content/life/ 目录添加。' : 'No posts yet. Add .md files to content/life/.'}
          </p>
        )}
      </div>
    </div>
  );
}
