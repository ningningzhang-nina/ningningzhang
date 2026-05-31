import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const posts = getAllPosts(params.locale);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const post = getPostBySlug(locale, slug);

  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-1.5 text-[13px] text-[#999] hover:text-[#0a0a0a] mb-8 transition-colors"
      >
        ← {locale === 'zh' ? '返回博客' : 'Back to blog'}
      </Link>

      <div className="mb-10">
        <h1 className="text-[30px] font-bold tracking-tight text-[#0a0a0a] leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[13px] text-[#bbb]">{post.date}</span>
          {post.readingTime && (
            <span className="text-[13px] text-[#bbb]">· {post.readingTime} {t('minRead')}</span>
          )}
          {post.tags.map((tag) => (
            <span key={tag} className="text-[11px] bg-[#f5f5f5] text-[#666] px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <article className="prose max-w-none">
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
}
