module.exports = {
  sections: [
    {
      title: 'Building Blocks',
      items: [
        { 
          name: 'Components', slug: 'components', url: '/design-system/components',
          children: [
            { name: 'About Components', slug: 'components', url: '/design-system/components' },
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
          name: 'Patterns', slug: 'patterns', url: '/design-system/patterns',
          children: [
            { name: 'Phone Numbers', slug: 'phone-numbers', url: '#' },
            { name: 'Address', slug: 'address', url: '#' }
          ]
        },
         { 
          name: 'Pages', slug: 'pages', url: '/design-system/pages',
          children: [
            { name: 'Internal Application', slug: 'application', url: '#' },
          ]
        }
      ]
    },
    {
      title: 'Getting Started',
      items: [
        { 
          name: 'Download', slug: 'download', url: '/get-started/download',
        },
        { 
          name: 'Importing Assets',
          children: [
            { name: 'Copying Files', slug: 'assets', url: '/get-started/import-assets'},
            { name: 'Using CSS', slug: 'css', url: '/get-started/css'},
            { name: 'Using JavaScript', slug: 'javascript', url: '/get-started/javascript' },
            { name: 'Use Template', slug: 'html-template', url: '/get-started/html-template' },
          ]
        },
      ]
    },
    {
      title: 'About the Design System',
      items: [
        { 
          name: 'Overview', slug: 'overview', url: '/design-system',
        },
        {
        name: 'Benefits', slug: 'benefits', url: '/design-system/benefits',
        }
      ]
    }
  ]
};
