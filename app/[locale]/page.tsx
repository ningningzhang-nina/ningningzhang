import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllPapers, getAllPosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '张宁宁｜统计预测与优化算法工程师' : 'Ningning Zhang | Forecasting & Optimization',
    description: isZh
      ? '统计预测、概率建模、优化决策与民航收益管理算法作品集。'
      : 'Portfolio in statistical forecasting, probabilistic modeling, optimization, and airline revenue management.',
  };
}

const caseStudies = [
  {
    index: '01',
    title: { zh: '实时动态定价与旅客选择引擎', en: 'Real-time Choice-based Pricing Engine' },
    description: {
      zh: '从0到1主导构建 Pricing Engine，将旅客选择、WTP、价格弹性与机会成本统一到实时收益最大化框架中。',
      en: 'Built a pricing engine from the ground up, unifying customer choice, WTP, price elasticity, and opportunity cost for real-time revenue maximization.',
    },
    methods: ['Real-time Pricing', 'Choice Modeling', 'Revenue Maximization', 'Marketplace Pricing'],
  },
  {
    index: '02',
    title: { zh: '预测驱动的收益优化决策系统', en: 'Forecast-to-Decision Revenue Optimization' },
    description: {
      zh: '从0到1搭建需求预测—网络优化—Bid Price—库存控制的算法架构，将概率预测转化为可执行收益决策。',
      en: 'Built a forecast-to-decision architecture spanning demand forecasting, network optimization, bid price, and inventory control.',
    },
    methods: ['Demand Forecasting', 'Revenue Optimization', 'Network Optimization', 'Inventory Control'],
  },
  {
    index: '03',
    title: { zh: '航季运价规划与价格梯度优化', en: 'Seasonal Fare Planning & Price Ladder Optimization' },
    description: {
      zh: '基于历史销售与价格敏感性，为不同航线、季节、预售期和停留期生成下一航季分组运价与舱位价格梯度。',
      en: 'Generating segment-level seasonal fares and cabin price ladders from historical sales and price sensitivity across route and booking contexts.',
    },
    methods: ['Market Segmentation', 'Price Elasticity', 'WTP', 'Price Architecture'],
  },
  {
    index: '04',
    title: { zh: '收益管理 AI Copilot', en: 'Revenue Management AI Copilot' },
    description: {
      zh: '通过大模型问答连接数据、预测与优化模块，实现决策解释、结果溯源、What-if 分析和约束检查。',
      en: 'Connecting data, forecasting, and optimization through LLM-based explanations, decision traceability, what-if analysis, and constraint checks.',
    },
    methods: ['Decision Intelligence', 'LLM Orchestration', 'Traceability', 'What-if Analysis'],
  },
] as const;

const capabilities = [
  {
    title: { zh: '统计预测', en: 'Statistical Forecasting' },
    text: { zh: '时间序列、贝叶斯建模、概率预测与非平稳更新', en: 'Time series, Bayesian modeling, probabilistic forecasts, and non-stationary updating' },
  },
  {
    title: { zh: '优化决策', en: 'Optimization' },
    text: { zh: '线性规划、动态规划、随机优化与收益管理', en: 'Linear programming, dynamic programming, stochastic optimization, and revenue management' },
  },
  {
    title: { zh: '业务转化', en: 'Applied Modeling' },
    text: { zh: '把统计模型转化为可验证、可解释的业务决策模块', en: 'Turning statistical models into testable, interpretable decision modules' },
  },
] as const;

