import List from './components/List.vue'
import Main from './Main.vue'
import GeneralForm from './components/form/General.vue'

export default [
  {
    path: '/workplaces',
    component: Main,
    children: [
      {
        path: '',
        name: 'workplaces',
        component: List
      },
      {
        path: '/workplaces/:state',
        name: 'workplaces.new',
        component: GeneralForm
      },
      {
        path: '/workplaces/:state/:workplaceId',
        name: 'workplaces.update',
        component: GeneralForm
      }
    ]
  }
]
