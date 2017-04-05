export default {
  modules: [
    { menuHidden: false, route: 'scheduleDefinitions', name: 'scheduleDefinitions', label: 'Definição de agenda', adminOnly: false, active: true, icon: 'fa fa-calendar-check-o' },
    { menuHidden: true, route: 'scheduleDefinitions.generator', name: 'scheduleDefinitions.generator', label: 'Gerar definições', adminOnly: false, active: true, icon: 'fa fa-calendar-check-o' },
    { menuHidden: false, route: 'schedule', name: 'schedule', label: 'Agenda', adminOnly: false, active: true, icon: 'fa fa-calendar' }
  ]
}
