import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLifePostBySlug, getAllLifePosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const posts = getAllLifePosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getLifePostBySlug(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function LifePostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getLifePostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      {/* 返回按钮 */}
      <Link
        href={`/${locale}/life`}
        className="inline-flex items-center gap-1.5 text-[13px] text-[#999] hover:text-[#0a0a0a] mb-8 transition-colors"
      >
        ← {locale === 'zh' ? '返回生活' : 'Back to life'}
      </Link>

      {/* 标题 + 日期 */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold tracking-tight text-[#0a0a0a] leading-tight mb-3">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[13px] text-[#bbb]">{post.date}</span>
          {/* 标签 */}
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/life/tag/${encodeURIComponent(tag)}`}
              className="px-2.5 py-1 bg-[#f5f5f5] rounded-full text-[12px] text-[#555] hover:bg-[#ebebeb] hover:text-[#0a0a0a] transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* 图片网格 */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-2 mb-8 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
          {post.images.map((img, i) => (
            <div
              key={i}
              className={`bg-[#f5f5f5] rounded-xl overflow-hidden ${
                post.images!.length === 1 ? 'aspect-video' :
                post.images!.length >= 3 && i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* 正文内容 */}
      <div className="prose max-w-none">
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) return <h2 key={i} className="text-[18px] font-semibold text-[#0a0a0a] mt-6 mb-2">{line.slice(3)}</h2>;
          if (line.startsWith('# ')) return <h1 key={i} className="text-[22px] font-bold text-[#0a0a0a] mt-6 mb-2">{line.slice(2)}</h1>;
          if (line.startsWith('- ')) return <p key={i} className="text-[15px] text-[#444] leading-relaxed pl-4">· {line.slice(2)}</p>;
          if (line.trim() === '') return <div key={i} className="h-2" />;
          return <p key={i} className="text-[15px] text-[#444] leading-relaxed">{line}</p>;
        })}
      </div>

      {/* 底部标签导航 */}
      {post.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-[#f0f0f0]">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-3">
            {locale === 'zh' ? '相关标签' : 'Related tags'}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
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
    </div>
  );
}
