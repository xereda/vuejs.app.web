export default {
  user: {
    _id: '58124f84c5560561f8e2dfbf',
    name: '',
    email: '',
    workplace: {
      _id: '',
      name: 'Administrador (DocMob)'
    },
    provider: {
      _id: '',
      name: 'Jackson Ricardo Schroeder'
    },
    lastSessionDate: new Date()
  },
  config: {
    adminUserId: '58124f84c5560561f8e2dfbf',
    modules: [
      { route: '/professionalActivities', name: 'professionalActivities', label: 'Ramos de Atividade' },
      { route: '/specialties', name: 'specialties', label: 'Especializações' },
      { route: '/users', name: 'users', label: 'Usuários' },
      { route: '/healthInsurances', name: 'healthInsurances', label: 'Planos de Saúde' },
      { route: '/operators', name: 'operators', label: 'Operadoras' },
      { route: '/cities', name: 'cities', label: 'Cidades' },
      { route: '/people', name: 'people', label: 'Pessoas' },
      { route: '/holidays', name: 'holidays', label: 'Feriados' }
    ],
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
    // APIURIBase: 'http://docmob.com.br:5000/',
    APIURIBase: 'http://localhost:5000/',
    grid: {
      delayLoading: 250,
      textCropLength: 40
    },
    modal: {
      delayApplyRule: 250,
      delayModalSaveButton: 800,
      messagePresentationTime: 4000
    },
    fullCalendar: {
      locales: {
        ptbr: {
          weekNames: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
          monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
          titleFormat: 'MMMM/yyyy'
        }
      }
    }
  }
}
