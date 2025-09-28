import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const rootDir = decodeURIComponent(projectRoot);
const distDir = path.join(rootDir, 'dist');
const seoSrcDir = path.join(rootDir, 'seo');

function assertPaths() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }
  if (!fs.existsSync(seoSrcDir)) {
    fs.mkdirSync(seoSrcDir, { recursive: true });
  }
}

function readBaseTemplate() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  const html = fs.readFileSync(indexHtmlPath, 'utf8');
  const headMatch = html.match(/<head>[\s\S]*?<\/head>/i);
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
  const scripts = [];
  const scriptRegex = /<script[\s\S]*?<\/script>/gi;
  let m;
  while ((m = scriptRegex.exec(html)) !== null) {
    scripts.push(m[0]);
  }
  return {
    head: headMatch ? headMatch[0] : '<head></head>',
    header: headerMatch ? headerMatch[0] : '',
    footer: footerMatch ? footerMatch[0] : '',
    scripts: scripts.join('\n')
  };
}

function buildPage({ frontmatter, contentHtml }, base) {
  const title = frontmatter.title || 'midpoint.place';
  const description = frontmatter.desc || frontmatter.description || '';
  const keywords = frontmatter.keywords || '';
  const ogImage = frontmatter.ogimage || frontmatter.og_image || frontmatter.ogImage || '';

  // Inject meta tags into head
  let head = base.head
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  const metaTags = [
    description ? `<meta name="description" content="${escapeHtml(description)}" />` : '',
    keywords ? `<meta name="keywords" content="${escapeHtml(Array.isArray(keywords) ? keywords.join(', ') : keywords)}" />` : '',
    ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}" />` : '',
    frontmatter.ogTitle ? `<meta property="og:title" content="${escapeHtml(frontmatter.ogTitle)}" />` : '',
    frontmatter.ogDescription ? `<meta property="og:description" content="${escapeHtml(frontmatter.ogDescription)}" />` : ''
  ].filter(Boolean).join('\n    ');

  head = head.replace(/<\/head>/i, `  ${metaTags}\n  </head>`);

  const article = `\n      <main class="container seo-page">\n        <article class="seo-article">\n          ${contentHtml}\n        </article>\n      </main>\n  `;

  const body = [
    base.header,
    article,
    base.footer,
    base.scripts
  ].join('\n\n');

  return `<!DOCTYPE html>\n<html lang="en">\n${head}\n  <body>\n${body}\n  </body>\n</html>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generate() {
  assertPaths();
  const base = readBaseTemplate();

  const files = fs.readdirSync(seoSrcDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(seoSrcDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const html = marked.parse(parsed.content);
    const page = buildPage({ frontmatter: parsed.data, contentHtml: html }, base);
    const outName = file.replace(/\.md$/i, '.html');
    const outPath = path.join(distDir, outName);
    fs.writeFileSync(outPath, page, 'utf8');
    console.log(`Generated: ${path.relative(rootDir, outPath)}`);
  }
}

generate();


