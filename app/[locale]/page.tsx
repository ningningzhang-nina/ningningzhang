import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { getAllPapers, getAllPosts, getAllProjects } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '张宁宁｜定价与决策智能算法' : 'Ningning Zhang | Pricing & Decision Intelligence',
    description: isZh
      ? '覆盖需求预测、旅客选择、收益优化、动态定价与算法仿真评测的决策智能作品集。'
      : 'A decision-intelligence portfolio spanning demand forecasting, customer choice, revenue optimization, dynamic pricing, and simulation-based evaluation.',
  };
}

const experience = [
  {
    period: { zh: '2025.09 – 至今', en: 'Sep 2025 – Present' },
    role: { zh: '博士后研究员 · 核心算法负责人', en: 'Postdoctoral Researcher · Algorithm Lead' },
    organization: { zh: '中国民航信息网络股份有限公司', en: 'TravelSky Technology Limited' },
    details: {
      zh: [
        '负责航空收益管理与动态定价中“预测—优化—控制”闭环的核心算法设计与 POC 验证',
        '连接贝叶斯需求预测、DLP / Bid Price、Bellman DP、旅客选择与 WTP 建模',
      ],
      en: [
        'Lead core algorithm design and POC validation for the forecast-optimize-control loop in airline revenue management and dynamic pricing',
        'Connect Bayesian demand forecasting, DLP / bid price, Bellman DP, customer choice, and WTP modeling',
      ],
    },
  },
  {
    period: { zh: '2025.01 – 2025.08', en: 'Jan 2025 – Aug 2025' },
    role: { zh: '博士后研究员', en: 'Postdoctoral Researcher' },
    organization: { zh: '香港大学', en: 'The University of Hong Kong' },
    details: {
      zh: ['开展金融时间序列、条件矩、概率建模与不确定性分析研究'],
      en: ['Research in financial time series, conditional moments, probabilistic modeling, and uncertainty analysis'],
    },
  },
  {
    period: { zh: '2017 – 2018', en: '2017 – 2018' },
    role: { zh: '算法与数据分析实习', en: 'Algorithm & Data Analytics Internships' },
    organization: { zh: '美团 · 滴滴出行', en: 'Meituan · DiDi' },
    details: {
      zh: ['参与配送时间预测、供需分析、调价评估与实验分群'],
      en: ['Worked on delivery-time prediction, supply-demand analysis, pricing evaluation, and experiment segmentation'],
    },
  },
] as const;

const skillGroups = [
  {
    title: { zh: '预测与统计建模', en: 'Forecasting & Statistics' },
    items: ['Bayesian Time Series', 'Probabilistic Forecasting', 'LightGBM', 'Demand Unconstraining'],
  },
  {
    title: { zh: '定价与收益优化', en: 'Pricing & Revenue Optimization' },
    items: ['Choice Modeling', 'WTP', 'DLP', 'Bid Price', 'Bellman DP'],
  },
  {
    title: { zh: '系统与评测', en: 'Systems & Evaluation' },
    items: ['Python', 'Streamlit', 'Backtesting', 'Common Random Numbers', 'LLM Tool Calling'],
  },
] as const;

