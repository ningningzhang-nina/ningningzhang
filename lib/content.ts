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
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
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
  };
}

export function getAllPapers(): Paper[] {
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
      } as LifePost;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
