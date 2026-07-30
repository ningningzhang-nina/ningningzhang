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

  const renderProject = (project: (typeof projects)[number], index: number, frontier = false) => {
    const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
    const description = isZh ? project.descriptionZh || project.description : project.descriptionEn || project.description;
    const role = isZh ? project.roleZh : project.roleEn;
    const stage = isZh ? project.stageZh : project.stageEn;
    const outcome = isZh ? project.outcomesZh?.[0] : project.outcomesEn?.[0];

    return (
      <Link
        href={`/${locale}/projects/${project.slug}`}
        key={project.slug}
        className={`portfolio-project-row${frontier ? ' portfolio-project-row-frontier' : ''}`}
      >
        <article>
          <div className="portfolio-project-main">
            <span className="portfolio-project-number">
              {frontier ? `L${String(index + 1).padStart(2, '0')}` : String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="portfolio-project-title-row">
                <h3>{title}</h3>
                <span className="portfolio-project-stage">
                  {stage || (isZh ? '持续建设' : 'In development')}
                </span>
              </div>
              <p className="portfolio-project-description">{description}</p>
              {role && (
                <p className="portfolio-project-role">
                  <strong>{isZh ? '角色' : 'Role'}</strong>
                  {role}
                </p>
              )}
              <div className="portfolio-project-tags">
                {project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {outcome && (
                <p className="portfolio-project-outcome">
                  <strong>{isZh ? (frontier ? '目标产出' : '代表性成果') : (frontier ? 'Target' : 'Selected outcome')}</strong>
                  {outcome}
                </p>
              )}
            </div>
          </div>
          <span className="portfolio-project-arrow" aria-hidden="true">↗</span>
        </article>
      </Link>
    );
  };

  return (
    <div className="inner-page projects-index projects-list-page">
      <header className="inner-page-hero projects-hero">
        <p className="eyebrow">PROJECTS</p>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </header>

      <section className="portfolio-project-group" aria-labelledby="core-projects-heading">
        <div className="portfolio-track-heading">
          <div>
            <p className="eyebrow">ESTABLISHED WORK</p>
            <h2 id="core-projects-heading">{isZh ? '核心实践' : 'Applied Intelligence'}</h2>
          </div>
          <p>
            {isZh
              ? `${coreProjects.length} 个已完成、正在验证或持续建设的真实业务项目。`
              : `${coreProjects.length} real-world projects completed, under validation, or actively being developed.`}
          </p>
        </div>
        <div className="portfolio-project-list">
          {coreProjects.map((project, index) => renderProject(project, index))}
        </div>
      </section>

      <section className="portfolio-project-group portfolio-frontier-group" aria-labelledby="frontier-projects-heading">
        <div className="portfolio-track-heading">
          <div>
            <p className="eyebrow">EMERGING FRONTIERS</p>
            <h2 id="frontier-projects-heading">{isZh ? '前沿探索' : 'Frontier Explorations'}</h2>
          </div>
          <p>
            {isZh
              ? `${frontierProjects.length} 个基于公开数据规划的实验项目，与既有工作经历明确区分。`
              : `${frontierProjects.length} planned public-data experiments, clearly separated from established work.`}
          </p>
        </div>
        <div className="portfolio-project-list">
          {frontierProjects.map((project, index) => renderProject(project, index, true))}
        </div>
      </section>

      <aside className="confidentiality-note">
        <span>PUBLIC-SAFE</span>
        <p>
          {isZh
            ? '项目仅展示公开范围内的问题背景与关键技术，不包含业务数据、内部参数、系统细节或未公开结果。'
            : 'These summaries describe only public-safe problems and methods. They exclude business data, internal parameters, system details, and unpublished results.'}
        </p>
      </aside>
    </div>
  );
}
