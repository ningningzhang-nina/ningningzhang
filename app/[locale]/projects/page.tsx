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
  const isZh = locale === 'zh';

  return (
    <div className="inner-page">
      <header className="inner-page-hero">
        <p className="eyebrow">SELECTED WORK</p>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </header>

      <div className="project-detail-list">
        {projects.map((project, index) => {
          const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
          const description = isZh ? project.descriptionZh || project.description : project.descriptionEn || project.description;
          const role = isZh ? project.roleZh : project.roleEn;
          const stage = isZh ? project.stageZh : project.stageEn;
          const challenge = isZh ? project.challengeZh : project.challengeEn;
          const responsibilities = isZh ? project.responsibilitiesZh : project.responsibilitiesEn;
          const pipeline = isZh ? project.pipelineZh : project.pipelineEn;
          const highlights = isZh ? project.highlightsZh : project.highlightsEn;

          return (
            <article key={project.slug} className="project-detail-card">
              <div className="project-detail-index">0{index + 1}</div>
              <div>
                <p className="project-year">{project.year} · CASE STUDY</p>
                <h2>{title}</h2>
                <p className="project-description">{description}</p>
                <div className="project-meta">
                  {role && <p className="project-role"><strong>{isZh ? '项目角色' : 'Role'}</strong>{role}</p>}
                  {stage && <p className="project-stage"><strong>{isZh ? '项目阶段' : 'Stage'}</strong>{stage}</p>}
                </div>
                <div className="method-list">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="project-framework">
                  {challenge && (
                    <section className="project-framework-block project-challenge">
                      <p>{isZh ? '业务问题' : 'Business Challenge'}</p>
                      <h3>{challenge}</h3>
                    </section>
                  )}
                  {responsibilities && responsibilities.length > 0 && (
                    <section className="project-framework-block">
                      <p>{isZh ? '核心职责' : 'Core Ownership'}</p>
                      <ul>
                        {responsibilities.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                  )}
                  {pipeline && pipeline.length > 0 && (
                    <section className="project-framework-block">
                      <p>{isZh ? '算法链路' : 'Algorithm Pipeline'}</p>
                      <ol className="project-pipeline">
                        {pipeline.map((item, pipelineIndex) => (
                          <li key={item}>
                            <span>{String(pipelineIndex + 1).padStart(2, '0')}</span>
                            {item}
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}
                  {highlights && highlights.length > 0 && (
                    <section className="project-framework-block">
                      <p>{isZh ? '关键设计与可扩展亮点' : 'Key Design & Expandable Highlights'}</p>
                      <ul>
                        {highlights.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

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