function DecisionVisual({ isZh }: { isZh: boolean }) {
  return (
    <div className="algorithm-visual" aria-label={isZh ? '预测、优化与决策算法链路示意图' : 'Forecasting, optimization, and decision pipeline'}>
      <svg viewBox="0 0 720 560" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="forecastBand" x1="0" x2="1">
            <stop offset="0" stopColor="#E5EAD9" stopOpacity="0.18" />
            <stop offset="1" stopColor="#B45F4A" stopOpacity="0.38" />
          </linearGradient>
          <linearGradient id="surfaceFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E5EAD9" stopOpacity="0.5" />
            <stop offset="1" stopColor="#76536B" stopOpacity="0.16" />
          </linearGradient>
          <marker id="flowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#E57A61" />
          </marker>
        </defs>

        <g fill="#E5EAD9" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="11" fontWeight="700" letterSpacing="1.8">
          <text x="34" y="22">01 FORECAST</text>
          <text x="48" y="224">02 OPTIMIZE</text>
          <text x="510" y="276">03 DECIDE</text>
        </g>

        <g opacity="0.48" stroke="#C8D2C2" strokeWidth="1">
          <path d="M34 174H686" />
          <path d="M34 116H686" strokeDasharray="4 8" />
          <path d="M34 58H686" strokeDasharray="4 8" />
        </g>
        <path
          d="M34 142 C68 116 90 151 120 120 S171 91 204 132 S257 151 292 119 S333 140 354 112 L354 112 C392 78 428 91 463 68 S522 88 558 57 S623 80 686 28 L686 110 C630 137 598 128 558 145 S502 124 463 151 S397 129 354 156 Z"
          fill="url(#forecastBand)"
        />
        <path d="M34 142 C68 116 90 151 120 120 S171 91 204 132 S257 151 292 119 S333 140 354 112" fill="none" stroke="#E5EAD9" strokeWidth="3" />
        <path d="M354 112 C392 86 428 103 463 82 S522 105 558 75 S623 98 686 48" fill="none" stroke="#E57A61" strokeWidth="3" />
        <path d="M354 28V184" stroke="#E5EAD9" strokeDasharray="8 9" opacity="0.85" />
        {[34, 84, 134, 184, 234, 284, 334, 384, 434, 484, 534, 584, 634, 686].map((x, i) => (
          <circle key={x} cx={x} cy={[142, 121, 108, 103, 139, 133, 121, 96, 91, 103, 75, 89, 81, 48][i]} r="4" fill={i < 7 ? '#E5EAD9' : '#E57A61'} />
        ))}

        <path d="M354 184 C354 218 318 232 274 270" fill="none" stroke="#E57A61" strokeWidth="2" strokeDasharray="5 7" markerEnd="url(#flowArrow)" />

        <g transform="translate(30 230)">
          <path d="M18 226 C96 150 121 36 220 56 C316 77 311 179 421 193 C319 220 224 251 18 226Z" fill="url(#surfaceFill)" stroke="#AABAA5" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M${24 + i * 12} ${220 - i * 14} C${100 + i * 8} ${154 - i * 20} ${136 + i * 11} ${54 - i * 2} ${220 + i * 6} ${62 + i * 5} C${302 + i * 9} ${74 + i * 18} ${320 + i * 8} ${170 + i * 9} ${414 - i * 2} ${190 + i * 5}`} fill="none" stroke="#DDE5D5" opacity={0.72 - i * 0.08} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx="220" cy="226" rx={176 - i * 26} ry={48 - i * 7} fill="none" stroke="#C3B69C" opacity="0.72" />
          ))}
          <path d="M122 213 C159 196 175 169 194 140 S223 95 246 78" fill="none" stroke="#E57A61" strokeWidth="3" />
          {[122, 158, 194, 223, 246].map((x, i) => <circle key={x} cx={x} cy={[213, 188, 140, 101, 78][i]} r={i === 3 ? 9 : 5} fill="#E5EAD9" stroke="#5A3F52" strokeWidth="3" />)}
        </g>

        <path d="M446 424 C476 424 492 401 519 376" fill="none" stroke="#E57A61" strokeWidth="2" strokeDasharray="5 7" markerEnd="url(#flowArrow)" />

        <g transform="translate(510 296)" stroke="#D7C9B7" strokeWidth="2">
          <path d="M20 55L92 22L146 74L104 142L35 128Z" fill="none" />
          <path d="M92 22L104 142M20 55L146 74M35 128L146 74" fill="none" opacity="0.7" />
          {([
            [20, 55, '#C8D2C2'], [92, 22, '#E5EAD9'], [146, 74, '#E57A61'], [104, 142, '#C8D2C2'], [35, 128, '#A7879F'],
          ] as const).map(([cx, cy, fill]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="13" fill={fill} stroke="#382638" strokeWidth="4" />)}
        </g>
      </svg>
      <span className="visual-caption">FORECAST → OPTIMIZE → DECIDE</span>
    </div>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';
  const l = isZh ? 'zh' : 'en';
  const papers = getAllPapers().slice(0, 3);
  const posts = getAllPosts(locale).slice(0, 3);

  return (
    <div className="portfolio-home">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">STATISTICAL FORECASTING · OPTIMIZATION</p>
          <h1>{isZh ? '统计预测与优化算法工程师' : 'Statistical Forecasting & Optimization Engineer'}</h1>
          <p className="hero-lead">
            {isZh
              ? '香港大学统计学博士，现从事航空收益管理与动态定价算法研发。擅长将时间序列预测、概率建模与优化方法转化为可落地的业务决策系统。'
              : 'Ph.D. in Statistics from The University of Hong Kong, working on airline revenue management and dynamic pricing. I turn forecasting, probabilistic modeling, and optimization into practical decision systems.'}
          </p>
          <div className="hero-actions">
            <Link href={`/${locale}/projects`} className="button button-primary">
              {isZh ? '查看代表项目' : 'View Selected Work'}
            </Link>
            <Link href={`/${locale}/about`} className="button button-secondary">
              {isZh ? '了解我的经历' : 'View Experience'}
            </Link>
          </div>
          <div className="skill-list" aria-label={isZh ? '核心技术方向' : 'Core skills'}>
            {['Time Series', 'Bayesian Modeling', 'Optimization', 'Machine Learning'].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
        <DecisionVisual isZh={isZh} />
      </section>

      <section className="proof-strip" aria-label={isZh ? '专业背景概览' : 'Professional summary'}>
        <div><span>01</span><strong>Ph.D. in Statistics</strong></div>
        <div><span>02</span><strong>Forecasting &amp; Optimization</strong></div>
        <div><span>03</span><strong>Airline RM · Dynamic Pricing</strong></div>
      </section>

      <section className="content-section" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORK</p>
            <h2>{isZh ? '代表项目' : 'Selected Projects'}</h2>
          </div>
          <Link href={`/${locale}/projects`}>{isZh ? '查看全部' : 'View all'} →</Link>
        </div>
        <div className="case-grid">
          {caseStudies.map((study) => (
            <article key={study.index} className="case-card">
              <div className="case-index">{study.index}</div>
              <h3>{study.title[l]}</h3>
              <p>{study.description[l]}</p>
              <div className="method-list">
                {study.methods.map((method) => <span key={method}>{method}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section capability-section">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">CAPABILITIES</p>
            <h2>{isZh ? '我能解决什么问题' : 'What I Bring'}</h2>
          </div>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <article key={capability.title.en}>
              <span>0{index + 1}</span>
              <h3>{capability.title[l]}</h3>
              <p>{capability.text[l]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section evidence-grid">
        <div>
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">PUBLICATIONS</p>
              <h2>{isZh ? '研究成果' : 'Selected Publications'}</h2>
            </div>
            <Link href={`/${locale}/papers`}>{isZh ? '全部论文' : 'All papers'} →</Link>
          </div>
          <div className="publication-list">
            {papers.map((paper) => (
              <article key={paper.slug}>
                <span>{paper.year}</span>
                <div>
                  <h3>{paper.title}</h3>
                  <p>{paper.venue}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow">TECHNICAL NOTES</p>
              <h2>{isZh ? '技术文章' : 'Technical Writing'}</h2>
            </div>
            <Link href={`/${locale}/blog`}>{isZh ? '全部文章' : 'All notes'} →</Link>
          </div>
          <div className="note-list">
            {posts.map((post) => (
              <Link key={post.slug} href={post.externalUrl || `/${locale}/blog/${post.slug}`} target={post.externalUrl ? '_blank' : undefined}>
                <span>{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band">
        <p className="eyebrow">LET&apos;S CONNECT</p>
        <h2>{isZh ? '关注统计预测、优化决策与算法落地机会' : 'Open to opportunities in forecasting, optimization, and applied algorithms'}</h2>
        <a href="mailto:zhangnn0725@163.com">zhangnn0725@163.com ↗</a>
      </section>
    </div>
  );
}
