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
    role: { zh: '博士后研究员', en: 'Postdoctoral Researcher' },
    organization: { zh: '中国民航信息网络股份有限公司', en: 'TravelSky Technology Limited' },
    details: {
      zh: [
        '负责航空收益管理与动态定价中“预测—优化—控制”闭环的核心算法设计与 POC 验证',
        '采用贝叶斯层级预测、DLP / Bid Price、Bellman DP、旅客选择与 WTP 建模连接需求、容量和价格决策',
        '搭建可复现仿真评测平台；固定随机种子压力场景中，新算法组合取得 56.8% 仿真收益提升（非线上指标）',
      ],
      en: [
        'Lead core algorithm design and POC validation for the forecast-optimize-control loop in airline revenue management and dynamic pricing',
        'Connect demand, capacity, and pricing through hierarchical Bayesian forecasting, DLP / bid price, Bellman DP, customer choice, and WTP modeling',
        'Built a reproducible simulation benchmark; the new algorithm stack achieved a 56.8% simulated revenue lift in a fixed-seed stress scenario (not a production metric)',
      ],
    },
  },
  {
    period: { zh: '2025.01 – 2025.08', en: 'Jan 2025 – Aug 2025' },
    role: { zh: '博士后研究员', en: 'Postdoctoral Researcher' },
    organization: { zh: '香港大学', en: 'The University of Hong Kong' },
    details: {
      zh: ['开展金融时间序列、条件矩与统计建模研究，延续概率建模与不确定性分析方向'],
      en: ['Conducted research in financial time series, conditional moments, statistical modeling, and uncertainty analysis'],
    },
  },
  {
    period: { zh: '2017 – 2018', en: '2017 – 2018' },
    role: { zh: '算法与数据分析实习', en: 'Algorithm & Data Analytics Internships' },
    organization: { zh: '美团 · 滴滴出行', en: 'Meituan · DiDi' },
    details: {
      zh: ['参与外卖配送时间预测特征工程', '开展供需关系分析、调价评估与实验分群'],
      en: ['Contributed to feature engineering for delivery-time prediction', 'Conducted supply-demand analysis, pricing evaluation, and experiment segmentation'],
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

const skillGroups = [
  {
    title: { zh: '建模', en: 'MODELING' },
    items: ['Python', 'Bayesian Time Series', 'LightGBM', 'Choice Modeling', 'WTP'],
  },
  {
    title: { zh: '优化', en: 'OPTIMIZATION' },
    items: ['Linear Programming', 'DLP', 'Bid Price', 'Bellman DP'],
  },
  {
    title: { zh: '系统与评测', en: 'SYSTEMS & EVALUATION' },
    items: ['Streamlit', 'Backtesting', 'Common Random Numbers', 'LLM Tool Calling'],
  },
] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale === 'zh' ? 'zh' : 'en';
  const isZh = l === 'zh';

  return (
    <div className="inner-page about-page">
      <header className="inner-page-hero about-hero">
        <p className="eyebrow">PRICING · DECISION INTELLIGENCE</p>
        <h1>{isZh ? '从统计预测到定价决策系统' : 'From Statistical Forecasts to Pricing Decisions'}</h1>
        <p>
          {isZh
            ? '香港大学统计学博士，现从事航空收益管理与动态定价算法研发。我的核心能力是把不确定性、用户价格响应、业务约束与收益目标组织成可验证的决策链路。'
            : 'Ph.D. in Statistics from The University of Hong Kong, working on airline revenue management and dynamic pricing. I turn uncertainty, customer price response, business constraints, and revenue objectives into testable decision pipelines.'}
        </p>
      </header>

      <section className="about-evidence" aria-label={isZh ? '核心证据' : 'Selected evidence'}>
        <article>
          <span>01</span>
          <strong>{isZh ? '统计学博士' : 'Ph.D. in Statistics'}</strong>
          <p>{isZh ? '时间序列、概率建模与不确定性分析' : 'Time series, probabilistic modeling, and uncertainty analysis'}</p>
        </article>
        <article>
          <span>02</span>
          <strong>{isZh ? '端到端算法闭环' : 'End-to-end Algorithm Loop'}</strong>
          <p>{isZh ? 'Forecast → Optimize → Decide → Evaluate' : 'Forecast → Optimize → Decide → Evaluate'}</p>
        </article>
        <article>
          <span>03</span>
          <strong>+56.8%*</strong>
          <p>{isZh ? '固定随机种子压力场景仿真收益提升' : 'Simulated lift in a fixed-seed stress scenario'}</p>
        </article>
      </section>
      <p className="evidence-footnote">
        {isZh ? '* 仿真实验结果，不代表线上业务收益。' : '* Simulation result; not an online production metric.'}
      </p>

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
        <div className="resume-label">{isZh ? '教育背景' : 'EDUCATION'}</div>
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

      <section className="resume-section">
        <div className="resume-label">{isZh ? '技术栈' : 'TECH STACK'}</div>
        <div className="skill-matrix">
          {skillGroups.map((group) => (
            <article key={group.title.en}>
              <h2>{group.title[l]}</h2>
              <div className="method-list">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-contact">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h2>{isZh ? '交流算法、研究与职业机会' : 'Algorithms, research, and opportunities'}</h2>
        </div>
        <a href="mailto:zhangnn0725@163.com">zhangnn0725@163.com ↗</a>
      </section>
    </div>
  );
}
