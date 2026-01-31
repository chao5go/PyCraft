// 文档搜索 API：直接用 source 做包含匹配（稳定支持中文）
import { NextRequest } from 'next/server';
import { source } from '@/lib/source';

/** 按标题、描述、标题/正文文本做包含匹配，返回与 fumadocs 一致的 { id, type, content, url }[] */
function searchDocs(query: string): { id: string; type: string; content: string; url: string }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const pages = source.getPages();
  const out: { id: string; type: string; content: string; url: string }[] = [];
  for (const page of pages) {
    const data = page.data as {
      title?: string;
      description?: string;
      structuredData?: { headings: { id: string; content: string }[]; contents: { content: string }[] };
    };
    const title = ((data?.title) ?? '').toLowerCase();
    const desc = ((data?.description) ?? '').toLowerCase();
    const headings = data?.structuredData?.headings ?? [];
    const contents = data?.structuredData?.contents ?? [];
    const allText = [title, desc, ...headings.map((h) => h.content), ...contents.map((c) => c.content)]
      .join(' ')
      .toLowerCase();
    if (!allText.includes(q)) continue;
    out.push({ id: page.url, type: 'page', content: data?.title ?? '', url: page.url });
    for (const h of headings) {
      if (h.content.toLowerCase().includes(q))
        out.push({ id: `${page.url}#${h.id}`, type: 'heading', content: h.content, url: `${page.url}#${h.id}` });
    }
  }
  return out.slice(0, 25);
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query') ?? '';
  const results = searchDocs(query);
  return Response.json(results);
}
