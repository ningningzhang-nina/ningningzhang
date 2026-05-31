import { getTranslations } from 'next-intl/server';
import { getAllPapers } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'papers' });
  return { title: t('title') };
}

export default async function PapersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'papers' });
  const papers = getAllPapers();
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-2">{t('title')}</h1>
        <p className="text-[15px] text-[#888]">{t('subtitle')}</p>
      </div>

      {papers.length === 0 && (
        <p className="text-[15px] text-[#bbb]">
          {locale === 'zh' ? '在 content/papers.md 中添加论文。' : 'Add papers to content/papers.md.'}
        </p>
      )}

      {years.map((year) => (
        <section key={year} className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-4">{year}</h2>
          <div className="space-y-6">
            {papers.filter((p) => p.year === year).map((paper) => (
              <div key={paper.slug} className="border-l-2 border-[#ebebeb] pl-5">
                <h3 className="text-[15px] font-semibold text-[#0a0a0a] mb-1 leading-snug">
                  {paper.title}
                </h3>
                <p className="text-[13px] text-[#888] mb-0.5">{paper.authors}</p>
                <p className="text-[13px] text-[#aaa] italic mb-2">{paper.venue}</p>
                {paper.abstract && (
                  <p className="text-[13px] text-[#777] leading-relaxed mb-2 line-clamp-2">
                    {paper.abstract}
                  </p>
                )}
                <div className="flex items-center gap-4">
                  {paper.citations !== undefined && paper.citations > 0 && (
                    <span className="text-[12px] text-[#bbb]">
                      引用 {paper.citations}
                    </span>
                  )}
                  {paper.doi && (
                    <a
                      href={paper.doi.startsWith('http') ? paper.doi : `https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] text-[#555] hover:text-[#0a0a0a] underline underline-offset-2 transition-colors"
                    >
                      DOI
                    </a>
                  )}
                  {paper.pdf && (
                    <a
                      href={paper.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] text-[#555] hover:text-[#0a0a0a] underline underline-offset-2 transition-colors"
                    >
                      PDF
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
