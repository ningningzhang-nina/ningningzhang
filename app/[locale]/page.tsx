import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllPapers, getAllPosts } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: 'Zhang Ningning' };
}

function FieldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#d8e0ea] bg-white px-3 py-1 text-[12px] font-medium text-[#31435a]">
      {children}
    </span>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const isZh = locale === 'zh';

  const posts = getAllPosts(locale).slice(0, 3);
  const papers = getAllPapers().slice(0, 4);
  const fields = isZh
    ? ['统计建模', '金融时间序列', '因果推断', '动态定价', '收益管理']
    : ['Statistical Modeling', 'Financial Time Series', 'Causal Inference', 'Dynamic Pricing', 'Revenue Management'];
  const metrics = [
    { value: 'Ph.D.', label: isZh ? '香港大学统计学博士' : 'Statistics, HKU' },
    { value: '10+', label: isZh ? '论文与工作论文' : 'papers and working papers' },
    { value: '2025', label: isZh ? '航信博士后研究员' : 'Postdoctoral Researcher at TravelSky' },
  ];

  return (
    <div className="max-w-5xl">
      <section className="mb-12 border-b border-[#dfe5ec] pb-12">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-[12px] font-semibold uppercase text-[#6d7b8c]">
          <span>{isZh ? 'Academic Profile' : 'Academic Profile'}</span>
          <span className="h-px w-10 bg-[#b8c3d1]" />
          <span>{isZh ? 'Statistics · Aviation Pricing · Time Series' : 'Statistics · Aviation Pricing · Time Series'}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <h1 className="mb-4 text-[52px] font-semibold leading-[1.02] text-[#102033]">
              张宁宁
              <span className="mt-2 block text-[34px] font-medium text-[#536276]">Ningning Zhang</span>
            </h1>
            <p className="mb-6 max-w-2xl text-[18px] leading-8 text-[#455468]">
              {isZh
                ? '香港大学统计学博士，现为中国民航信息网络股份有限公司博士后研究员。研究聚焦统计建模、金融时间序列、因果推断，以及民航收益管理与动态定价算法。'
                : 'Ph.D. in Statistics from The University of Hong Kong, currently a postdoctoral researcher at TravelSky. My work focuses on statistical modeling, financial time series, causal inference, and airline revenue management.'}
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {fields.map((field) => (
                <FieldBadge key={field}>{field}</FieldBadge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/papers`}
                className="rounded-md bg-[#102033] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#253852]"
              >
                {isZh ? '查看论文' : 'View Publications'}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="rounded-md border border-[#c8d2df] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#26364a] transition-colors hover:border-[#102033]"
              >
                {isZh ? '学术经历' : 'Academic CV'}
              </Link>
            </div>
          </div>

          <div className="border-l-4 border-[#b68a3a] bg-white p-6 shadow-[0_18px_50px_rgba(18,32,51,0.08)]">
            <p className="mb-4 text-[11px] font-semibold uppercase text-[#8a6a2d]">
              {isZh ? 'Current Appointment' : 'Current Appointment'}
            </p>
            <h2 className="mb-2 text-[19px] font-semibold text-[#102033]">
              {isZh ? '博士后研究员' : 'Postdoctoral Researcher'}
            </h2>
            <p className="mb-5 text-[14px] leading-6 text-[#536276]">
              {isZh
                ? '中国民航信息网络股份有限公司（航信） · 收益管理与动态定价算法研究'
                : 'TravelSky Technology Limited · revenue management and dynamic pricing research'}
            </p>
            <div className="space-y-3">
              {metrics.map((item) => (
                <div key={item.value} className="flex items-baseline justify-between gap-4 border-t border-[#eef2f6] pt-3">
                  <span className="text-[24px] font-semibold text-[#102033]">{item.value}</span>
                  <span className="text-right text-[12px] leading-5 text-[#6d7b8c]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase text-[#536276]">
              {isZh ? 'Selected Publications' : 'Selected Publications'}
            </h2>
            <Link
              href={`/${locale}/papers`}
              className="text-[12px] font-medium text-[#536276] hover:text-[#102033]"
            >
              {t('viewAll')} →
            </Link>
          </div>
          <div className="space-y-4">
            {papers.map((paper) => (
              <div key={paper.slug} className="border-l border-[#c8d2df] bg-white px-5 py-4">
                <div className="mb-1 text-[12px] font-semibold text-[#8a6a2d]">{paper.year}</div>
                <h3 className="mb-1 text-[15px] font-semibold leading-6 text-[#102033]">{paper.title}</h3>
                <p className="mb-1 text-[13px] text-[#6d7b8c]">{paper.authors}</p>
                <p className="text-[12px] italic text-[#8a96a6]">{paper.venue}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold uppercase text-[#536276]">
              {isZh ? 'Research Notes' : 'Research Notes'}
            </h2>
            <Link
              href={`/${locale}/blog`}
              className="text-[12px] font-medium text-[#536276] hover:text-[#102033]"
            >
              {t('viewAll')} →
            </Link>
          </div>
          <div className="space-y-3">
            {posts.map((post) => {
              const href = post.externalUrl || `/${locale}/blog/${post.slug}`;
              const isExternal = !!post.externalUrl;
              const className = 'group block border border-[#dfe5ec] bg-[#fbfcfd] px-4 py-4 transition-colors hover:border-[#b8c3d1] hover:bg-white';

              const body = (
                <>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-[12px] text-[#8a96a6]">{post.date}</span>
                    {post.tags[0] && <span className="text-[11px] font-medium text-[#8a6a2d]">{post.tags[0]}</span>}
                  </div>
                  <h3 className="text-[15px] font-semibold leading-6 text-[#102033] group-hover:text-[#000]">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-[#6d7b8c]">{post.summary}</p>
                  )}
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

      <section className="grid gap-4 border-t border-[#dfe5ec] pt-8 md:grid-cols-3">
        {[
          {
            title: isZh ? '研究方向' : 'Research',
            text: isZh ? '统计学习、条件矩、分位数方法、金融时间序列与航空动态定价。' : 'Statistical learning, conditional moments, quantile methods, financial time series, and airline pricing.',
          },
          {
            title: isZh ? '方法能力' : 'Methods',
            text: isZh ? '因果推断、优化建模、机器学习、R/Python/Matlab 数据分析。' : 'Causal inference, optimization, machine learning, and R/Python/Matlab analysis.',
          },
          {
            title: isZh ? '联系合作' : 'Contact',
            text: 'zhangnn0725@163.com',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white p-5">
            <h2 className="mb-2 text-[13px] font-semibold uppercase text-[#102033]">{item.title}</h2>
            <p className="text-[13px] leading-6 text-[#6d7b8c]">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