const credentials = [
  {
    value: 'Ph.D.',
    title: { zh: '香港大学统计学博士', en: 'Ph.D. in Statistics, HKU' },
    note: { zh: '时间序列、概率建模与不确定性分析', en: 'Time series, probabilistic modeling, and uncertainty analysis' },
  },
  {
    value: '#1',
    title: { zh: '硕士专业排名', en: 'M.S. Program Rank' },
    note: { zh: '平均分 93.51 / 100', en: 'GPA 93.51 / 100' },
  },
  {
    value: '3',
    title: { zh: '专利成果', en: 'Patents' },
    note: { zh: '算法设计与业务应用相关', en: 'Algorithm design and applied systems' },
  },
] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  const l = isZh ? 'zh' : 'en';
  const papers = getAllPapers();
  const posts = getAllPosts(locale).slice(0, 3);
  const projects = getAllProjects().filter((project) => project.category !== 'frontier');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resumeHref = `${basePath}/${isZh ? 'Ningning_Zhang_Resume_ZH.pdf' : 'Ningning_Zhang_Resume_EN.pdf'}`;

  return (
    <div className="design-home">
      <section className="design-hero" id="about">
        <div className="design-hero-copy">
          <p className="design-kicker">PH.D. · PRICING · DECISION INTELLIGENCE</p>
          <h1>{isZh ? '张宁宁' : 'Ningning Zhang'}</h1>
          <h2>{isZh ? '定价与收益优化算法负责人' : 'Pricing & Revenue Optimization Algorithm Lead'}</h2>
          <p className="design-hero-summary">
            {isZh
              ? '香港大学统计学博士，现从事航空收益管理与动态定价算法研发。专注把需求预测、旅客选择、容量约束与收益目标连接成可验证、可解释的决策系统。'
              : 'Ph.D. in Statistics from The University of Hong Kong, working on airline revenue management and dynamic pricing. I connect demand forecasting, customer choice, capacity constraints, and revenue objectives into testable, explainable decision systems.'}
          </p>
          <div className="design-actions">
            <Link href={`/${locale}/projects`} className="design-button design-button-primary">
              {isZh ? '查看项目' : 'View Projects'}
            </Link>
            <a href={resumeHref} download className="design-button design-button-secondary">
              {isZh ? '下载简历' : 'Download Résumé'}
            </a>
            <a href="https://github.com/ningningzhang-nina" target="_blank" rel="noopener noreferrer" className="design-text-link">
              GitHub ↗
            </a>
          </div>
          <div className="design-tags">
            {['Bayesian Forecasting', 'Dynamic Pricing', 'Revenue Optimization', 'Choice Modeling'].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="design-profile">
          <img src={`${basePath}/images/profile/graduation-portrait.jpg`} alt={isZh ? '张宁宁的博士毕业照' : 'Graduation portrait of Ningning Zhang'} />
          <div className="design-stats">
            <article><strong>{papers.length}+</strong><span>{isZh ? '论文与研究成果' : 'Publications'}</span></article>
            <article><strong>3</strong><span>{isZh ? '专利' : 'Patents'}</span></article>
            <article><strong>{projects.length}</strong><span>{isZh ? '核心项目' : 'Core Projects'}</span></article>
            <article><strong>Ph.D.</strong><span>{isZh ? '统计学' : 'Statistics'}</span></article>
          </div>
        </div>
      </section>

      <section className="design-section" id="experience">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">WORK EXPERIENCE</p>
            <h2>{isZh ? '工作经历' : 'Experience'}</h2>
          </div>
          <Link href={`/${locale}/about`}>{isZh ? '完整经历' : 'Full profile'} →</Link>
        </div>
        <div className="design-timeline">
          {experience.map((item) => (
            <article key={item.period.en}>
              <time>{item.period[l]}</time>
              <div>
                <span className="design-timeline-dot" aria-hidden="true" />
                <h3>{item.role[l]}</h3>
                <h4>{item.organization[l]}</h4>
                <ul>
                  {item.details[l].map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="design-section" id="projects">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">SELECTED PROJECTS</p>
            <h2>{isZh ? '代表项目' : 'Selected Projects'}</h2>
          </div>
          <Link href={`/${locale}/projects`}>{isZh ? '查看全部项目' : 'View all projects'} →</Link>
        </div>
        <div className="design-project-grid">
          {projects.slice(0, 3).map((project) => {
            const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
            const description = isZh ? project.descriptionZh || project.description : project.descriptionEn || project.description;
            const outcome = isZh ? project.outcomesZh?.[0] : project.outcomesEn?.[0];
            return (
              <Link href={`/${locale}/projects/${project.slug}`} key={project.slug}>
                <article>
                  <span className="design-card-index">0{project.order}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="design-card-tags">
                    {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  {outcome && <strong>{outcome}</strong>}
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="design-section" id="papers">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">PUBLICATIONS</p>
            <h2>{isZh ? '论文与研究成果' : 'Papers & Publications'}</h2>
          </div>
          <Link href={`/${locale}/papers`}>{isZh ? '查看全部论文' : 'View all papers'} →</Link>
        </div>
        <div className="design-paper-grid">
          {papers.slice(0, 4).map((paper) => (
            <article key={paper.slug}>
              <div><span>{paper.venue}</span><time>{paper.year}</time></div>
              <h3>{paper.title}</h3>
              <p>{paper.authors}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="design-section" id="skills">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">SKILLS</p>
            <h2>{isZh ? '技术能力' : 'Technical Skills'}</h2>
          </div>
        </div>
        <div className="design-skill-grid">
          {skillGroups.map((group) => (
            <article key={group.title.en}>
              <h3>{group.title[l]}</h3>
              <div className="design-card-tags">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
        <div className="design-credential-grid">
          {credentials.map((credential) => (
            <article key={credential.value}>
              <strong>{credential.value}</strong>
              <h3>{credential.title[l]}</h3>
              <p>{credential.note[l]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="design-section" id="writing">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">TECHNICAL WRITING</p>
            <h2>{isZh ? '技术文章' : 'Technical Notes'}</h2>
          </div>
          <Link href={`/${locale}/blog`}>{isZh ? '查看全部文章' : 'View all notes'} →</Link>
        </div>
        <div className="design-writing-list">
          {posts.map((post) => (
            <Link key={post.slug} href={post.externalUrl || `/${locale}/blog/${post.slug}`} target={post.externalUrl ? '_blank' : undefined}>
              <h3>{post.title}</h3>
              <span>{post.date} ↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="design-contact" id="contact">
        <p className="design-kicker">GET IN TOUCH</p>
        <h2>{isZh ? '交流预测、定价、收益优化与职业机会' : 'Forecasting, pricing, revenue optimization, and opportunities'}</h2>
        <p>{isZh ? '如果你正在寻找兼具统计建模深度与业务决策系统经验的算法负责人，欢迎联系我。' : 'If you are looking for an algorithm lead with statistical depth and decision-system experience, let’s talk.'}</p>
        <div>
          <a href="mailto:zhangnn0725@163.com" className="design-button design-button-primary">zhangnn0725@163.com</a>
          <a href="https://github.com/ningningzhang-nina" target="_blank" rel="noopener noreferrer" className="design-button design-button-secondary">GitHub</a>
        </div>
      </section>
    </div>
  );
}
