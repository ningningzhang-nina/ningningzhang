import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title') };
}

const experience = [
  {
    period: { zh: '2025.09 – 至今', en: 'Sep 2025 – Present' },
    role: { zh: '博士后研究员 · 核心算法负责人', en: 'Postdoctoral Researcher · Algorithm Lead' },
    organization: { zh: '中国民航信息网络股份有限公司', en: 'TravelSky Technology Limited' },
    details: {
      zh: [
        '负责大型决策系统的算法研发，连接需求预测、优化、定价策略与仿真验证',
        '将贝叶斯预测、DLP / Bid Price、Bellman DP、旅客选择与 WTP 建模落地于航空收益管理和动态定价场景',
        '搭建可复现仿真评测平台；固定随机种子压力场景中，新算法组合取得 56.8% 仿真收益提升（非线上指标）',
      ],
      en: [
        'Lead algorithm development for large-scale decision systems, connecting demand forecasting, optimization, pricing strategy, and simulation-based validation',
        'Apply hierarchical Bayesian forecasting, DLP / bid price, Bellman DP, customer choice, and WTP modeling to airline revenue management and dynamic pricing',
        'Built a reproducible simulation benchmark; the new algorithm stack achieved a 56.8% simulated revenue lift in a fixed-seed stress scenario (not a production metric)',
      ],
    },
  },
  {
    period: { zh: '2018', en: '2018' },
    role: { zh: '算法实习生', en: 'Algorithm Intern' },
    organization: { zh: '美团', en: 'Meituan' },
    details: {
      zh: ['参与外卖配送时间预测相关的特征工程与模型分析'],
      en: ['Contributed to feature engineering and model analysis for delivery-time prediction'],
    },
  },
  {
    period: { zh: '2017', en: '2017' },
    role: { zh: '数据分析实习生', en: 'Data Analytics Intern' },
    organization: { zh: '滴滴出行', en: 'DiDi' },
    details: {
      zh: ['开展供需关系分析、调价评估与实验分群'],
      en: ['Conducted supply-demand analysis, pricing evaluation, and experiment segmentation'],
    },
  },
] as const;

const education = [
  {
    period: '2019 – 2024',
    degree: { zh: '统计学博士', en: 'Ph.D. in Statistics' },
    school: { zh: '香港大学', en: 'The University of Hong Kong' },
    note: { zh: '全额博士奖学金', en: 'Full Ph.D. Scholarship' },
  },
  {
    period: '2016 – 2019',
    degree: { zh: '统计学硕士', en: 'M.S. in Statistics' },
    school: { zh: '北京交通大学', en: 'Beijing Jiaotong University' },
    note: { zh: '平均分 93.51，专业排名第 1', en: 'GPA 93.51/100, ranked 1st in the program' },
  },
  {
    period: '2012 – 2016',
    degree: { zh: '信息与计算科学学士', en: 'B.S. in Information and Computing Science' },
    school: { zh: '北京交通大学', en: 'Beijing Jiaotong University' },
    note: { zh: '数学、统计与计算基础', en: 'Foundation in mathematics, statistics, and computing' },
  },
] as const;

const leadership = [
  {
    title: { zh: '模块协同', en: 'Program Coordination' },
    detail: { zh: '协调预测、网络优化、Bid Price、定价与测试模块，明确接口、依赖和验收标准。', en: 'Coordinate forecasting, network optimization, bid price, pricing, and testing through explicit interfaces, dependencies, and acceptance criteria.' },
  },
  {
    title: { zh: '算法验证', en: 'Algorithm Validation' },
    detail: { zh: '设计基线、Oracle、共同随机数、压力场景和收益分解相结合的评测流程。', en: 'Design evaluation workflows combining baselines, Oracle controls, common random numbers, stress scenarios, and revenue decomposition.' },
  },
  {
    title: { zh: '项目治理', en: 'Delivery Governance' },
    detail: { zh: '建立运行记录、进度追踪、问题备注与结果对标框架，使跨团队实验可追踪。', en: 'Establish run logs, progress tracking, issue notes, and benchmark frameworks for traceable cross-team experiments.' },
  },
] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale === 'zh' ? 'zh' : 'en';
  const isZh = l === 'zh';

  return (
    <div className="inner-page about-page direct-content-page">
      <section className="resume-section">
        <div className="resume-label">{isZh ? '工作经历' : 'EXPERIENCE'}</div>
        <div className="timeline-list">
          {experience.map((item) => (
            <article key={item.period.en}>
              <div className="timeline-period">{item.period[l]}</div>
              <div>
                <h2>{item.role[l]}</h2>
                <h3>{item.organization[l]}</h3>
                <ul>
                  {item.details[l].map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <div className="resume-label">{isZh ? '领导力与项目管理' : 'LEADERSHIP'}</div>
        <div className="timeline-list education-list">
          {leadership.map((item) => (
            <article key={item.title.en}>
              <div className="timeline-period">LEAD</div>
              <div>
                <h2>{item.title[l]}</h2>
                <p>{item.detail[l]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <div className="resume-label">{isZh ? '学习经历' : 'EDUCATION'}</div>
        <div className="timeline-list education-list">
          {education.map((item) => (
            <article key={item.period}>
              <div className="timeline-period">{item.period}</div>
              <div>
                <h2>{item.degree[l]}</h2>
                <h3>{item.school[l]}</h3>
                <p>{item.note[l]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
