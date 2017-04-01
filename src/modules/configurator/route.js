import Main from './Main.vue'
import Config from './components/Config.vue'

export default [
  {
    path: '/config',
    alias: '/configurator',
    name: 'configurator',
    component: Main,
    children: [
      {
        path: '/configurator/config',
        name: 'config',
        component: Config
      }
    ]
  }
]
