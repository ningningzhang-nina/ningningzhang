import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getAllPosts, getAllProjects } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: 'Zhang Ningning' };
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#f5f5f5] text-[11px] text-[#666] font-medium">
      {tag}
    </span>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const navT = await getTranslations({ locale, namespace: 'nav' });

  const posts = getAllPosts(locale).slice(0, 4);
  const projects = getAllProjects().filter((p) => p.featured).slice(0, 4);

  return (
    <div className="max-w-2xl">
      {/* Hero */}
      <section className="mb-14">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-5">
          {t('greeting')} Zhang Ningning
        </p>
        <h1 className="text-[38px] font-bold tracking-tight leading-tight text-[#0a0a0a] mb-4">
          {t('role')}
        </h1>
        <p className="text-[16px] text-[#666] leading-relaxed">{t('bio')}</p>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb]">
              {t('recentPosts')}
            </h2>
            <Link
              href={`/${locale}/blog`}
              className="text-[12px] text-[#999] hover:text-[#0a0a0a] transition-colors"
            >
              {t('viewAll')} →
            </Link>
          </div>
          <div className="divide-y divide-[#f5f5f5]">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group flex items-baseline justify-between py-3.5 hover:bg-[#fafafa] -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[15px] font-medium text-[#0a0a0a] group-hover:text-black truncate">
                    {post.title}
                  </span>
                  {post.tags[0] && <TagBadge tag={post.tags[0]} />}
                </div>
                <span className="text-[13px] text-[#bbb] ml-4 shrink-0">
                  {post.date.slice(0, 7)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb]">
              {t('featuredProjects')}
            </h2>
            <Link
              href={`/${locale}/projects`}
              className="text-[12px] text-[#999] hover:text-[#0a0a0a] transition-colors"
            >
              {t('viewAll')} →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="bg-white border border-[#ebebeb] rounded-xl p-5 hover:border-[#d8d8d8] transition-colors"
              >
                <h3 className="text-[14px] font-semibold text-[#0a0a0a] mb-1.5">{project.title}</h3>
                <p className="text-[13px] text-[#888] leading-relaxed mb-3">{project.description}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {project.tags.slice(0, 2).map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
