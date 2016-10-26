export default {
  user: {
    _id: '57dc4b610c2468fc18fa618c',
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
    spinner: {
      lines: 11, // The number of lines to draw
      length: 5, // The length of each line
      width: 4, // The line thickness
      radius: 8, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      scale: 1,
      color: '#3273dc', // #rgb or #rrggbb or array of colors
      opacity: 0.1, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1.1, // Rounds per second
      trail: 50, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      position: 'absolute' // Element positioning
    },
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
    },
    APIURIBase: 'http://localhost:5000/',
    grid: {
      delayLoading: 250,
      textCropLength: 40
    },
    modal: {
      delayApplyRule: 250,
      delayModalSaveButton: 800,
      messagePresentationTime: 4000
    }
  }
}
