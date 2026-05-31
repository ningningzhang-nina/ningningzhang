import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title') };
}

const education = [
  {
    degree: { zh: '统计学 博士', en: 'Ph.D. in Statistics' },
    school: { zh: '香港大学', en: 'The University of Hong Kong' },
    period: '2019.09 – 2024.12',
    details: {
      zh: ['主修：高级统计推断、高级概率论、计算统计', '全额博士奖学金 · 香港大学高等教育教学证书'],
      en: ['Courses: Advanced Statistical Inference, Advanced Probability Theory, Computational Statistics', 'Full PhD Scholarship · HKU Certificate in Higher Education Teaching'],
    },
  },
  {
    degree: { zh: '统计学 硕士', en: 'M.S. in Statistics' },
    school: { zh: '北京交通大学', en: 'Beijing Jiaotong University' },
    period: '2016.09 – 2019.06',
    details: {
      zh: ['主修：统计模型与应用、时间序列分析、统计优化、多元统计分析', '平均分 93.51，全系 45 人排名第一', '国家奖学金 · 一等奖学金×2 · 三好研究生 · 研究生创新项目'],
      en: ['Courses: Statistical Models, Time Series Analysis, Statistical Optimization, Multivariate Analysis', 'GPA: 93.51/100 · Ranked 1st out of 45 students', 'National Scholarship · First-class Scholarship ×2 · Excellent Graduate Student'],
    },
  },
  {
    degree: { zh: '信息与计算科学 学士', en: 'B.S. in Information and Computing Science' },
    school: { zh: '北京交通大学', en: 'Beijing Jiaotong University' },
    period: '2012.09 – 2016.06',
    details: {
      zh: ['主修：数学分析、高等代数、运筹学、数值分析、C语言、Matlab、R语言', '平均分 88.1，全系 110 人排名第九，获保研资格'],
      en: ['Courses: Mathematical Analysis, Advanced Algebra, Operations Research, Numerical Analysis, C, Matlab, R', 'GPA: 88.1/100 · Ranked 9th out of 110 · Qualified for direct Master\'s enrollment'],
    },
  },
];

const workExperience = [
  {
    role: { zh: '博士后研究员', en: 'Postdoctoral Researcher' },
    company: { zh: '中国民航信息网络股份有限公司（航信）', en: 'TravelSky Technology Limited' },
    period: { zh: '2025.09 – 至今', en: '2025.09 – Present' },
    details: {
      zh: ['研究方向：民航收益管理与动态定价算法研究'],
      en: ['Research focus: airline revenue management and dynamic pricing algorithm research'],
    },
  },
  {
    role: { zh: '博士后研究员', en: 'Postdoctoral Researcher' },
    company: { zh: '香港大学', en: 'The University of Hong Kong' },
    period: '2025.01 – 2025.08',
    details: {
      zh: ['继续金融时间序列分析与统计建模相关研究'],
      en: ['Continued research in financial time series analysis and statistical modeling'],
    },
  },
  {
    role: { zh: '研究助理', en: 'Research Assistant' },
    company: { zh: '香港大学', en: 'The University of Hong Kong' },
    period: '2023.09 – 2024.12',
    details: {
      zh: ['参与多项统计学科研项目，协助论文写作与数据分析'],
      en: ['Participated in multiple statistics research projects, assisting with paper writing and data analysis'],
    },
  },
];

const internship = [
  {
    role: { zh: '算法工程师（实习）', en: 'Algorithm Engineer Intern' },
    company: { zh: '美团', en: 'Meituan' },
    period: '2018.03 – 2018.05',
    details: {
      zh: ['参与外卖配送时间预测算法优化，通过特征工程识别关键特征', '将新特征集成到现有模型中，显著提升预测准确性与配送效率'],
      en: ['Optimized food delivery time prediction via feature engineering', 'Integrated new features into existing models, significantly improving accuracy'],
    },
  },
  {
    role: { zh: '数据分析实习生', en: 'Data Analysis Intern' },
    company: { zh: '滴滴出行', en: 'DiDi Chuxing' },
    period: '2017.10 – 2017.12',
    details: {
      zh: ['使用线性回归分析顺风车供需关系，评估调价策略影响', '应用 K-means 聚类为 A/B 实验设计提供数据驱动指导'],
      en: ['Built linear regression models to analyze supply-demand dynamics and evaluate pricing strategies', 'Applied K-means clustering for city segmentation to guide A/B experiment design'],
    },
  },
];

function ExperienceList({ items, locale }: { items: typeof workExperience; locale: string }) {
  const l = locale as 'zh' | 'en';
  return (
    <div className="space-y-8">
      {items.map((exp, i) => (
        <div key={i} className="flex gap-4">
          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#ccc] shrink-0" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <span className="text-[15px] font-semibold text-[#0a0a0a]">{exp.role[l]}</span>
              <span className="text-[12px] text-[#bbb] shrink-0">
                {typeof exp.period === 'string' ? exp.period : exp.period[l]}
              </span>
            </div>
            <div className="text-[14px] text-[#555] mb-2">{exp.company[l]}</div>
            <ul className="space-y-1">
              {exp.details[l].map((d, j) => (
                <li key={j} className="text-[13px] text-[#888] flex gap-2">
                  <span className="text-[#ccc] shrink-0">·</span><span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as 'zh' | 'en';

  return (
    <div className="max-w-2xl">
      <h1 className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-10">
        {l === 'zh' ? '关于我' : 'About Me'}
      </h1>

      {/* 简介 */}
      <section className="mb-12">
        <p className="text-[16px] text-[#555] leading-relaxed mb-4">
          {l === 'zh'
            ? '香港大学统计学博士，专注于金融时间序列分析与因果推断研究，具备扎实的数学与统计学理论基础，擅长数据建模与分析，掌握多种编程语言（Matlab, Python, R 等）。'
            : 'PhD in Statistics from The University of Hong Kong, specializing in financial time series analysis and causal inference. Skilled in data modeling and programming (Matlab, Python, R).'}
        </p>
        <p className="text-[16px] text-[#555] leading-relaxed">
          {l === 'zh'
            ? '多年学术训练培养了强大的逻辑思维与快速学习能力，喜欢挑战，具备较强的抗压能力，为人正直严谨，积极乐观，勤学奉献。'
            : 'Years of academic training cultivated strong logical thinking. I enjoy challenges, stay optimistic under pressure, and am committed to rigorous, dedicated work.'}
        </p>
      </section>

      {/* 工作经历 */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-6">
          {l === 'zh' ? '工作经历' : 'Work Experience'}
        </h2>
        <ExperienceList items={workExperience} locale={locale} />
      </section>

      {/* 实习经历 */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-6">
          {l === 'zh' ? '实习经历' : 'Internship'}
        </h2>
        <ExperienceList items={internship} locale={locale} />
      </section>

      {/* 教育背景 */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-6">
          {l === 'zh' ? '教育背景' : 'Education'}
        </h2>
        <div className="space-y-8">
          {education.map((edu, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#ccc] shrink-0" />
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <span className="text-[15px] font-semibold text-[#0a0a0a]">{edu.degree[l]}</span>
                  <span className="text-[12px] text-[#bbb] shrink-0">{edu.period}</span>
                </div>
                <div className="text-[14px] text-[#555] mb-2">{edu.school[l]}</div>
                <ul className="space-y-1">
                  {edu.details[l].map((d, j) => (
                    <li key={j} className="text-[13px] text-[#888] flex gap-2">
                      <span className="text-[#ccc] shrink-0">·</span><span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
