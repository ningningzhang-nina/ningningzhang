import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const isZh = locale === 'zh';
  return {
    title: isZh ? project.titleZh || project.title : project.titleEn || project.title,
    description: isZh
      ? project.descriptionZh || project.description
      : project.descriptionEn || project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const isZh = locale === 'zh';
  const isFrontier = project.category === 'frontier';
  const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
  const description = isZh
    ? project.descriptionZh || project.description
    : project.descriptionEn || project.description;
  const role = isZh ? project.roleZh : project.roleEn;
  const stage = isZh ? project.stageZh : project.stageEn;
  const challenge = isZh ? project.challengeZh : project.challengeEn;
  const responsibilities = isZh ? project.responsibilitiesZh : project.responsibilitiesEn;
  const pipeline = isZh ? project.pipelineZh : project.pipelineEn;
  const highlights = isZh ? project.highlightsZh : project.highlightsEn;
  const outcomes = isZh ? project.outcomesZh : project.outcomesEn;
  const dataPlan = isZh ? project.dataPlanZh : project.dataPlanEn;
  const deliverable = isZh ? project.deliverableZh : project.deliverableEn;

  return (
    <div className="inner-page project-case-page">
      <Link href={`/${locale}/projects`} className="project-back-link">
        ← {isZh ? '返回全部项目' : 'Back to all projects'}
      </Link>

      <header className="project-case-hero">
        <div>
          <p className="eyebrow">
            {isFrontier ? 'EMERGING FRONTIER' : `${project.year} · CASE STUDY`}
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <dl className="project-case-meta">
          {role && (
            <div>
              <dt>{isZh ? '项目角色' : 'Role'}</dt>
              <dd>{role}</dd>
            </div>
          )}
          {stage && (
            <div>
              <dt>{isZh ? '项目阶段' : 'Stage'}</dt>
              <dd>{stage}</dd>
            </div>
          )}
        </dl>
        <div className="method-list project-case-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </header>

      <main className="project-case-sections">
        {challenge && (
          <section className="project-case-section project-case-challenge">
            <p className="project-case-label">{isZh ? (isFrontier ? '探索目标' : '业务问题') : (isFrontier ? 'Exploration Goal' : 'Business Challenge')}</p>
            <h2>{challenge}</h2>
          </section>
        )}

        {responsibilities && responsibilities.length > 0 && (
          <section className="project-case-section">
            <p className="project-case-label">{isZh ? '核心职责' : 'Core Ownership'}</p>
            <ul>
              {responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        {pipeline && pipeline.length > 0 && (
          <section className="project-case-section">
            <p className="project-case-label">{isZh ? '算法链路' : 'Algorithm Pipeline'}</p>
            <ol className="project-case-pipeline">
              {pipeline.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {highlights && highlights.length > 0 && (
          <section className="project-case-section">
            <p className="project-case-label">{isZh ? '关键设计' : 'Key Design'}</p>
            <ul>
              {highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        {(dataPlan || deliverable) && (
          <section className="project-case-section project-plan-section">
            {dataPlan && (
              <div>
                <p className="project-case-label">{isZh ? '数据方案' : 'Data Plan'}</p>
                <p>{dataPlan}</p>
              </div>
            )}
            {deliverable && (
              <div>
                <p className="project-case-label">{isZh ? '目标产出' : 'Target Deliverable'}</p>
                <p>{deliverable}</p>
              </div>
            )}
          </section>
        )}

        {outcomes && outcomes.length > 0 && (
          <section className="project-case-section project-case-outcomes">
            <p className="project-case-label">{isZh ? (isFrontier ? '预期成果' : '方向性成果') : (isFrontier ? 'Expected Outcomes' : 'Directional Outcomes')}</p>
            <ul>
              {outcomes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}
      </main>

      <aside className="confidentiality-note">
        <span>PUBLIC-SAFE</span>
        <p>
          {isZh
            ? '本页仅展示公开范围内的问题背景与关键技术，不包含业务数据、内部参数、系统细节或未公开结果。'
            : 'This page contains only public-safe context and methods, excluding business data, internal parameters, system details, and unpublished results.'}
        </p>
      </aside>
    </div>
  );
}
