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
      zh: ['从事民航收益管理与动态定价算法研发', '研究需求预测、Bid Price、网络优化与旅客选择模型'],
      en: ['Algorithm research for airline revenue management and dynamic pricing', 'Work spanning demand forecasting, bid price, network optimization, and passenger choice'],
    },
  },
  {
    period: { zh: '2025.01 – 2025.08', en: 'Jan 2025 – Aug 2025' },
    role: { zh: '博士后研究员', en: 'Postdoctoral Researcher' },
    organization: { zh: '香港大学', en: 'The University of Hong Kong' },
    details: {
      zh: ['金融时间序列、条件矩与统计建模研究'],
      en: ['Research in financial time series, conditional moments, and statistical modeling'],
    },
  },
  {
    period: { zh: '2017 – 2018', en: '2017 – 2018' },
    role: { zh: '算法与数据分析实习', en: 'Algorithm & Data Analytics Internships' },
    organization: { zh: '美团 · 滴滴出行', en: 'Meituan · DiDi' },
    details: {
      zh: ['外卖配送时间预测特征工程', '供需关系分析、调价评估与实验分群'],
      en: ['Feature engineering for delivery-time prediction', 'Supply-demand analysis, pricing evaluation, and experiment segmentation'],
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

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale === 'zh' ? 'zh' : 'en';
  const isZh = l === 'zh';

  return (
    <div className="inner-page about-page">
      <header className="inner-page-hero about-hero">
        <p className="eyebrow">EXPERIENCE</p>
        <h1>{isZh ? '从统计研究到优化决策' : 'From Statistical Research to Optimization Decisions'}</h1>
        <p>
          {isZh
            ? '我的优势不只是建立模型，而是理解不确定性、业务约束与决策目标之间的关系，并把算法组织成可验证的解决方案。'
            : 'My work connects uncertainty, business constraints, and decision objectives—organizing algorithms into solutions that can be tested and explained.'}
        </p>
      </header>

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
