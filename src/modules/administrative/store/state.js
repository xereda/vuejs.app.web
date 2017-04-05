export default {
  modules: [
    { menuHidden: false, route: 'admin', name: 'admin', label: 'Admin', adminOnly: false, active: true, icon: 'fa fa-list' },
    { menuHidden: false, route: 'professionalActivities', name: 'professionalActivities', label: 'Ramos de Atividade', adminOnly: true, active: true, icon: 'fa fa-list' },
    { menuHidden: false, route: 'specialties', name: 'specialties', label: 'Especializações', adminOnly: true, active: true, icon: 'fa fa-user-md' },
    { menuHidden: false, route: 'users', name: 'users', label: 'Usuários', adminOnly: true, active: true, icon: 'fa fa-users' },
    { menuHidden: false, route: 'agreements', name: 'agreements', label: 'Convênios', adminOnly: true, active: true, icon: 'fa fa-handshake-o' },
    { menuHidden: false, route: 'operators', name: 'operators', label: 'Operadoras', adminOnly: true, active: true, icon: 'fa fa-credit-card' },
    { menuHidden: false, route: 'cities', name: 'cities', label: 'Cidades', adminOnly: true, active: true, icon: 'fa fa-map-marker' },
    { menuHidden: false, route: 'people', name: 'people', label: 'Pessoas', adminOnly: false, active: true, icon: 'fa fa-user-circle-o' },
    { menuHidden: false, route: 'holidays', name: 'holidays', label: 'Feriados', adminOnly: false, active: true, icon: 'fa fa-plane' },
    { menuHidden: false, route: 'providers', name: 'providers', label: 'Prestadores', adminOnly: true, active: true, icon: 'fa fa-product-hunt' },
    { menuHidden: true, route: 'providers.new', name: 'providers.new', label: 'Prestadores', adminOnly: true, active: true, icon: 'fa fa-product-hunt' },
    { menuHidden: true, route: 'providers.update', name: 'providers.update', label: 'Prestadores', adminOnly: true, active: true, icon: 'fa fa-product-hunt' },
    { menuHidden: false, route: 'workplaces', name: 'workplaces', label: 'Locais de Atendimento', adminOnly: true, active: true, icon: 'fa fa-thumb-tack' },
    { menuHidden: true, route: 'workplaces.new', name: 'workplaces.new', label: 'Locais de Atendimento', adminOnly: true, active: true, icon: 'fa fa-thumb-tack' },
    { menuHidden: true, route: 'workplaces.update', name: 'workplaces.update', label: 'Locais de Atendimento', adminOnly: true, active: true, icon: 'fa fa-thumb-tack' }
  ]
}
