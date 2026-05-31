import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getPostsByTag, getAllBlogTags } from '@/lib/content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const tags = getAllBlogTags(locale);
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)}` };
}

export default async function BlogTagPage({ params }: { params: Promise<{ locale: string; tag: string }> }) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(locale, decodedTag);

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-1.5 text-[13px] text-[#999] hover:text-[#0a0a0a] mb-8 transition-colors"
      >
        ← {locale === 'zh' ? '所有文章' : 'All posts'}
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[13px] text-[#bbb]">{locale === 'zh' ? '标签' : 'Tag'}</span>
          <span className="px-3 py-1 bg-[#0a0a0a] text-white rounded-full text-[13px] font-medium">
            {decodedTag}
          </span>
        </div>
        <p className="text-[15px] text-[#888]">
          {posts.length} {locale === 'zh' ? '篇文章' : 'posts'}
        </p>
      </div>

      <div className="divide-y divide-[#f5f5f5]">
        {posts.map((post) => {
          const isExternal = !!post.externalUrl;
          const inner = (
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
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tg) => (
                    <span
                      key={tg}
                      className={`px-2 py-0.5 rounded-full text-[11px] ${
                        tg === decodedTag ? 'bg-[#0a0a0a] text-white' : 'bg-[#f5f5f5] text-[#666]'
                      }`}
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[13px] text-[#bbb]">{post.date.slice(0, 7)}</div>
                {isExternal && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#f0f5ff] text-[#3d7cf5] rounded font-medium mt-1 inline-block">
                    知乎
                  </span>
                )}
              </div>
            </div>
          );
          return isExternal ? (
            <a
              key={post.slug}
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-5 -mx-2 px-2 rounded-lg hover:bg-[#fafafa] transition-colors"
            >
              {inner}
            </a>
          ) : (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group block py-5 -mx-2 px-2 rounded-lg hover:bg-[#fafafa] transition-colors"
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
