const express = require('express');
const router = express.Router();

// login route
router.get('/login.html', (req, res) => {
    res.render('login.html');
});

// home route
router.get('/', (req, res) => {
    res.render('index.html');
});

// design system route
router.get('/design-system', (req, res) => {
    res.render('design-system/index.html');
});

// benefits route
router.get('/design-system/benefits', (req, res) => {
    res.render('design-system/benefits.html');
});

// design system route
router.get('/get-started', (req, res) => {
    res.render('get-started/index.html');
});

// download route
router.get('/get-started/download', (req, res) => {
    res.render('get-started/download/index.html');
});

// import css route
router.get('/get-started/css', (req, res) => {
    res.render('get-started/css.html');
});

// import assets route
router.get('/get-started/import-assets', (req, res) => {
    res.render('get-started/import-assets.html');
});

// html template route
router.get('/get-started/html-template', (req, res) => {
    res.render('get-started/html-template.html');
});

// import javascript route
router.get('/get-started/javascript', (req, res) => {
    res.render('get-started/javascript.html');
});

// prototyping route
router.get('/design-system/prototyping', (req, res) => {
    res.render('design-system/prototyping.html');
});

// prototyping-kit route
router.get('/design-system/prototyping-kit', (req, res) => {
    res.render('design-system/prototyping-kit.html');
});

// components system route
router.get('/design-system/components', (req, res) => {
    res.render('design-system/components/index.html');
});

// components system route
router.get('/design-system/components/header', (req, res) => {
    res.render('design-system/components/header.html');
});

// navigation route
router.get('/design-system/components/navigation', (req, res) => {
    res.render('design-system/components/navigation.html');
});

// page navigation route
router.get('/design-system/components/page-navigation', (req, res) => {
    res.render('design-system/components/page-navigation.html');
});

// components footer route
router.get('/design-system/components/footer', (req, res) => {
    res.render('design-system/components/footer.html');
});

// details route
router.get('/design-system/components/details', (req, res) => {
    res.render('design-system/components/details.html');
});

// card route
router.get('/design-system/components/card', (req, res) => {
    res.render('design-system/components/card.html');
});

// button route
router.get('/design-system/components/button', (req, res) => {
    res.render('design-system/components/button.html');
});

// styles route
router.get('/design-system/styles', (req, res) => {
    res.render('design-system/styles/index.html');
});

// colours route
router.get('/design-system/styles/colours', (req, res) => {
    res.render('design-system/styles/colours.html');
});

// typography route
router.get('/design-system/styles/typography', (req, res) => {
    res.render('design-system/styles/typography.html');
});

// components route
router.get('/design-system/components', (req, res) => {
    res.render('design-system/components/index.html');
});

// default page template route
router.get('/design-system/page-templates/default', (req, res) => {
    res.render('design-system/page-templates/default.html');
});

// application page template route
router.get('/design-system/page-templates/application', (req, res) => {
    res.render('design-system/page-templates/application.html');
});

// view default page template route
router.get('/design-system/page-templates/view/default', (req, res) => {
    res.render('design-system/page-templates/view-default.html');
});

// view application page template route
router.get('/design-system/page-templates/view/application', (req, res) => {
    res.render('design-system/page-templates/view-application.html');
});

// text-input route
router.get('/design-system/components/text-input', (req, res) => {
    res.render('design-system/components/text-input.html');
});


// textarea route
router.get('/design-system/components/textarea', (req, res) => {
    res.render('design-system/components/textarea.html');
});

// checkboxes route
router.get('/design-system/components/checkboxes', (req, res) => {
    res.render('design-system/components/checkboxes.html');
});

// radio buttons router
router.get('/design-system/components/radios', (req, res) => {
    res.render('design-system/components/radios.html');
});

// select menu router
router.get('/design-system/components/select', (req, res) => {
    res.render('design-system/components/select.html');
});

// date input route
router.get('/design-system/components/date-input', (req, res) => {
    res.render('design-system/components/date-input.html');
});

// tabs route
router.get('/design-system/components/tabs', (req, res) => {
    res.render('design-system/components/tabs.html');
});

// table route
router.get('/design-system/components/table', (req, res) => {
    res.render('design-system/components/table.html');
});

// sortable table route
router.get('/design-system/components/sortable-table', (req, res) => {
    res.render('design-system/components/sortable-table.html');
});

// alert route
router.get('/design-system/components/alert', (req, res) => {
    res.render('design-system/components/alert.html');
});

// tooltip route
router.get('/design-system/components/tooltip', (req, res) => {
    res.render('design-system/components/tooltip.html');
});

module.exports = router;
