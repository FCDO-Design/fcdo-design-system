// build.js

const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

// --- Import navigation data
const navigationData = require('./navigation-data');
const navItemsArray = Array.isArray(navigationData)
  ? navigationData
  : navigationData && Array.isArray(navigationData.navItems)
    ? navigationData.navItems
    : navigationData && Array.isArray(navigationData.sections)
      ? navigationData.sections
      : null;

if (!Array.isArray(navItemsArray)) {
  throw new Error(
    "navigation-data.js must export either an array, { navItems: [...] }, or { sections: [...] }"
  );
}

// Paths
const TEMPLATE_DIR = path.join(__dirname, 'views');
const OUTPUT_DIR = path.join(__dirname, 'dist');
const ASSETS_SRC = path.join(__dirname, 'assets');
const ASSETS_DEST = path.join(OUTPUT_DIR, 'assets');

// Clean output folder
fse.emptyDirSync(OUTPUT_DIR);

// Configure Nunjucks
const env = nunjucks.configure(TEMPLATE_DIR, {
  noCache: true,
  autoescape: true
});

// Recursively walk the views directory to get all HTML files
function getAllHtmlFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const relPath = path.join(base, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath, relPath));
    } else if (file.endsWith('.html')) {
      results.push(relPath);
    }
  });

  return results;
}

const pages = getAllHtmlFiles(TEMPLATE_DIR);

// Render all pages
pages.forEach(relPath => {
  const outputPath = path.join(OUTPUT_DIR, relPath);

  // Build URL path for this page (Windows-safe, remove index/.html)
  let urlPath = '/' + relPath.replace(/\\/g, '/');
  urlPath = urlPath.replace(/index\.html$/, ''); // remove index.html
  urlPath = urlPath.replace(/\.html$/, '');      // remove .html
  if (urlPath === '') urlPath = '/';
  if (urlPath.length > 1 && urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1);

  // Determine top-level section from first path segment
  const sectionSlug = urlPath.split('/')[1] || 'home';

  // Find current nav item if it exists
  let currentNavItem;
  navItemsArray.forEach(section => {
    if (section.items) {
      const match = section.items.find(item => item.slug === sectionSlug);
      if (match) currentNavItem = match;
    }
  });

  const hasSubmenus = !!(currentNavItem && currentNavItem.children && currentNavItem.children.length);

  // Render page with Nunjucks
  const rendered = env.render(relPath, {
    sections: navItemsArray, // your template expects `sections`
    pageSection: sectionSlug, // used to set mainItem
    currentPath: urlPath,     // used for active checks
    hasSubmenus
  });

  fse.ensureDirSync(path.dirname(outputPath));
  fs.writeFileSync(outputPath, rendered);

  console.log(`Rendered: ${relPath} (section: ${sectionSlug}, path: ${urlPath})`);
});

// Copy assets (skip SCSS)
fse.copySync(ASSETS_SRC, ASSETS_DEST, {
  filter: src => !src.includes(path.join('assets', 'scss'))
});

console.log('✅ Site built in /dist');
