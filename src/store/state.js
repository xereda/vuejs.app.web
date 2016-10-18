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
    delayLoading: 250,
    veeValidate: {
      messages: {
        after: (field, [target]) => `O campo ${field} deve estar depois do campo ${target}.`,
        alpha_dash: (field) => `O campo ${field} deve conter letras, números e traços.`,
        alpha_num: (field) => `O campo ${field} deve conter somente letras e números.`,
        alpha: (field) => `O campo ${field} deve conter somente letras.`,
        before: (field, [target]) => `O campo ${field} deve estar antes do campo ${target}.`,
        between: (field, [min, max]) => `O campo ${field} deve estar entre ${min} e ${max}.`,
        confirmed: (field, [confirmedField]) => `O campo ${field} e ${confirmedField} devem ser iguais.`,
        date_between: (field, [min, max]) => `O campo ${field} deve estar entre ${min} e ${max}.`,
        date_format: (field, [format]) => `O campo ${field} deve estar no formato ${format}.`,
        decimal: (field, [decimals] = ['*']) => `O campo ${field} deve ser numérico e deve conter ${decimals === '*' ? '' : decimals} casas decimais.`,
        digits: (field, [length]) => `O campo ${field} deve ser numérico e ter ${length} dígitos.`,
        dimensions: (field, [width, height]) => `O campo ${field} deve ter ${width} pixels de largura por ${height} pixels de altura.`,
        email: (field) => `O campo ${field} deve ser um email válido.`,
        ext: (field) => `O campo ${field} deve ser um arquivo válido.`,
        image: (field) => `O campo ${field} deve ser uma imagem.`,
        in: (field) => `O campo ${field} deve ter um valor válido.`,
        ip: (field) => `O campo ${field} deve ser um endereço IP válido.`,
        max: (field, [length]) => `O campo ${field} não deve ter mais que ${length} caracteres.`,
        mimes: (field) => `O campo ${field} deve ser um tipo de arquivo válido.`,
        min: (field, [length]) => `O campo ${field} deve conter pelo menos ${length} caracteres.`,
        not_in: (field) => `O campo ${field} deve ser um valor válido.`,
        numeric: (field) => `O campo ${field} deve conter apenas números`,
        regex: (field) => `O campo ${field} possui um formato inválido.`,
        required: (field) => `O campo ${field} é obrigatório.`,
        size: (field, [size]) => `O campo ${field} deve ser menor que ${size} KB.`,
        url: (field) => `O campo ${field} não é uma URL válida.`
      }
    }
  }
}
