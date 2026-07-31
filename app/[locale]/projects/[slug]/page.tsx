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
  const isPrototype = project.category === 'prototype';
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
  const proofLabel = isZh ? project.proofLabelZh : project.proofLabelEn;
  const proofPoints = isZh ? project.proofPointsZh : project.proofPointsEn;
  const deliveryItems = isZh ? project.deliveryItemsZh : project.deliveryItemsEn;
  const inputContract = isZh ? project.inputContractZh : project.inputContractEn;
  const outputContract = isZh ? project.outputContractZh : project.outputContractEn;
  const validationBoundary = isZh ? project.validationBoundaryZh : project.validationBoundaryEn;

  return (
    <div className="inner-page project-case-page">
      <Link href={`/${locale}/projects`} className="project-back-link">
        ← {isZh ? '返回全部项目' : 'Back to all projects'}
      </Link>

      <header className="project-case-hero">
        <div>
          <p className="eyebrow">
            {isFrontier ? 'PUBLIC VALIDATION PLAN' : isPrototype ? 'TECHNICAL PROTOTYPE' : `${project.year} · DELIVERED CASE`}
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
          {proofLabel && (
            <div>
              <dt>{isZh ? '证据等级' : 'Evidence Level'}</dt>
              <dd>{proofLabel}</dd>
            </div>
          )}
        </dl>
        <div className="method-list project-case-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </header>

      <main className="project-case-sections">
        {project.metricCards && project.metricCards.length > 0 && (
          <section className="project-case-section project-proof-metrics">
            {project.metricCards.map((metric) => (
              <article key={`${metric.value}-${metric.labelEn}`}>
                <strong>{metric.value}</strong>
                <h2>{isZh ? metric.labelZh : metric.labelEn}</h2>
                {(isZh ? metric.noteZh : metric.noteEn) && <p>{isZh ? metric.noteZh : metric.noteEn}</p>}
              </article>
            ))}
          </section>
        )}

        {proofPoints && proofPoints.length > 0 && (
          <section className="project-case-section project-case-outcomes">
            <p className="project-case-label">{isZh ? '可核验证据' : 'Verifiable Evidence'}</p>
            <ul>
              {proofPoints.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        {deliveryItems && deliveryItems.length > 0 && (
          <section className="project-case-section">
            <p className="project-case-label">{isZh ? '已完成交付物' : 'Delivered Components'}</p>
            <ul>
              {deliveryItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        {(inputContract || outputContract) && (
          <section className="project-case-section project-system-contract">
            <p className="project-case-label">{isZh ? '系统输入 / 输出' : 'System Input / Output'}</p>
            {inputContract && <div><strong>INPUT</strong><p>{inputContract}</p></div>}
            {outputContract && <div><strong>OUTPUT</strong><p>{outputContract}</p></div>}
          </section>
        )}

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
            <p className="project-case-label">
              {isZh
                ? (isFrontier ? '预期成果' : isPrototype ? '当前产出' : '验证结果')
                : (isFrontier ? 'Expected Outcomes' : isPrototype ? 'Current Output' : 'Validated Results')}
            </p>
            <ul>
              {outcomes.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
        )}

        {validationBoundary && (
          <section className="project-case-section project-validation-boundary">
            <p className="project-case-label">{isZh ? '验证边界' : 'Validation Boundary'}</p>
            <p>{validationBoundary}</p>
          </section>
        )}

        {project.artifacts && project.artifacts.length > 0 && (
          <section className="project-case-section project-artifacts">
            <p className="project-case-label">{isZh ? '公开材料' : 'Public Artifacts'}</p>
            <div>
              {project.artifacts.map((artifact) => (
                <a key={artifact.href} href={artifact.href} target="_blank" rel="noopener noreferrer">
                  {isZh ? artifact.labelZh : artifact.labelEn} ↗
                </a>
              ))}
            </div>
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
