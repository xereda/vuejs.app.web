import Main from './Main.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: Main
    // children: [
    //   {
    //     path: '',
    //     name: 'providers',
    //     component: List
    //   },
    //   {
    //     path: '/providers/:state',
    //     name: 'providers.new',
    //     component: GeneralForm
    //   },
    //   {
    //     path: '/providers/:state/:providerId',
    //     name: 'providers.update',
    //     component: GeneralForm
    //   }
    // ]
  }
]
