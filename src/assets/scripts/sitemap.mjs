import fs from "fs";
import path from "path";

const changefreq = "weekly";
const url = "https://mraddict.one";
const lastmod = new Date().toISOString();

const sitemap = [
  { loc: "/", lastmod, changefreq, priority: "1", },
  { loc: "/blog/", lastmod, changefreq, priority: "1", },
  { loc: "/tools/", lastmod, changefreq, priority: "1", },
  { loc: "/gists/", lastmod, changefreq, priority: "1", },
  { loc: "/signup/", lastmod, changefreq, priority: "1", },
  { loc: "/projects/", lastmod, changefreq, priority: "1", },
  { loc: "/dashboard/", lastmod, changefreq, priority: "1", },
  { loc: "/commits/", lastmod, changefreq, priority: "0.8", },
  { loc: "/feedback/", lastmod, changefreq, priority: "0.8", },
  { loc: "/packages/", lastmod, changefreq, priority: "0.8", },
];

const mapSitemapString = sitemap.map((site) =>
  `
  <url>
    <loc>${url + site.loc}</loc>
    <lastmod>${site.lastmod}</lastmod>
    <changefreq>${site.changefreq}</changefreq>
    <priority>${site.priority}</priority>
  </url>`).join("\n")

const sitemapString = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${mapSitemapString}
</urlset>`;

const writePath = path.join(process.cwd(), "public/sitemap.xml");
fs.writeFileSync(writePath, sitemapString);
