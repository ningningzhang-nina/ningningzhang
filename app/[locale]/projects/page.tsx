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
  const coreProjects = projects.filter((project) => project.category !== 'frontier');
  const frontierProjects = projects.filter((project) => project.category === 'frontier');
  const isZh = locale === 'zh';

  const renderProjectCard = (project: (typeof projects)[number], index: number) => {
    const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
    const description = isZh ? project.descriptionZh || project.description : project.descriptionEn || project.description;
    const role = isZh ? project.roleZh : project.roleEn;
    const stage = isZh ? project.stageZh : project.stageEn;
    const outcome = isZh ? project.outcomesZh?.[0] : project.outcomesEn?.[0];
    const isFrontier = project.category === 'frontier';

    return (
      <Link
        key={project.slug}
        href={`/${locale}/projects/${project.slug}`}
        className={`project-card${isFrontier ? ' project-card-frontier' : ''}`}
        aria-label={`${isZh ? '查看项目：' : 'View project: '}${title}`}
      >
        <article>
          <div className="project-card-topline">
            <span>{isFrontier ? `L${String(index + 1).padStart(2, '0')}` : String(index + 1).padStart(2, '0')}</span>
            <span className="project-card-status">
              {stage || (isZh ? '查看项目' : 'View project')}
            </span>
          </div>

          <div className="project-card-copy">
            <p className="project-card-year">
              {isFrontier
                ? (isZh ? '公开数据探索项目' : 'Public-data exploration')
                : `${project.year} · CASE STUDY`}
            </p>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>

          {role && (
            <p className="project-card-role">
              <strong>{isZh ? '我的角色' : 'My role'}</strong>
              {role}
            </p>
          )}

          <div className="method-list project-card-tags">
            {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
          </div>

          {outcome && (
            <div className="project-card-proof">
              <span>{isZh ? (isFrontier ? '目标产出' : '代表性成果') : (isFrontier ? 'Target' : 'Selected outcome')}</span>
              <p>{outcome}</p>
            </div>
          )}

          <span className="project-card-link">
            {isZh ? '查看项目详情' : 'View case study'} <span aria-hidden="true">↗</span>
          </span>
        </article>
      </Link>
    );
  };

  return (
    <div className="inner-page projects-index">
      <header className="inner-page-hero projects-hero">
        <p className="eyebrow">PRICING · FORECASTING · OPTIMIZATION</p>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </header>

      <section className="project-track" aria-labelledby="core-projects-heading">
        <div className="portfolio-track-heading">
          <div>
            <p className="eyebrow">ESTABLISHED WORK</p>
            <h2 id="core-projects-heading">{isZh ? '核心实践' : 'Applied Intelligence'}</h2>
          </div>
          <p>
            {isZh
              ? '五个相互衔接的项目，覆盖需求预测、网络收益优化、动态定价、价格架构、决策解释与仿真评测。'
              : 'Five connected projects spanning demand forecasting, network revenue optimization, dynamic pricing, price architecture, decision intelligence, and simulation-based evaluation.'}
          </p>
        </div>
        <div className="project-card-grid">
          {coreProjects.map(renderProjectCard)}
        </div>
      </section>

      <section className="project-track frontier-track" aria-labelledby="frontier-projects-heading">
        <div className="portfolio-track-heading">
          <div>
            <p className="eyebrow">EMERGING FRONTIERS</p>
            <h2 id="frontier-projects-heading">{isZh ? '前沿探索' : 'Frontier Explorations'}</h2>
          </div>
          <p>
            {isZh
              ? '面向下一阶段能力拓展的公开数据实验路线。规划项目与既有工作明确区分，并将逐项补充可复现成果。'
              : 'A public-data experimentation roadmap for the next stage of capability building, clearly separated from established work.'}
          </p>
        </div>
        <div className="project-card-grid frontier-card-grid">
          {frontierProjects.map(renderProjectCard)}
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
