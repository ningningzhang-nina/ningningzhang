import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllPapers, getAllPatents } from '@/lib/content';
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
  const papers = getAllPapers();
  const patents = getAllPatents();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const isZh = locale === 'zh';

  return (
    <div className="inner-page direct-content-page">
      <section className="research-catalog-section">
        <div className="research-catalog-heading">
          <p className="eyebrow">PUBLICATIONS</p>
          <h2>{isZh ? '论文与研究成果' : 'Papers & Research'}</h2>
          <span>{String(papers.length).padStart(2, '0')}</span>
        </div>
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
      </section>

      <section className="research-catalog-section">
        <div className="research-catalog-heading">
          <p className="eyebrow">PATENTS</p>
          <h2>{isZh ? '发明专利' : 'Patents'}</h2>
          <span>{String(patents.length).padStart(2, '0')}</span>
        </div>
        <div className="paper-catalog patent-catalog">
          {patents.map((patent, index) => (
            <article key={patent.slug}>
              <div className="paper-number">P{String(index + 1).padStart(2, '0')}</div>
              <div>
                <div className="paper-meta"><span>{isZh ? '发明专利' : 'Patent'}</span></div>
                <h2>{patent.title}</h2>
                <p className="paper-authors">
                  {isZh ? '发明人：' : 'Inventors: '}
                  {patent.inventors}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
