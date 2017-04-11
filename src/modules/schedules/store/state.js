export default {
  modules: [
    { menuHidden: false, route: 'scheduleDefinitions', name: 'scheduleDefinitions', label: 'Definição de agenda', adminOnly: false, active: true, icon: 'fa fa-calendar-check-o' },
    { menuHidden: true, route: 'scheduleDefinitions.generator', name: 'scheduleDefinitions.generator', label: 'Gerar definições', adminOnly: false, active: true, icon: 'fa fa-calendar-check-o' },
    { menuHidden: true, route: 'scheduleDefinitions.rules', name: 'scheduleDefinitions.rules', label: 'Lista de regras', adminOnly: false, active: true, icon: 'fa fa-calendar-check-o' },
    { menuHidden: false, route: 'schedule', name: 'schedule', label: 'Agenda', adminOnly: false, active: true, icon: 'fa fa-calendar' }
  ],
  agreementsColorClasses: [
    { class: 'is-light', agreementName: 'PARTICULAR' },
    { class: 'is-success', agreementName: 'UNIMED' },
    { class: 'is-danger', agreementName: 'AGEMED' },
    { class: 'tag-bradesco', agreementName: 'BRADESCO' },
    { class: 'is-warning', agreementName: 'AMIL' },
    { class: 'tag-uniodonto', agreementName: 'UNIODONTO' },
    { class: 'tag-cassi', agreementName: 'CASSI' }
  ]
}
