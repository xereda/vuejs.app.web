import List from './components/List.vue'
import Main from './Main.vue'
import GeneralForm from './components/form/General.vue'
// import { validate as ValidateToken } from '../../utils/services/auth/auth'

export default [
  {
    path: '/workplaces',
    component: Main,
    // beforeEnter: (to, from, next) => {
    //   ValidateToken((route) => {
    //     next(route)
    //   })
    // },
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
