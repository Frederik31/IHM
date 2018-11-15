module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'tree',
    icon: 'fa fa-dashboard',
    name: 'Planning',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Par tache',
        router: {
          name: 'TaskPlanning'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Par MSN',
        router: {
          name: 'MSNPlanning'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-pie-chart',
    name: 'Dashboard',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Dashboard',
        router: {
          name: 'Dashboard'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Prediction Day',
        router: {
          name: 'Prediction'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Prediction Week',
        router: {
          name: 'Prediction2'
        }
      }
    ]
  }
]
