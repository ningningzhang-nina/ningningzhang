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
  const isZh = locale === 'zh';
  const projectGroups = [
    {
      index: '01',
      title: isZh ? '智能定价系统' : 'Intelligent Pricing Systems',
      description: isZh
        ? '连接需求、价格响应、机会成本与长期反馈，将定价从静态规则升级为可约束、可评估的决策系统。'
        : 'Connect demand, price response, opportunity cost, and long-term feedback to turn pricing from static rules into constrained, evaluable decision systems.',
      slugs: ['dynamic-pricing', 'seasonal-fare-planning', 'causal-price-response', 'competitive-pricing', 'real-time-pricing-service'],
    },
    {
      index: '02',
      title: isZh ? '决策优化平台' : 'Decision Optimization Platform',
      description: isZh
        ? '面向资源受限场景，将概率预测、随机优化、机会成本与容量分配连接为端到端决策闭环。'
        : 'Connect probabilistic forecasting, stochastic optimization, opportunity cost, and capacity allocation into an end-to-end decision loop.',
      slugs: ['revenue-management-optimization'],
    },
    {
      index: '03',
      title: isZh ? 'AI 决策系统' : 'AI Decision Systems',
      description: isZh
        ? '让大模型调用真实数据和算法工具，为复杂商业决策提供解释、溯源、诊断与 What-if 支持。'
        : 'Ground LLMs in real data and algorithm tools to explain, trace, diagnose, and support complex business decisions.',
      slugs: ['revenue-management-ai-copilot'],
    },
    {
      index: '04',
      title: isZh ? '仿真与评测' : 'Simulation & Evaluation',
      description: isZh
        ? '在真实需求不确定性和反事实缺失条件下，建立可复现的算法实验、基准与收益分解环境。'
        : 'Build reproducible experiments, benchmarks, and value decomposition under realistic demand uncertainty and missing counterfactuals.',
      slugs: ['airline-rm-simulation-evaluation'],
    },
  ];

  return (
    <div className="project-tile-page project-capability-page">
      <header className="project-capability-hero">
        <p className="design-kicker">SELECTED PROJECTS</p>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </header>

      {projectGroups.map((group) => {
        const groupProjects = group.slugs
          .map((slug) => projects.find((project) => project.slug === slug))
          .filter((project): project is NonNullable<typeof project> => Boolean(project));

        return (
          <section className="project-capability-group" key={group.index}>
            <div className="project-capability-heading">
              <span>{group.index}</span>
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
            </div>
            <div className="project-tile-grid">
              {groupProjects.map((project, groupIndex) => {
                const isFrontier = project.category === 'frontier';
                const isPrototype = project.category === 'prototype';
                const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
                const description = isZh ? project.descriptionZh || project.description : project.descriptionEn || project.description;
                const application = isZh ? project.applicationZh : project.applicationEn;
                const proof = isZh ? project.proofLabelZh : project.proofLabelEn;

                return (
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    key={project.slug}
                    className={`project-tile${isFrontier ? ' project-tile-frontier' : ''}${isPrototype ? ' project-tile-prototype' : ''}`}
                    aria-label={`${isZh ? '查看项目：' : 'View project: '}${title}`}
                  >
                    <article>
                      <div className="project-tile-topline">
                        <span>{`${group.index}.${String(groupIndex + 1).padStart(2, '0')}`}</span>
                        <span className="project-tile-category">
                          {isFrontier
                            ? (isZh ? '公开验证计划' : 'Validation Plan')
                            : isPrototype
                              ? (isZh ? '技术原型' : 'Prototype')
                              : (isZh ? '已有交付' : 'Delivered')}
                        </span>
                      </div>
                      <h2>{title}</h2>
                      <p className="project-tile-description">{description}</p>
                      {application && (
                        <p className="project-tile-application">
                          <strong>{isZh ? '应用场景' : 'Application'}</strong>
                          <span>{application}</span>
                        </p>
                      )}
                      {proof && <p className="project-tile-proof">{proof}</p>}
                      <span className="project-tile-arrow" aria-hidden="true">↗</span>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
