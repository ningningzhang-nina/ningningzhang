import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllProjects } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = getAllProjects();
  const coreProjects = projects.filter((project) => project.category === 'core');
  const frontierProjects = projects.filter((project) => project.category === 'frontier');
  const isZh = locale === 'zh';
  const orderedProjects = [...coreProjects, ...frontierProjects];

  return (
    <div className="project-tile-page">
      <h1 className="sr-only">{t('title')}</h1>
      <div className="project-tile-grid">
        {orderedProjects.map((project) => {
          const isFrontier = project.category === 'frontier';
          const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
          const groupIndex = isFrontier
            ? frontierProjects.findIndex((item) => item.slug === project.slug) + 1
            : coreProjects.findIndex((item) => item.slug === project.slug) + 1;

          return (
            <Link
              href={`/${locale}/projects/${project.slug}`}
              key={project.slug}
              className={`project-tile${isFrontier ? ' project-tile-frontier' : ''}`}
              aria-label={`${isZh ? '查看项目：' : 'View project: '}${title}`}
            >
              <article>
                <div className="project-tile-topline">
                  <span>{isFrontier ? `F${String(groupIndex).padStart(2, '0')}` : String(groupIndex).padStart(2, '0')}</span>
                  <span className="project-tile-category">
                    {isFrontier
                      ? (isZh ? '前沿探索' : 'Frontier')
                      : (isZh ? '核心实践' : 'Core Practice')}
                  </span>
                </div>
                <h2>{title}</h2>
                <div className="project-tile-footer">
                  <span>{isZh ? '查看项目' : 'View project'}</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
