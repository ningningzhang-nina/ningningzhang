import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { getAllPapers, getAllPatents, getAllPosts, getAllProjects } from '@/lib/content';
import graduationPortrait from '@/public/images/profile/graduation-portrait-retouched.jpg';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '张宁宁｜决策智能与智能定价算法负责人' : 'Ningning Zhang | Decision Intelligence & Pricing Algorithm Lead',
    description: isZh
      ? '结合统计学习、优化与 AI，在不确定环境中构建智能定价、资源配置与收益优化决策系统。'
      : 'Building intelligent pricing, resource-allocation, and revenue-optimization systems with statistical learning, optimization, and AI.',
  };
}

const experience = [
  {
    period: { zh: '2025.09 – 至今', en: 'Sep 2025 – Present' },
    role: { zh: '博士后研究员 · 核心算法负责人', en: 'Postdoctoral Researcher · Algorithm Lead' },
    organization: { zh: '中国民航信息网络股份有限公司', en: 'TravelSky Technology Limited' },
    details: {
      zh: [
        '负责大型决策系统的算法研发，连接需求预测、优化、定价策略与仿真验证',
        '将方法落地于航空收益管理与动态定价，构建“预测—优化—控制”闭环',
      ],
      en: [
        'Lead algorithm development for large-scale decision systems, connecting demand forecasting, optimization, pricing strategy, and simulation-based validation',
        'Apply these methods to airline revenue management and dynamic pricing through a forecast-optimize-control loop',
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

const skillGroups = [
  {
    title: { zh: '预测与统计建模', en: 'Forecasting & Statistics' },
    items: ['Bayesian Time Series', 'Probabilistic Forecasting', 'LightGBM', 'Demand Unconstraining'],
  },
  {
    title: { zh: '决策智能', en: 'Decision Intelligence' },
    items: ['Optimization under Uncertainty', 'Dynamic Programming', 'Reinforcement Learning', 'Simulation-based Evaluation'],
  },
  {
    title: { zh: '定价与收益优化', en: 'Pricing & Revenue Optimization' },
    items: ['Dynamic Pricing', 'Choice Modeling', 'WTP', 'Bid Price'],
  },
  {
    title: { zh: 'AI 系统', en: 'AI Systems' },
    items: ['LLM Agent', 'Tool Calling', 'AI Decision Support', 'Experimentation'],
  },
] as const;

const leadershipItems = [
  {
    title: { zh: '算法体系协调', en: 'Algorithm Program Coordination' },
    detail: { zh: '统筹预测、网络优化、Bid Price 与定价模块的接口、依赖和验证节奏。', en: 'Coordinate interfaces, dependencies, and validation across forecasting, network optimization, bid price, and pricing modules.' },
  },
  {
    title: { zh: '验证流程设计', en: 'Validation Workflow Design' },
    detail: { zh: '建立基线、Oracle、固定随机数、压力场景与收益分解相结合的算法评测流程。', en: 'Design evaluation workflows combining baselines, Oracle controls, common random numbers, stress scenarios, and revenue decomposition.' },
  },
  {
    title: { zh: '跨职能协作', en: 'Cross-functional Collaboration' },
    detail: { zh: '推动预测、优化、测试与业务参与者围绕统一输入输出和验收标准协同。', en: 'Align forecasting, optimization, testing, and business stakeholders around shared contracts and acceptance criteria.' },
  },
  {
    title: { zh: '实验与进度治理', en: 'Experiment & Delivery Governance' },
    detail: { zh: '建立实验记录、运行状态、问题备注和结果对标机制，让复杂算法项目可追踪。', en: 'Establish experiment logs, run status, issue notes, and benchmark tracking for transparent algorithm delivery.' },
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
    value: '7',
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
  const patents = getAllPatents();
  const posts = getAllPosts(locale).slice(0, 3);
  const allProjects = getAllProjects();
  const featuredSlugs = [
    'dynamic-pricing',
    'revenue-management-optimization',
    'revenue-management-ai-copilot',
    'airline-rm-simulation-evaluation',
  ];
  const projects = featuredSlugs
    .map((slug) => allProjects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const featuredPatents = patents.filter((patent) =>
    patent.title.includes('航班聚合动态定价') || patent.title.includes('多智能体协同')
  );
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resumeHref = `${basePath}/${isZh ? 'Ningning_Zhang_Resume_ZH.pdf' : 'Ningning_Zhang_Resume_EN.pdf'}`;

  return (
    <div className="design-home">
      <section className="design-hero" id="about">
        <div className="design-hero-copy">
          <p className="design-kicker">DECISION INTELLIGENCE · OPTIMIZATION · AI</p>
          <h1>{isZh ? '张宁宁' : 'Ningning Zhang'}</h1>
          <h2>{isZh ? '决策智能与智能定价算法负责人' : 'Decision Intelligence & Pricing Algorithm Lead'}</h2>
          <p className="design-hero-summary">
            {isZh
              ? '香港大学统计学博士，专注于不确定环境下的智能决策系统。结合统计建模、预测优化、动态定价与 AI Agent，解决复杂商业场景中的资源配置和收益优化问题。当前在航空收益管理场景中落地这些方法，构建“预测—优化—控制”闭环系统。'
              : 'Ph.D. in Statistics from The University of Hong Kong. I build intelligent decision systems that combine statistical learning, optimization, dynamic pricing, and AI agents to solve complex business problems under uncertainty. I currently apply these methods to airline revenue management through a forecast-optimize-control loop.'}
          </p>
          <div className="design-hero-leadership">
            <div>
              <span>ALGORITHM LEADERSHIP</span>
              <strong>{isZh ? '算法负责人 · 跨模块项目管理' : 'Algorithm Lead · Cross-functional Program Management'}</strong>
            </div>
            <p>
              {isZh
                ? '统筹预测、优化、定价、仿真与验证，推动跨团队协作、实验治理和复杂算法交付。'
                : 'Leading forecasting, optimization, pricing, simulation, and validation across teams—from interfaces and experiment governance to delivery.'}
            </p>
          </div>
          <div className="design-actions">
            <Link href={`/${locale}/projects`} className="design-button design-button-primary">
              {isZh ? '查看项目' : 'View Projects'}
            </Link>
            <a href={resumeHref} download className="design-button design-button-secondary">
              {isZh ? '下载简历' : 'Download Résumé'}
            </a>
            <a
              href="https://www.agifors.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="design-button design-button-secondary"
            >
              AGIFORS Member ↗
            </a>
            <a href="https://github.com/ningningzhang-nina" target="_blank" rel="noopener noreferrer" className="design-text-link">
              GitHub ↗
            </a>
          </div>
          <div className="design-tags">
            {['Decision Intelligence', 'Optimization under Uncertainty', 'Dynamic Pricing', 'AI Decision Systems'].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="design-profile">
          <Image
            src={graduationPortrait}
            alt={isZh ? '张宁宁的博士毕业照' : 'Graduation portrait of Ningning Zhang'}
            priority
            sizes="(max-width: 980px) 500px, 420px"
          />
          <div className="design-stats">
            <article><strong>{papers.length}+</strong><span>{isZh ? '论文与研究成果' : 'Publications'}</span></article>
            <article><strong>{patents.length}</strong><span>{isZh ? '专利' : 'Patents'}</span></article>
            <article><strong>{projects.length}</strong><span>{isZh ? '核心项目' : 'Core Projects'}</span></article>
            <article><strong>Ph.D.</strong><span>{isZh ? '统计学' : 'Statistics'}</span></article>
          </div>
        </div>
      </section>

      <section className="design-section design-leadership-section" id="leadership">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">LEADERSHIP & PROJECT MANAGEMENT</p>
            <h2>{isZh ? '算法领导力与项目管理' : 'Leadership & Project Management'}</h2>
          </div>
        </div>
        <div className="design-leadership-grid">
          {leadershipItems.map((item, index) => (
            <article key={item.title.en}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title[l]}</h3>
              <p>{item.detail[l]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="design-section" id="skills">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">CORE EXPERTISE</p>
            <h2>{isZh ? '核心能力' : 'Core Expertise'}</h2>
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
          {projects.map((project, index) => {
            const title = isZh ? project.titleZh || project.title : project.titleEn || project.title;
            const description = isZh ? project.descriptionZh || project.description : project.descriptionEn || project.description;
            const application = isZh ? project.applicationZh : project.applicationEn;
            const proof = isZh ? project.proofLabelZh : project.proofLabelEn;
            return (
              <Link href={`/${locale}/projects/${project.slug}`} key={project.slug}>
                <article>
                  <span className="design-card-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  {application && (
                    <p className="design-card-application">
                      <strong>{isZh ? '应用场景' : 'Application'}</strong>
                      {application}
                    </p>
                  )}
                  <div className="design-card-tags">
                    {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  {proof && <strong>{isZh ? `验证证据：${proof}` : `Evidence: ${proof}`}</strong>}
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="design-section" id="papers">
        <div className="design-section-heading">
          <div>
            <p className="design-kicker">RESEARCH FOUNDATION</p>
            <h2>{isZh ? '研究基础' : 'Research Foundation'}</h2>
          </div>
          <Link href={`/${locale}/papers`}>{isZh ? '查看研究成果' : 'View research work'} →</Link>
        </div>
        <div className="design-paper-grid">
          {papers.slice(0, 2).map((paper) => (
            <article key={paper.slug}>
              <div><span>{paper.venue}</span><time>{paper.year}</time></div>
              <h3>{paper.title}</h3>
              <p>{paper.authors}</p>
            </article>
          ))}
          {featuredPatents.map((patent) => (
            <article key={patent.slug}>
              <div><span>{isZh ? '发明专利' : 'Patent'}</span><time>PATENT</time></div>
              <h3>{patent.title}</h3>
              <p>{isZh ? `发明人：${patent.inventors}` : `Inventors: ${patent.inventors}`}</p>
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
        <h2>{isZh ? '交流决策智能、定价优化与职业机会' : 'Decision intelligence, pricing optimization, and opportunities'}</h2>
        <p>{isZh ? '如果你正在寻找兼具统计建模深度、优化能力与复杂决策系统经验的算法负责人，欢迎联系我。' : 'If you are looking for an algorithm lead combining statistical depth, optimization, and complex decision-system experience, let’s talk.'}</p>
        <div>
          <a href="mailto:zhangnn0725@163.com" className="design-button design-button-primary">zhangnn0725@163.com</a>
          <a href="https://github.com/ningningzhang-nina" target="_blank" rel="noopener noreferrer" className="design-button design-button-secondary">GitHub</a>
        </div>
      </section>
    </div>
  );
}
