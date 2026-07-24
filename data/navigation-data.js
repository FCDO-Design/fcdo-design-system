module.exports = {
  sections: [
    {
      title: 'Building blocks',
      items: [
        {
          name: 'Components', slug: 'components', url: '/design-system/components',
          children: [
            // { name: 'About Components', slug: 'components', url: '/design-system/components' },
            { name: 'Accordion', slug: 'accordion', url: '/design-system/components/accordion' },
            { name: 'Add another', slug: 'add-another', url: '/design-system/components/add-another' },
            { name: 'Alert', slug: 'alert', url: '/design-system/components/alert' },
            { name: 'Button', slug: 'button', url: '/design-system/components/button' },
            { name: 'Card', slug: 'card', url: '/design-system/components/card' },
            { name: 'Collapsible card', slug: 'collapsible-card', url: '/design-system/components/collapsible-card' },
            { name: 'Dashboard card', slug: 'dashboard-card', url: '/design-system/components/dashboard-card' },
            { name: 'Checkboxes', slug: 'checkboxes', url: '/design-system/components/checkboxes' },
            { name: 'Data list', slug: 'data-list', url: '/design-system/components/data-list' },
            { name: 'Date input', slug: 'date-input', url: '/design-system/components/date-input' },
            { name: 'Details', slug: 'details', url: '/design-system/components/details' },
            { name: 'Footer', slug: 'footer', url: '/design-system/components/footer' },
            { name: 'Header', slug: 'header', url: '/design-system/components/header' },
            { name: 'Modal', slug: 'modal', url: '/design-system/components/modal' },
            { name: 'Navigation', slug: 'navigation', url: '/design-system/components/navigation' },
            { name: 'Page navigation', slug: 'page-navigation', url: '/design-system/components/page-navigation' },
            { name: 'Pagination', slug: 'pagination', url: '/design-system/components/pagination' },
            { name: 'Radios', slug: 'radios', url: '/design-system/components/radios' },
            { name: 'Select', slug: 'select', url: '/design-system/components/select' },
            { name: 'Searchable table', slug: 'searchable-table', url: '/design-system/components/searchable-table' },
            { name: 'Switch', slug: 'switch', url: '/design-system/components/switch' },
            { name: 'Table', slug: 'table', url: '/design-system/components/table' },
            { name: 'Tabs', slug: 'tabs', url: '/design-system/components/tabs' },
            { name: 'Text input', slug: 'text-input', url: '/design-system/components/text-input' },
            { name: 'Textarea', slug: 'textarea', url: '/design-system/components/textarea' },
            { name: 'Tooltip', slug: 'tooltip', url: '/design-system/components/tooltip' },
            { name: 'Utility navigation', slug: 'utility-navigation', url: '/design-system/components/utility-navigation' },
          ]
        },
        {
          name: 'Layout', slug: 'layout', url: '/design-system/layout',
          children: [
            { name: 'Grid system', slug: 'grid', url: '/design-system/layout/grid' }
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
          name: 'Page Templates', slug: 'page-templates', url: '/design-system/page-templates',
          children: [
            { name: 'Default template', slug: 'default', url: '/design-system/page-templates/default' },
            { name: 'Application template', slug: 'application', url: '/design-system/page-templates/application' },
          ]
        }
      ]
    },
    {
      title: 'Getting started',
      items: [
        {
          name: 'Download', slug: 'download', url: '/get-started/download',
        },
        {
          name: 'Importing assets',
          children: [
            { name: 'Copying Files', slug: 'assets', url: '/get-started/copying-files' },
            { name: 'Using CSS and JavaScript', slug: 'css', url: '/get-started/css-and-javascript' },
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
