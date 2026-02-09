const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const { sections } = require('./navigation-data');


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

const pageRoutes = require('./routes/routes');
app.use('/', pageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
