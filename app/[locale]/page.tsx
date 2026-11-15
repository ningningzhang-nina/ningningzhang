import Link from 'next/link';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import graduationPortrait from '@/public/images/profile/graduation-portrait-retouched.jpg';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'zh' ? '张宁宁 | 统计学、优化与智能定价' : 'Ningning Zhang | Statistics, Optimization & Pricing',
    description: locale === 'zh'
      ? '张宁宁的个人主页：教育经历、研究与工作，专注统计建模、收益管理、动态定价与决策智能。'
      : 'Ningning Zhang: education, research and career in statistical modeling, revenue management, dynamic pricing and decision intelligence.',
  };
}

const timeline = [
  {
    period: '2025 –',
    mark: 'TravelSky',
    markClass: 'bg-[#e8f3ed] text-[#1d6c54]',
    text: {
      zh: '在中国航信担任博士后研究员及核心算法负责人，研究并实现民航收益管理和动态定价算法，涵盖需求预测、旅客选择模型、动态规划与仿真验证。',
      en: 'Postdoctoral researcher and algorithm lead at TravelSky, developing airline revenue management and dynamic pricing algorithms spanning demand forecasting, choice modeling, dynamic programming, and simulation.',
    },
    highlight: { zh: '中国航信', en: 'TravelSky' },
    url: '',
  },
  {
    period: '2019 – 2024',
    mark: 'HKU',
    markClass: 'bg-[#eaf0f9] text-[#204b88]',
    text: {
      zh: '在香港大学获得统计学博士学位，研究时间序列、统计建模与不确定性分析，获全额博士奖学金。',
      en: 'Ph.D. in Statistics at the University of Hong Kong, focusing on time series, statistical modeling and uncertainty analysis. Awarded a full doctoral scholarship.',
    },
    highlight: { zh: '香港大学', en: 'University of Hong Kong' },
    url: 'https://www.hku.hk/',
  },
  {
    period: '2018',
    mark: 'Meituan',
    markClass: 'bg-[#fff0dc] text-[#b86608]',
    text: {
      zh: '在美团担任算法实习生，参与外卖配送时间预测的特征工程与模型分析。',
      en: 'Algorithm intern at Meituan, working on feature engineering and model analysis for delivery-time prediction.',
    },
    highlight: { zh: '美团', en: 'Meituan' },
    url: '',
  },
  {
    period: '2017',
    mark: 'DiDi',
    markClass: 'bg-[#fff1eb] text-[#d76535]',
    text: {
      zh: '在滴滴出行担任数据分析实习生，开展供需关系分析、定价评估与实验分群。',
      en: 'Data analytics intern at DiDi, working on supply-demand analysis, pricing evaluation and experiment segmentation.',
    },
    highlight: { zh: '滴滴出行', en: 'DiDi' },
    url: '',
  },
  {
    period: '2016 – 2019',
    mark: 'BJTU',
    markClass: 'bg-[#f7e9ed] text-[#87394d]',
    text: {
      zh: '在北京交通大学获得统计学硕士学位，平均分 93.51 / 100，专业排名第一。',
      en: 'M.S. in Statistics at Beijing Jiaotong University. GPA 93.51 / 100; ranked first in the program.',
    },
    highlight: { zh: '北京交通大学', en: 'Beijing Jiaotong University' },
    url: 'https://www.bjtu.edu.cn/',
  },
  {
    period: '2012 – 2016',
    mark: 'BJTU',
    markClass: 'bg-[#f7e9ed] text-[#87394d]',
    text: {
      zh: '在北京交通大学获得信息与计算科学学士学位，建立数学、统计与计算科学基础。',
      en: 'B.S. in Information and Computing Science at Beijing Jiaotong University, building a foundation in mathematics, statistics and computing.',
    },
    highlight: { zh: '北京交通大学', en: 'Beijing Jiaotong University' },
    url: 'https://www.bjtu.edu.cn/',
  },
] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const language = locale === 'zh' ? 'zh' : 'en';
  const zh = language === 'zh';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resume = `${basePath}/Ningning_Zhang_Resume_${zh ? 'ZH' : 'EN'}.pdf`;

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#fafbfa] text-[#202b28]">
      <main className="mx-auto max-w-[1240px] px-5 pb-8 pt-6 sm:px-8 sm:pt-8">
        <div className="grid items-start gap-x-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,38%)] xl:gap-x-14">
          <div className="min-w-0">
        <header className="mb-5 border-b border-[#dce2df] pb-5">
          <div className="min-w-0">
            <h1 className="text-[29px] font-bold tracking-[-0.045em] sm:text-[34px]">
              {zh ? '张宁宁' : 'Ningning Zhang'}
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-[#52605a] sm:text-[14px]">
              {zh ? '统计学博士 · 决策智能 / 收益管理 / 动态定价' : 'Ph.D. in Statistics · Decision Intelligence / Revenue Management / Dynamic Pricing'}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-medium text-[#226b9a]">
              <a className="hover:underline" href="https://github.com/ningningzhang-nina" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <Link className="hover:underline" href={`/${locale}/papers`}>{zh ? '论文' : 'Papers'} ↗</Link>
              <Link className="hover:underline" href={`/${locale}/projects`}>{zh ? '项目' : 'Projects'} ↗</Link>
              <a className="hover:underline" href={resume}>{zh ? '简历 PDF' : 'Résumé PDF'} ↗</a>
            </div>
          </div>
        </header>

        <section aria-label={zh ? '个人经历时间线' : 'Career and education timeline'}>
          <div className="space-y-0">
            {timeline.map((item) => (
              <article key={`${item.period}-${item.mark}`} className="grid grid-cols-[77px_77px_minmax(0,1fr)] items-start gap-x-3 py-[9px] sm:grid-cols-[120px_92px_minmax(0,1fr)] sm:gap-x-5 sm:py-[11px]">
                <time className="pt-[7px] text-[12px] font-semibold leading-[18px] tabular-nums text-[#69736f] sm:text-[13px]">{item.period}</time>
                <div className={`flex h-[36px] w-[75px] items-center justify-center rounded-[4px] px-1 text-[10px] font-extrabold tracking-[-0.03em] sm:h-[43px] sm:w-[88px] sm:text-[12px] ${item.markClass}`} aria-label={item.highlight[language]}>
                  {item.mark}
                </div>
                <p className="pt-[3px] text-[13px] leading-[1.65] text-[#27302d] sm:text-[14px] sm:leading-[1.7]">
                  {item.text[language]}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#dce2df] pt-4 text-[12px] text-[#51625c]">
          <Link href={`/${locale}/about`} className="hover:underline">{zh ? '详细经历' : 'Full CV'} ↗</Link>
          <Link href={`/${locale}/blog`} className="hover:underline">{zh ? '技术文章' : 'Writing'} ↗</Link>
          <Link href={`/${locale}/travel`} className="hover:underline">{zh ? '旅行' : 'Travel'} ↗</Link>
          <a href="mailto:zhangnn0725@163.com" className="hover:underline">Email ↗</a>
        </footer>
          </div>
          <aside className="mt-7 lg:sticky lg:top-[92px] lg:mt-0" aria-label={zh ? '个人照片' : 'Portrait'}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[6px] bg-[#edf0ed] shadow-[0_10px_35px_rgba(25,41,33,0.08)] lg:max-h-[calc(100vh-120px)]">
              <Image
                src={graduationPortrait}
                alt={zh ? '张宁宁' : 'Ningning Zhang'}
                priority
                fill
                className="object-cover object-top"
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 38vw, 440px"
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
