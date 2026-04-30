import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title') };
}

const education = [
  {
    degree: { zh: '博士研究生', en: 'PhD Student' },
    school: 'University Name',
    period: '2022 – Present',
    detail: { zh: '计算机科学，专注机器学习与系统方向', en: 'Computer Science, focused on ML & Systems' },
  },
  {
    degree: { zh: '工学学士', en: 'Bachelor of Engineering' },
    school: 'Another University',
    period: '2018 – 2022',
    detail: { zh: '软件工程', en: 'Software Engineering' },
  },
];

const experience = [
  {
    role: { zh: '研究实习生', en: 'Research Intern' },
    company: 'Some Lab / Company',
    period: '2023 Summer',
    detail: { zh: '大规模分布式系统研究', en: 'Large-scale distributed systems research' },
  },
];

const skills = ['Python', 'PyTorch', 'TypeScript', 'Go', 'Kubernetes', 'PostgreSQL', 'Linux', 'LaTeX'];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const l = locale as 'zh' | 'en';

  return (
    <div className="max-w-2xl">
      <h1 className="text-[32px] font-bold tracking-tight text-[#0a0a0a] mb-10">{t('title')}</h1>

      {/* Bio */}
      <section className="mb-12">
        <p className="text-[16px] text-[#555] leading-relaxed mb-4">
          {locale === 'zh'
            ? '你好！我是张宁宁，目前在某某大学攻读博士学位，研究方向为机器学习与分布式系统。我热爱构建实际可用的系统，并将研究成果转化为工程实践。'
            : "Hi! I'm Zhang Ningning, a PhD student at a university researching machine learning and distributed systems. I love building systems that work in practice and bridging the gap between research and engineering."}
        </p>
        <p className="text-[16px] text-[#555] leading-relaxed">
          {locale === 'zh'
            ? '业余时间我喜欢写作、摄影和爬山。这个网站是我分享思考、记录成长的地方。'
            : 'In my spare time I enjoy writing, photography, and hiking. This site is where I share my thinking and document my growth.'}
        </p>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-5">
          {t('education')}
        </h2>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ccc] shrink-0" />
              <div>
                <div className="text-[15px] font-semibold text-[#0a0a0a]">{edu.degree[l]}</div>
                <div className="text-[14px] text-[#555]">{edu.school} · {edu.period}</div>
                <div className="text-[13px] text-[#999] mt-0.5">{edu.detail[l]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-5">
          {t('experience')}
        </h2>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ccc] shrink-0" />
              <div>
                <div className="text-[15px] font-semibold text-[#0a0a0a]">{exp.role[l]}</div>
                <div className="text-[14px] text-[#555]">{exp.company} · {exp.period}</div>
                <div className="text-[13px] text-[#999] mt-0.5">{exp.detail[l]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-[11px] font-semibold uppercase tracking-[2px] text-[#bbb] mb-5">
          {t('skills')}
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 bg-white border border-[#ebebeb] rounded-lg text-[13px] text-[#444] font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
