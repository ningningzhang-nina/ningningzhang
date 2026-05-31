import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllPapers, getAllPosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: 'Zhang Ningning' };
}

function ResearchTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#d8deea] bg-white px-4 py-2 text-[13px] font-medium text-[#43546b]">
      {children}
    </span>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const isZh = locale === 'zh';

  const papers = getAllPapers().slice(0, 3);
  const posts = getAllPosts(locale).slice(0, 3);
  const tags = isZh
    ? ['Statistical Modeling', 'Financial Time Series', 'Causal Inference', 'Airline Pricing']
    : ['Statistical Modeling', 'Financial Time Series', 'Causal Inference', 'Airline Pricing'];

  return (
    <div className="bg-[#fbfcff]">
      <section className="relative overflow-hidden border-b border-[#e4e9f1]">
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,#eef4fb_0%,rgba(251,252,255,0)_100%)]" />
        <div className="relative mx-auto grid min-h-[610px] max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-8 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8a7444]">
              <span className="h-px w-12 bg-[#bda36b]" />
              <span>{isZh ? 'Scholar Profile' : 'Scholar Profile'}</span>
            </div>

            <h1 className="mb-5 text-[64px] font-semibold leading-[0.98] tracking-[-0.02em] text-[#0f2742] md:text-[78px]">
              张宁宁
              <span className="mt-4 block text-[34px] font-medium tracking-normal text-[#506176] md:text-[42px]">
                Ningning Zhang
              </span>
            </h1>

            <p className="mb-7 max-w-2xl text-[19px] leading-9 text-[#43546b]">
              {isZh
                ? '香港大学统计学博士，现为中国民航信息网络股份有限公司博士后研究员。研究聚焦统计建模、金融时间序列、因果推断，以及民航收益管理与动态定价算法。'
                : 'Ph.D. in Statistics from The University of Hong Kong, currently a postdoctoral researcher at TravelSky. My research focuses on statistical modeling, financial time series, causal inference, and airline revenue management.'}
            </p>

            <div className="mb-9 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <ResearchTag key={tag}>{tag}</ResearchTag>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/papers`}
                className="rounded-full bg-[#0f2742] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(15,39,66,0.22)] transition-colors hover:bg-[#18385c]"
              >
                {isZh ? '查看代表论文' : 'View Publications'}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="rounded-full border border-[#c8d1de] bg-white px-6 py-3 text-[14px] font-semibold text-[#0f2742] transition-colors hover:border-[#0f2742]"
              >
                {isZh ? '查看学术经历' : 'Academic Background'}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2px] border border-[#e2e7ef] bg-white p-8 shadow-[0_30px_80px_rgba(37,55,78,0.12)]">
            <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8a7444]">
              Academic Snapshot
            </p>
            <div className="space-y-6">
              {[
                [isZh ? '现任' : 'Current', isZh ? '航信博士后研究员' : 'Postdoctoral Researcher, TravelSky'],
                [isZh ? '教育' : 'Education', isZh ? '香港大学统计学博士' : 'Ph.D. in Statistics, HKU'],
                [isZh ? '方向' : 'Focus', isZh ? '收益管理 · 动态定价 · 时间序列' : 'Revenue Management · Dynamic Pricing · Time Series'],
                ['Email', 'zhangnn0725@163.com'],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-[#edf1f6] pt-5">
                  <div className="mb-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#9aa6b6]">{label}</div>
                  <div className="text-[17px] font-semibold leading-7 text-[#0f2742]">{value}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8a7444]">
                Publications
              </p>
              <h2 className="text-[28px] font-semibold text-[#0f2742]">
                {isZh ? '代表论文' : 'Selected Publications'}
              </h2>
            </div>
            <Link href={`/${locale}/papers`} className="text-[13px] font-semibold text-[#506176] hover:text-[#0f2742]">
              {t('viewAll')} →
            </Link>
          </div>

          <div className="divide-y divide-[#e7ecf3] border-y border-[#e7ecf3] bg-white">
            {papers.map((paper) => (
              <article key={paper.slug} className="grid gap-4 px-6 py-6 md:grid-cols-[82px_1fr]">
                <div className="text-[13px] font-semibold text-[#8a7444]">{paper.year}</div>
                <div>
                  <h3 className="mb-2 text-[17px] font-semibold leading-7 text-[#0f2742]">{paper.title}</h3>
                  <p className="mb-1 text-[14px] text-[#506176]">{paper.authors}</p>
                  <p className="text-[13px] italic text-[#7b8797]">{paper.venue}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8a7444]">
                Notes
              </p>
              <h2 className="text-[28px] font-semibold text-[#0f2742]">
                {isZh ? '研究笔记' : 'Research Notes'}
              </h2>
            </div>
            <Link href={`/${locale}/blog`} className="text-[13px] font-semibold text-[#506176] hover:text-[#0f2742]">
              {t('viewAll')} →
            </Link>
          </div>

          <div className="space-y-4">
            {posts.map((post) => {
              const href = post.externalUrl || `/${locale}/blog/${post.slug}`;
              const isExternal = !!post.externalUrl;
              const className = 'block border border-[#e2e7ef] bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(37,55,78,0.10)]';
              const body = (
                <>
                  <div className="mb-3 flex items-center justify-between gap-4 text-[12px] text-[#7b8797]">
                    <span>{post.date}</span>
                    {post.tags[0] && <span className="font-semibold text-[#8a7444]">{post.tags[0]}</span>}
                  </div>
                  <h3 className="mb-2 text-[16px] font-semibold leading-7 text-[#0f2742]">{post.title}</h3>
                  {post.summary && <p className="line-clamp-2 text-[13px] leading-6 text-[#66758a]">{post.summary}</p>}
                </>
              );

              return isExternal ? (
                <a key={post.slug} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                  {body}
                </a>
              ) : (
                <Link key={post.slug} href={href} className={className}>
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e4e9f1] bg-[#f5f8fc]">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-12 md:grid-cols-3">
          {[
            [isZh ? '研究主题' : 'Research Areas', isZh ? '统计学习、条件矩、分位数方法、金融时间序列、航空动态定价。' : 'Statistical learning, conditional moments, quantile methods, financial time series, and airline pricing.'],
            [isZh ? '方法能力' : 'Methods', isZh ? '因果推断、优化建模、机器学习、R/Python/Matlab 数据分析。' : 'Causal inference, optimization, machine learning, and R/Python/Matlab analysis.'],
            [isZh ? '合作联系' : 'Contact', 'zhangnn0725@163.com'],
          ].map(([title, text]) => (
            <div key={title} className="bg-white p-6">
              <h3 className="mb-3 text-[14px] font-semibold text-[#0f2742]">{title}</h3>
              <p className="text-[14px] leading-7 text-[#5f6f84]">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
