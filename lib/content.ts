import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  readingTime?: string;
  externalUrl?: string;
}

export interface Paper {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  doi?: string;
  pdf?: string;
  featured?: boolean;
  citations?: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
  year: number;
}

export interface LifePost {
  slug: string;
  title: string;
  date: string;
  content: string;
  images?: string[];
  tags: string[];
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${mins}`;
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

export function getAllPosts(locale: string): Post[] {
  const dir = path.join(contentDir, 'blog', locale);
  const files = readDir(dir);

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(md|mdx)$/, '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        tags: data.tags ?? [],
        summary: data.summary ?? '',
        content,
        readingTime: estimateReadingTime(content),
        externalUrl: data.externalUrl as string | undefined,
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllBlogTags(locale: string): string[] {
  const posts = getAllPosts(locale);
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(locale: string, tag: string): Post[] {
  return getAllPosts(locale).filter((p) => p.tags.includes(tag));
}

export function getPostBySlug(locale: string, slug: string): Post | null {
  const filePath = path.join(contentDir, 'blog', locale, `${slug}.mdx`);
  const fallback = path.join(contentDir, 'blog', locale, `${slug}.md`);
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null;
  if (!target) return null;

  const raw = fs.readFileSync(target, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: data.tags ?? [],
    summary: data.summary ?? '',
    content,
    readingTime: estimateReadingTime(content),
    externalUrl: data.externalUrl as string | undefined,
  };
}

export function getAllPapers(): Paper[] {
  // 从单个 papers.md 文件读取所有论文
  const singleFile = path.join(contentDir, 'papers.md');
  if (fs.existsSync(singleFile)) {
    const raw = fs.readFileSync(singleFile, 'utf8');
    const { data } = matter(raw);
    const list: Paper[] = (data.papers ?? []).map((p: Record<string, unknown>, i: number) => ({
      slug: `paper-${i}`,
      title: p.title ?? '',
      authors: p.authors ?? '',
      venue: p.venue ?? '',
      year: p.year ?? 2024,
      abstract: p.abstract ?? '',
      doi: p.doi as string | undefined,
      pdf: p.pdf as string | undefined,
      featured: p.featured ?? false,
      citations: p.citations as number | undefined,
    }));
    return list.sort((a, b) => b.year - a.year);
  }

  // 兼容旧的多文件模式
  const dir = path.join(contentDir, 'papers');
  const files = readDir(dir);
  return files
    .map((filename) => {
      const slug = filename.replace(/\.(md|mdx)$/, '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        authors: data.authors ?? '',
        venue: data.venue ?? '',
        year: data.year ?? 2024,
        abstract: data.abstract ?? content.slice(0, 200),
        doi: data.doi,
        pdf: data.pdf,
        featured: data.featured ?? false,
      } as Paper;
    })
    .sort((a, b) => b.year - a.year);
}

export function getAllProjects(): Project[] {
  const dir = path.join(contentDir, 'projects');
  const files = readDir(dir);

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(md|mdx)$/, '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        tags: data.tags ?? [],
        github: data.github,
        demo: data.demo,
        image: data.image,
        featured: data.featured ?? false,
        year: data.year ?? 2024,
      } as Project;
    })
    .sort((a, b) => b.year - a.year);
}

export function getAllLifePosts(): LifePost[] {
  const dir = path.join(contentDir, 'life');
  const files = readDir(dir);

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(md|mdx)$/, '');
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        content,
        images: data.images ?? [],
        tags: data.tags ?? [],
      } as LifePost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLifePostBySlug(slug: string): LifePost | null {
  const dir = path.join(contentDir, 'life');
  const filePath = path.join(dir, `${slug}.md`);
  const fallback = path.join(dir, `${slug}.mdx`);
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null;
  if (!target) return null;

  const raw = fs.readFileSync(target, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    content,
    images: data.images ?? [],
    tags: data.tags ?? [],
  };
}

export function getAllLifeTags(): string[] {
  const posts = getAllLifePosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getLifePostsByTag(tag: string): LifePost[] {
  return getAllLifePosts().filter((p) => p.tags.includes(tag));
}
