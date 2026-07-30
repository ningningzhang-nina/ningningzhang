import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
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

  return (
    <div className="project-tile-page article-tile-page">
      <h1 className="sr-only">{t('title')}</h1>
      <div className="project-tile-grid article-tile-grid">
        {posts.map((post, index) => {
          const href = post.externalUrl || `/${locale}/blog/${post.slug}`;
          return (
            <Link
              key={post.slug}
              href={href}
              target={post.externalUrl ? '_blank' : undefined}
              rel={post.externalUrl ? 'noopener noreferrer' : undefined}
              className="project-tile article-tile"
            >
              <article>
                <div className="project-tile-topline article-tile-topline">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <time>{post.date}</time>
                </div>
                <h2>{post.title}</h2>
                <div className="article-tile-tags">
                  {post.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                  {post.externalUrl && <span>External</span>}
                </div>
                <span className="project-tile-arrow" aria-hidden="true">↗</span>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
