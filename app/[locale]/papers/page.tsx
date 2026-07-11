import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllPapers } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'papers' });
  return { title: t('title') };
}

export default async function PapersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'papers' });
  const papers = getAllPapers();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const isZh = locale === 'zh';

  return (
    <div className="inner-page">
      <header className="inner-page-hero">
        <p className="eyebrow">RESEARCH</p>
        <h1>{t('title')}</h1>
        <p>{isZh ? '统计方法、金融时间序列、因果推断与航空动态定价相关研究。' : 'Research in statistical methods, financial time series, causal inference, and airline dynamic pricing.'}</p>
      </header>

      <div className="paper-catalog">
        {papers.map((paper, index) => (
          <article key={paper.slug}>
            <div className="paper-number">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <div className="paper-meta"><span>{paper.year}</span><span>{paper.venue}</span></div>
              <h2>{paper.title}</h2>
              <p className="paper-authors">{paper.authors}</p>
              {paper.abstract && <p className="paper-abstract">{paper.abstract}</p>}
              <div className="paper-links">
                {paper.doi && <a href={paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">DOI ↗</a>}
                {paper.pdf && <a href={`${basePath}${paper.pdf}`} target="_blank" rel="noopener noreferrer">PDF ↗</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
