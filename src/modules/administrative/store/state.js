export default {
  modules: [
    { route: 'admin', name: 'admin', label: 'Admin', adminOnly: false, active: true, icon: 'fa fa-list' },
    { route: 'professionalActivities', name: 'professionalActivities', label: 'Ramos de Atividade', adminOnly: true, active: true, icon: 'fa fa-list' },
    { route: 'specialties', name: 'specialties', label: 'Especializações', adminOnly: true, active: true, icon: 'fa fa-user-md' },
    { route: 'users', name: 'users', label: 'Usuários', adminOnly: true, active: true, icon: 'fa fa-users' },
    { route: 'agreements', name: 'agreements', label: 'Convênios', adminOnly: true, active: true, icon: 'fa fa-handshake-o' },
    { route: 'operators', name: 'operators', label: 'Operadoras', adminOnly: true, active: true, icon: 'fa fa-credit-card' },
    { route: 'cities', name: 'cities', label: 'Cidades', adminOnly: true, active: true, icon: 'fa fa-map-marker' },
    { route: 'people', name: 'people', label: 'Pessoas', adminOnly: false, active: true, icon: 'fa fa-user-circle-o' },
    { route: 'holidays', name: 'holidays', label: 'Feriados', adminOnly: false, active: true, icon: 'fa fa-plane' },
    { route: 'providers', name: 'providers', label: 'Prestadores', adminOnly: true, active: true, icon: 'fa fa-product-hunt' },
    { route: 'workplaces', name: 'workplaces', label: 'Locais de Atendimento', adminOnly: true, active: true, icon: 'fa fa-thumb-tack' }
  ]
}
