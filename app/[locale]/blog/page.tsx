import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllPosts, getAllBlogTags } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title') };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale);
  const allTags = getAllBlogTags(locale);
  const isZh = locale === 'zh';

  return (
    <div className="inner-page">
      <header className="inner-page-hero">
        <p className="eyebrow">TECHNICAL NOTES</p>
        <h1>{t('title')}</h1>
        <p>{isZh ? '记录我对算法机制、业务约束与模型落地问题的理解。' : 'Notes on algorithm mechanics, business constraints, and applied modeling.'}</p>
      </header>

      {allTags.length > 0 && (
        <nav className="tag-filter" aria-label={isZh ? '文章标签' : 'Article tags'}>
          {allTags.map((tag) => <Link key={tag} href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}>{tag}</Link>)}
        </nav>
      )}

      <div className="article-catalog">
        {posts.map((post, index) => {
          const href = post.externalUrl || `/${locale}/blog/${post.slug}`;
          return (
            <Link key={post.slug} href={href} target={post.externalUrl ? '_blank' : undefined} rel={post.externalUrl ? 'noopener noreferrer' : undefined}>
              <span className="article-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="article-date">{post.date}{post.externalUrl ? ' · External' : ''}</p>
                <h2>{post.title}</h2>
                {post.summary && <p className="article-summary">{post.summary}</p>}
                <div className="method-list">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <span className="article-arrow">↗</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
