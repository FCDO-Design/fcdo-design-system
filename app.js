const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const { sections } = require('./data/navigation-data');

const app = express();
const PORT = 3000;

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use((req, res, next) => {
  const sectionSlug = req.path.split('/')[1] || 'home';
  res.locals.pageSection = sectionSlug;
  res.locals.currentPath = req.path;
  res.locals.sections = sections; // <-- updated

  // Find the section and nav item
  let currentNavItem;
  for (const sec of sections) {
    currentNavItem = sec.items.find(item => item.slug === sectionSlug);
    if (currentNavItem) break;
  }

  res.locals.hasSubmenus = currentNavItem?.children?.length > 0;
  next();
});

const fs = require('fs');
const designSystemRoot = __dirname;
const frontEndRoot = path.join(__dirname, "fcdo-frontend");

app.use((req, res, next) => {
  res.locals.componentLastUpdated = (htmlFilePath, scssFilePath) => {

    const htmlPath = path.join(
      designSystemRoot,
      "views/includes",
      htmlFilePath
    );

    const scssPath = path.join(
      frontEndRoot,
      scssFilePath
    );

    const htmlStat = fs.existsSync(htmlPath)
      ? fs.statSync(htmlPath)
      : null;

    const scssStat = fs.existsSync(scssPath)
      ? fs.statSync(scssPath)
      : null;

    // pick the most recently modified file + track source
    let latestStat = null;
    let source = null;

    if (htmlStat && scssStat) {
      if (htmlStat.mtime > scssStat.mtime) {
        latestStat = htmlStat;
        source = "HTML";
      } else {
        latestStat = scssStat;
        source = "SCSS";
      }
    } else if (htmlStat) {
      latestStat = htmlStat;
      source = "HTML";
    } else if (scssStat) {
      latestStat = scssStat;
      source = "SCSS";
    }

    if (!latestStat) return null;

    // (keep your logs if you want — but avoid repeated statSync calls)
    console.log("HTML PATH:", htmlPath);
    console.log("HTML TIME:", htmlStat?.mtime);
    console.log("SCSS PATH:", scssPath);
    console.log("SCSS TIME:", scssStat?.mtime);

    return `${latestStat.mtime.toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit"
      // })} (${source})`;
    })})`;
  };

  next();
});

const pageRoutes = require('./routes/routes');
app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
