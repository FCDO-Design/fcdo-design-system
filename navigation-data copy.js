// navigation-data.js
module.exports = {
  navItems: [
    { 
          name: 'Components', slug: 'components', url: '/design-system/components',
          children: [
            { name: 'Header', slug: 'header', url: '/design-system/components/header' },
            { name: 'Navigation', slug: 'navigation', url: '/design-system/components/navigation' },
            { name: 'Page Navigation', slug: 'page-navigation', url: '/design-system/components/page-navigation' },
            { name: 'Card', slug: 'card', url: '/design-system/components/card' },
            { name: 'Button', slug: 'button', url: '/design-system/components/button' },
            { name: 'Details', slug: 'details', url: '/design-system/components/details' }
          ]
        },
        { 
          name: 'Styles', slug: 'styles', url: '/design-system/styles',
          children: [
            { name: 'Colours', slug: 'colours', url: '/design-system/styles/colours' },
            { name: 'Typography', slug: 'typography', url: '/design-system/styles/typography' }
          ]
        },
    { 
      name: 'Design System', slug: 'design-system', url: '/design-system',
      children: [
        { 
          name: 'Overview', slug: 'design-system', url: '/design-system',
          children: [
            { name: 'Prototyping', slug: 'prototyping', url: '/design-system/prototyping' },
            { name: 'Prototyping Kit', slug: 'prototyping-kit', url: '/design-system/prototyping-kit' },
            { name: 'Prototyping Kit', slug: 'prototyping-kit', url: '/design-system/prototyping-kit' }
          ]
        },
        { 
          name: 'Styles', slug: 'styles', url: '/design-system/styles',
          children: [
            { name: 'Colours', slug: 'colours', url: '/design-system/styles/colours' },
            { name: 'Typography', slug: 'typography', url: '/design-system/styles/typography' }
          ]
        }
      ]
    },
     { name: 'Get Started', slug: 'get-started', url: '/get-started', children: [
       { 
          name: 'Overview', slug: 'get-started', url: '/get-started',
          children: [
            { name: 'Download', slug: 'download', url: '/get-started/download' },
            { name: 'Import Assets', slug: 'scss', url: '/get-started/import-assets' },
            { name: 'Using CSS', slug: 'css', url: '/get-started/css' },
            { name: 'Using Javascript', slug: 'js', url: '/get-started/javascript' }
          ]
        }
     ] },
  ]
};
