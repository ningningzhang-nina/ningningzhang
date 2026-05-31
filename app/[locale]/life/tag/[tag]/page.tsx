import Link from 'next/link';
import { getLifePostsByTag, getAllLifeTags } from '@/lib/content';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const tags = getAllLifeTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)}` };
}

export default async function LifeTagPage({ params }: { params: Promise<{ locale: string; tag: string }> }) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  const decodedTag = decodeURIComponent(tag);
  const posts = getLifePostsByTag(decodedTag);

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-2xl">
      {/* 返回 */}
      <Link
        href={`/${locale}/life`}
        className="inline-flex items-center gap-1.5 text-[13px] text-[#999] hover:text-[#0a0a0a] mb-8 transition-colors"
      >
        ← {locale === 'zh' ? '所有回忆' : 'All memories'}
      </Link>

      {/* 标题 */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[13px] text-[#bbb]">{locale === 'zh' ? '标签' : 'Tag'}</span>
          <span className="px-3 py-1 bg-[#0a0a0a] text-white rounded-full text-[13px] font-medium">
            {decodedTag}
          </span>
        </div>
        <p className="text-[15px] text-[#888]">
          {posts.length} {locale === 'zh' ? '篇回忆' : 'memories'}
        </p>
      </div>

      {/* 该标签下的回忆列表 */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/life/${post.slug}`}
            className="group block bg-white border border-[#ebebeb] rounded-xl p-5 hover:border-[#d0d0d0] hover:shadow-sm transition-all"
          >
            {post.images && post.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {post.images.slice(0, 3).map((img, i) => (
                  <div key={i} className="w-16 h-16 rounded-lg bg-[#f5f5f5] overflow-hidden flex-shrink-0">
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-[15px] font-semibold text-[#0a0a0a] mb-1.5 group-hover:text-black">
                  {post.title}
                </h2>
                <p className="text-[13px] text-[#888] leading-relaxed line-clamp-2 mb-2">
                  {post.content.replace(/^#+\s.*/gm, '').trim().slice(0, 100)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        t === decodedTag
                          ? 'bg-[#0a0a0a] text-white'
                          : 'bg-[#f5f5f5] text-[#666]'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[12px] text-[#bbb] shrink-0">{post.date.slice(0, 7)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
