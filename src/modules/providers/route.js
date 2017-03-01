import List from './components/List.vue'
import Main from './Main.vue'
import GeneralForm from './components/form/General.vue'

export default [
  {
    path: '/providers',
    component: Main,
    children: [
      {
        path: '',
        name: 'providers',
        component: List
      },
      {
        path: '/providers/:state',
        name: 'providers.new',
        component: GeneralForm
      },
      {
        path: '/providers/:state/:providerId',
        name: 'providers.update',
        component: GeneralForm
      }
    ]
  }
]
