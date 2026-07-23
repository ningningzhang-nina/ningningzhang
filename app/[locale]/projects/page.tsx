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

      <section className="decision-system-overview" aria-label={isZh ? '端到端定价与决策智能系统全景' : 'End-to-end pricing and decision intelligence system'}>
        <div className="system-overview-copy">
          <p className="eyebrow">SYSTEM OVERVIEW</p>
          <h2>{isZh ? '四个项目，共同构成一套端到端决策系统' : 'Four projects. One end-to-end decision system.'}</h2>
          <p>
            {isZh
              ? '覆盖从市场与需求信号识别、预测与旅客选择建模，到收益优化、实时价格决策、长期价格架构及决策解释的完整闭环。'
              : 'A complete loop from market and demand signals through forecasting and customer choice, revenue optimization, real-time pricing, long-horizon price architecture, and decision explanation.'}
          </p>
        </div>
        <div className="system-flow">
          {[
            {
              index: '01',
              zh: '需求与市场信号',
              en: 'Demand & Market Signals',
              zhDetail: '交易 · Shopping · 订座 · 库存',
              enDetail: 'Transactions · Shopping · Booking · Inventory',
            },
            {
              index: '02',
              zh: '预测与选择建模',
              en: 'Forecasting & Choice',
              zhDetail: 'Demand · WTP · Elasticity · Probability',
              enDetail: 'Demand · WTP · Elasticity · Probability',
            },
            {
              index: '03',
              zh: '收益与价格决策',
              en: 'Revenue & Pricing',
              zhDetail: 'DLP · Bid Price · Pricing Engine',
              enDetail: 'DLP · Bid Price · Pricing Engine',
            },
            {
              index: '04',
              zh: '解释、反馈与迭代',
              en: 'Explain, Learn & Iterate',
              zhDetail: 'Traceability · What-if · Feedback',
              enDetail: 'Traceability · What-if · Feedback',
            },
          ].map((step) => (
            <article key={step.index}>
              <span>{step.index}</span>
              <h3>{isZh ? step.zh : step.en}</h3>
              <p>{isZh ? step.zhDetail : step.enDetail}</p>
            </article>
          ))}
        </div>
      </section>

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
          const outcomes = isZh ? project.outcomesZh : project.outcomesEn;

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
                  {outcomes && outcomes.length > 0 && (
                    <section className="project-framework-block project-outcomes">
                      <p>{isZh ? '方向性成果' : 'Directional Outcomes'}</p>
                      <ul>
                        {outcomes.map((item) => <li key={item}>{item}</li>)}
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
