// build.js
require("dotenv").config();
console.log("Loaded password:", process.env.SITE_PASSWORD);
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const crypto = require("crypto");
const archiver = require("archiver");

// login and password protection
const password = process.env.SITE_PASSWORD;

if (!password) {
  console.error("❌ SITE_PASSWORD is not set.");
  process.exit(1);
}
// generate SHA-256 hash
const hash = crypto
  .createHash("sha256")
  .update(password)
  .digest("hex");



// import navigation data
const navigationData = require('../data/navigation-data');
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

// paths
const TEMPLATE_DIR = path.join(__dirname, "..", 'views');
const OUTPUT_DIR = path.join(__dirname, "..", 'dist');
const ASSETS_SRC = path.join(__dirname, "..", 'assets');
const ASSETS_DEST = path.join(OUTPUT_DIR, 'assets');

// clean output folder
fse.emptyDirSync(OUTPUT_DIR);

// configure nunjucks
const env = nunjucks.configure(TEMPLATE_DIR, {
  noCache: true,
  autoescape: true
});

// recursively walk the views directory to get all html files
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

const pages = getAllHtmlFiles(TEMPLATE_DIR).filter(file =>
  !['layout-page-template.html', 'layout.html'].includes(path.basename(file))
);

// render all pages
pages.forEach(relPath => {
  const outputPath = path.join(OUTPUT_DIR, relPath);

  // build url  path for this page (windows-safe, remove index/.html)
  let urlPath = '/' + relPath.replace(/\\/g, '/');
  urlPath = urlPath.replace(/index\.html$/, ''); // remove index.html
  urlPath = urlPath.replace(/\.html$/, '');      // remove .html
  if (urlPath === '') urlPath = '/';
  if (urlPath.length > 1 && urlPath.endsWith('/')) urlPath = urlPath.slice(0, -1);

  // determine top-level section from first path segment
  const sectionSlug = urlPath.split('/')[1] || 'home';

  // find current nav item if it exists
  let currentNavItem;
  navItemsArray.forEach(section => {
    if (section.items) {
      const match = section.items.find(item => item.slug === sectionSlug);
      if (match) currentNavItem = match;
    }
  });

  const hasSubmenus = !!(currentNavItem && currentNavItem.children && currentNavItem.children.length);

  // render page with nunjucks
  const rendered = env.render(relPath, {
    sections: navItemsArray, // your template expects `sections`
    pageSection: sectionSlug, // used to set mainItem
    currentPath: urlPath,     // used for active checks
    hasSubmenus,
    passwordHash: hash,
  });

  fse.ensureDirSync(path.dirname(outputPath));
  fs.writeFileSync(outputPath, rendered);

  console.log(`Rendered: ${relPath} (section: ${sectionSlug}, path: ${urlPath})`);
});

// copy assets (skip scss)
fse.copySync(ASSETS_SRC, ASSETS_DEST, {
  filter: src => !src.includes(path.join('assets', 'scss'))
});

const dist = path.join(__dirname, "..", "dist/get-started/download");
fse.ensureDirSync(dist);

const zipFile = path.join(dist, "fcdo-frontend.zip");
const output = fs.createWriteStream(zipFile);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);

output.on("close", () => {
  console.log(`Created ${zipFile} (${archive.pointer()} bytes)`);
});

archive.on("error", err => { throw err; });

// Add files from project root
archive.file(
  path.join(__dirname, "..", "assets/css/fcdo-frontend.min.css"),
  { name: "stylesheets/fcdo-frontend.min.css" }
);

archive.file(
  path.join(__dirname, "..", "assets/javascript/fcdo-frontend.min.js"),
  { name: "javascript/fcdo-frontend.min.js" }
);

archive.finalize();

console.log('✅ Site built in /dist');
