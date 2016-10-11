export default {
  user: {
    _id: '',
    name: '',
    email: '',
    workplace: {
      _id: '',
      name: ''
    },
    provider: {
      _id: '',
      name: ''
    },
    lastSessionDate: new Date()
  },
  config: {
    topbar: {
      autoRun: true,
      barThickness: 5,
      barColors: {
        '0': 'rgba(255, 255, 255, 0.3)',
        '0.5': 'rgba(255, 255, 255, 0.6)',
        '1.0': 'rgba(255, 255, 255, 0.99)'
      },
      shadowBlur: 7,
      shadowColor: 'rgba(0, 0, 0, .99)'
    },
    pagination: {
      limit: 10,
      currentPag: 1,
      total: 0
    }
  }
}
