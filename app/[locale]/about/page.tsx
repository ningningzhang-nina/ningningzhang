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
