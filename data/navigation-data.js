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
            { name: 'Details', slug: 'details', url: '/design-system/components/details' },
            { name: 'Footer', slug: 'footer', url: '/design-system/components/footer' },
            { name: 'Card', slug: 'card', url: '/design-system/components/card' },
            { name: 'Button', slug: 'button', url: '/design-system/components/button' },
            { name: 'Text Input', slug: 'text-input', url: '/design-system/components/text-input' },
            { name: 'Textarea', slug: 'textarea', url: '/design-system/components/textarea' },
            { name: 'Date Input', slug: 'date-input', url: '/design-system/components/date-input' },
            { name: 'Radios', slug: 'radios', url: '/design-system/components/radios' },
            { name: 'Select', slug: 'select', url: '/design-system/components/select' },
            { name: 'Checkboxes', slug: 'checkboxes', url: '/design-system/components/checkboxes' }
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
          name: 'Page Templates', slug: 'page-templates', url: '/design-system/page-templates',
          children: [
            { name: 'Default Template', slug: 'default', url: '/design-system/page-templates/default' },
            { name: 'Application Template', slug: 'application', url: '/design-system/page-templates/application' },
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
