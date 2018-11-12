module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'item',
    icon: 'fa fa-dashboard',
    name: 'Planning',
    router: {
      name: 'Planning'
    }
  },
  {
    type: 'item',
    icon: 'fa fa-pie-chart',
    name: 'Dashboard',
    router: {
      name: 'Modals'
    }
  },
  {
    type: 'tree',
    icon: 'fa fa-table',
    name: 'Dashboard',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Configuration',
        router: {
          name: 'WidgetsExample'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'APIExample',
        router: {
          name: 'APIExample'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-files-o',
    name: 'Layout Options',
    badge: {
      type: 'Number',
      data: 4
    },
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Top Navigation',
        link: 'page/layout/top-nav.html'
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Boxed',
        link: 'page/layout/boxed.html'
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Fixed',
        link: 'page/layout/fixed.html'
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Collapsed Sidebar',
        link: 'page/layout/collapsed-sidebar.html'
      }
    ]
  },
  {
    type: 'item',
    icon: 'fa fa-th',
    name: 'Widgets',
    badge: {
      type: 'String',
      data: 'new'
    },
    router: {
      name: 'WidgetsExample'
    }
  },
  {
    type: 'tree',
    icon: 'fa fa-laptop',
    name: 'UI Elements',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'General',
        router: {
          name: 'General'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Icons',
        router: {
          name: 'Icons'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Buttons',
        router: {
          name: 'Buttons'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Sliders',
        router: {
          name: 'Sliders'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Timeline',
        router: {
          name: 'Timeline'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Modals',
        router: {
          name: 'Modals'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-edit',
    name: 'Forms',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'General Elements',
        router: {
          name: 'GeneralElements'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Advanced Elements',
        router: {
          name: 'AdvancedElements'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Editors',
        link: 'pages/forms/editors.html'
      }
    ]
  }
]
