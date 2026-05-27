import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seoPage = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/seoPages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(120).max(165),
    priorityKeyword: z.string(),
    funnelStage: z.enum(['awareness', 'consideration', 'conversion']),
    canonicalPath: z.string().startsWith('/'),
    owner: z.string(),
    status: z.enum(['draft', 'ready', 'published']),
  }),
});

const caseStudy = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/caseStudies' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(80),
    industry: z.string(),
    result: z.string(),
    publishDate: z.coerce.date(),
  }),
});

const orderlyzePage = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content-source/orderlyze.com' }),
  schema: z.object({
    source_url: z.string().min(1),
    title: z.string(),
    description: z.string().optional(),
    scraped_at: z.string(),
  }),
});

export const collections = {
  seoPages: seoPage,
  caseStudies: caseStudy,
  orderlyzePages: orderlyzePage,
};
