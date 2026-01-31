import { source } from '@/lib/source';
import {
  DocsPage,
  DocsDescription,
  DocsTitle,
  DocsBody,
} from 'fumadocs-ui/page';
import { getMDXComponents } from '@/mdx-components';
import { notFound } from 'next/navigation';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page = source.getPage(slug);
  if (!page?.data?.body) notFound();

  const MDX = page.data.body;
  const components = getMDXComponents();

  return (
    <DocsPage toc={page.data.toc} full>
      <DocsTitle>{page.data.title}</DocsTitle>
      {page.data.description && (
        <DocsDescription>{page.data.description}</DocsDescription>
      )}
      <DocsBody>
        <MDX components={components} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
