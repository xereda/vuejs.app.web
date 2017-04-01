import Main from './Main.vue'
import Dashboard1 from './components/Dashboard1.vue'
import Dashboard2 from './components/Dashboard2.vue'

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Main,
    children: [
      {
        path: '/dashboard/dashboard1',
        name: 'dashboard1',
        component: Dashboard1
      },
      {
        path: '/dashboard/dashboard2',
        name: 'dashboard2',
        component: Dashboard2
      }
    ]
  }
]
