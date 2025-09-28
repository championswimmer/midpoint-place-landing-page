import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const rootDir = decodeURIComponent(projectRoot);
const distDir = path.join(rootDir, 'dist');

const baseUrl = process.env.SITE_URL || 'https://midpoint.place';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(entryPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      files.push(entryPath);
    }
  }
  return files;
}

function toUrl(filePath) {
  const rel = path.relative(distDir, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return baseUrl.replace(/\/$/, '/');
  return `${baseUrl.replace(/\/$/, '')}/${rel}`;
}

function formatDate(date) {
  return new Date(date).toISOString();
}

function generate() {
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory not found. Run build first.');
    process.exit(1);
  }

  const htmlFiles = walk(distDir);
  const urls = htmlFiles.map(fp => {
    const stat = fs.statSync(fp);
    const loc = toUrl(fp);
    const isIndex = path.basename(fp).toLowerCase() === 'index.html';
    return {
      loc,
      lastmod: formatDate(stat.mtime),
      changefreq: isIndex ? 'weekly' : 'monthly',
      priority: isIndex ? '1.0' : '0.7'
    };
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(u => [
      '  <url>',
      `    <loc>${u.loc}</loc>`,
      `    <lastmod>${u.lastmod}</lastmod>`,
      `    <changefreq>${u.changefreq}</changefreq>`,
      `    <priority>${u.priority}</priority>`,
      '  </url>'
    ].join('\n')),
    '</urlset>'
  ].join('\n');

  const outPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`Generated: ${path.relative(rootDir, outPath)} (baseUrl=${baseUrl})`);
}

generate();


