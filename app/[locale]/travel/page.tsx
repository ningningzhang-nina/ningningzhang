import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import TravelGallery from '@/components/TravelGallery';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'travel' });
  return { title: t('title') };
}

const travelGroups = [
  {
    key: 'beijing',
    title: { zh: '北京', en: 'beijing' },
    date: { zh: '2026年3月', en: 'Mar 2026' },
    images: ['IMG_20260309_181804.jpeg'],
  },
  {
    key: 'hong-kong',
    title: { zh: '香港', en: 'Hong Kong' },
    date: { zh: '2022-2025', en: '2022-2025' },
    images: [
      'IMG_5387.jpeg',
      'IMG_6627.jpeg',
      'IMG_5618.jpeg',
      'IMG_0023.jpeg',
      'IMG_2470.jpeg',
      'IMG_0106.jpeg',
      'IMG_1860.jpeg',
      'IMG_1882.jpeg',
    ],
  },
  {
    key: 'chengdu',
    title: { zh: '成都', en: 'Chengdu' },
    date: { zh: '2024年12月', en: 'Dec 2024' },
    images: ['IMG_6088.jpeg', 'IMG_6044.jpeg', 'IMG_5969.jpeg'],
  },
  {
    key: 'yuyuantan-2019',
    title: { zh: '2019年在玉渊潭公园', en: 'Yuyuantan Park, 2019' },
    date: { zh: '2019年', en: '2019' },
    images: ['yuyuantan-2019.jpeg'],
  },
] as const;

export default async function TravelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'travel' });
  const l = locale as 'zh' | 'en';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-12 border-b border-[#e4e9f1] pb-10">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8a7444]">Travel</p>
        <h1 className="mb-3 text-[40px] font-semibold text-[#0f2742]">{t('title')}</h1>
        <p className="max-w-2xl text-[16px] leading-7 text-[#66758a]">{t('subtitle')}</p>
      </div>

      <div className="space-y-16">
        {travelGroups.map((group) => (
          <section key={group.key}>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[26px] font-semibold text-[#0f2742]">{group.title[l]}</h2>
                <p className="mt-1 text-[13px] font-medium text-[#8a7444]">{group.date[l]}</p>
              </div>
              <div className="h-px flex-1 bg-[#e4e9f1]" />
            </div>

            <TravelGallery
              images={group.images.map((image, index) => ({
                src: `${basePath}/images/travel/${image}`,
                alt: `${group.title[l]} ${index + 1}`,
              }))}
            />
          </section>
        ))}
      </div>
    </div>
  );
}
