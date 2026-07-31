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
  const prototypeProjects = projects.filter((project) => project.category === 'prototype');
  const frontierProjects = projects.filter((project) => project.category === 'frontier');
  const isZh = locale === 'zh';
  const orderedProjects = [...coreProjects, ...prototypeProjects, ...frontierProjects];

  return (
    <div className="project-tile-page">
      <h1 className="sr-only">{t('title')}</h1>
      <div className="project-tile-grid">
        {orderedProjects.map((project) => {
          const isFrontier = project.category === 'frontier';
          const isPrototype = project.category === 'prototype';
          const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
          const proof = isZh ? project.proofLabelZh : project.proofLabelEn;
          const groupIndex = isFrontier
            ? frontierProjects.findIndex((item) => item.slug === project.slug) + 1
            : isPrototype
              ? prototypeProjects.findIndex((item) => item.slug === project.slug) + 1
              : coreProjects.findIndex((item) => item.slug === project.slug) + 1;

          return (
            <Link
              href={`/${locale}/projects/${project.slug}`}
              key={project.slug}
              className={`project-tile${isFrontier ? ' project-tile-frontier' : ''}${isPrototype ? ' project-tile-prototype' : ''}`}
              aria-label={`${isZh ? '查看项目：' : 'View project: '}${title}`}
            >
              <article>
                <div className="project-tile-topline">
                  <span>{isFrontier ? `F${String(groupIndex).padStart(2, '0')}` : isPrototype ? `P${String(groupIndex).padStart(2, '0')}` : String(groupIndex).padStart(2, '0')}</span>
                  <span className="project-tile-category">
                    {isFrontier
                      ? (isZh ? '公开验证计划' : 'Validation Plan')
                      : isPrototype
                        ? (isZh ? '技术原型' : 'Prototype')
                        : (isZh ? '已有交付' : 'Delivered')}
                  </span>
                </div>
                <h2>{title}</h2>
                {proof && <p className="project-tile-proof">{proof}</p>}
                <span className="project-tile-arrow" aria-hidden="true">↗</span>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
