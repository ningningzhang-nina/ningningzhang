import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllProjects } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });
  return { title: t('title'), description: t('subtitle') };
}

const labProjects = [
  {
    index: 'L01',
    title: { zh: '因果价格响应与异质性弹性', en: 'Causal Price Response & Heterogeneous Elasticity' },
    objective: {
      zh: '从“相关性弹性”推进到可用于价格决策的因果效应估计，区分价格、促销与用户差异带来的需求变化。',
      en: 'Move from correlational elasticity to causal effects for pricing decisions, separating price, promotion, and customer heterogeneity.',
    },
    methods: ['DML', 'Doubly Robust', 'Uplift Modeling', 'EconML'],
    data: {
      zh: '公开零售定价数据 + 可验证真值的半合成实验',
      en: 'Public retail-pricing data plus semi-synthetic experiments with known ground truth',
    },
    deliverable: {
      zh: '异质性价格弹性模型、反事实评估、误差与敏感性分析',
      en: 'Heterogeneous elasticity model, counterfactual evaluation, and sensitivity analysis',
    },
  },
  {
    index: 'L02',
    title: { zh: '流式特征与实时定价服务', en: 'Streaming Features & Real-time Pricing Service' },
    objective: {
      zh: '用公开出行数据回放模拟实时请求，补齐分钟级特征更新、在线推断、缓存与模型热更新的工程链路。',
      en: 'Replay public mobility data as live requests to build minute-level features, online inference, caching, and model hot updates.',
    },
    methods: ['Kafka', 'Flink', 'Redis', 'FastAPI'],
    data: {
      zh: 'NYC Taxi 等公开时空出行数据',
      en: 'Public spatiotemporal mobility data such as NYC Taxi',
    },
    deliverable: {
      zh: '可复现流式 Demo、延迟/吞吐压测、降级与监控方案',
      en: 'Reproducible streaming demo, latency/throughput tests, fallback strategy, and monitoring',
    },
  },
  {
    index: 'L03',
    title: { zh: '竞争市场定价与策略学习', en: 'Competitive Pricing & Policy Learning' },
    objective: {
      zh: '研究竞争者、供需两侧与长期收益之间的动态反馈，比较博弈论、强化学习与规则策略。',
      en: 'Study dynamic feedback among competitors, supply, demand, and long-term value through game-theoretic, RL, and rule-based policies.',
    },
    methods: ['Game Theory', 'MARL', 'Offline RL', 'Policy Evaluation'],
    data: {
      zh: '公开市场数据 + 多主体半合成仿真环境',
      en: 'Public market data plus a semi-synthetic multi-agent environment',
    },
    deliverable: {
      zh: '竞争定价模拟器、策略基线、稳定性与福利权衡评测',
      en: 'Competitive-pricing simulator, policy baselines, and stability/welfare evaluation',
    },
  },
] as const;

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = getAllProjects();
  const isZh = locale === 'zh';

  return (
    <div className="inner-page">
      <header className="inner-page-hero">
        <p className="eyebrow">PRICING · FORECASTING · OPTIMIZATION</p>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </header>

      <div className="portfolio-track-heading">
        <div>
          <p className="eyebrow">ESTABLISHED WORK</p>
          <h2>{isZh ? '核心实践' : 'Applied Intelligence'}</h2>
        </div>
        <p>
          {isZh
            ? '基于航空收益管理与动态定价实际工作形成，均为已完成、正在验证或持续建设的项目。'
            : 'Built through hands-on airline revenue-management and dynamic-pricing work; every project is completed, under validation, or actively being developed.'}
        </p>
      </div>

      <section className="decision-system-overview" aria-label={isZh ? '端到端定价与决策智能系统全景' : 'End-to-end pricing and decision intelligence system'}>
        <div className="system-overview-copy">
          <p className="eyebrow">SYSTEM OVERVIEW</p>
          <h2>{isZh ? '五个项目，共同构成一套端到端决策系统' : 'Five projects. One end-to-end decision system.'}</h2>
          <p>
            {isZh
              ? '覆盖从市场与需求信号识别、预测与旅客选择建模，到收益优化、实时价格决策、长期价格架构、决策解释及仿真评测的完整闭环。'
              : 'A complete loop from market and demand signals through forecasting and customer choice, revenue optimization, real-time pricing, long-horizon price architecture, decision explanation, and simulation-based evaluation.'}
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

      <section className="lab-section" aria-label={isZh ? '前沿探索项目' : 'Frontier exploration projects'}>
        <div className="portfolio-track-heading lab-heading">
          <div>
            <p className="eyebrow">EMERGING FRONTIERS</p>
            <h2>{isZh ? '前沿实验室' : 'Frontier Explorations'}</h2>
          </div>
          <p>
            {isZh
              ? '面向下一阶段职业迁移的公开数据实验路线。项目将逐项建设，未完成内容不会作为已有工作经历呈现。'
              : 'A public-data experimentation roadmap for the next stage of my career. Planned work is clearly separated from completed experience.'}
          </p>
        </div>
        <div className="lab-project-grid">
          {labProjects.map((project) => (
            <article key={project.index} className="lab-project-card">
              <div className="lab-card-topline">
                <span className="lab-index">{project.index}</span>
                <span className="status-pill">{isZh ? '规划中 · 公开数据项目' : 'PLANNED · PUBLIC DATA'}</span>
              </div>
              <h3>{project.title[isZh ? 'zh' : 'en']}</h3>
              <p className="lab-objective">{project.objective[isZh ? 'zh' : 'en']}</p>
              <div className="method-list">
                {project.methods.map((method) => <span key={method}>{method}</span>)}
              </div>
              <dl className="lab-details">
                <div>
                  <dt>{isZh ? '数据方案' : 'Data Plan'}</dt>
                  <dd>{project.data[isZh ? 'zh' : 'en']}</dd>
                </div>
                <div>
                  <dt>{isZh ? '目标产出' : 'Target Deliverable'}</dt>
                  <dd>{project.deliverable[isZh ? 'zh' : 'en']}</dd>
                </div>
              </dl>
            </article>
          ))}
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
