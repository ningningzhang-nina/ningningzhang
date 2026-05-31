import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllProjects } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });
  return { title: t('title') };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = getAllProjects();

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-2">{t('title')}</h1>
        <p className="text-[15px] text-[#888]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-white border border-[#ebebeb] rounded-xl p-6 hover:border-[#d0d0d0] transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-[16px] font-semibold text-[#0a0a0a]">{project.title}</h2>
                  {project.featured && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#999] bg-[#f5f5f5] px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-[#666] leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-[#f5f5f5] rounded text-[11px] text-[#666]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-[#555] hover:text-[#0a0a0a] border border-[#ebebeb] px-3 py-1 rounded-lg transition-colors"
                  >
                    {t('viewCode')}
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-white bg-[#0a0a0a] px-3 py-1 rounded-lg hover:bg-[#333] transition-colors text-center"
                  >
                    {t('viewDemo')}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-[15px] text-[#bbb]">
            {locale === 'zh' ? '暂无项目，请在 content/projects/ 目录添加。' : 'No projects yet. Add .md files to content/projects/.'}
          </p>
        )}
      </div>
    </div>
  );
}
