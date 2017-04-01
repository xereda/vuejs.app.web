import Main from './Main.vue'
import ProfessionalActivities from './subModules/professionalActivities/Main.vue'
import Specialties from './subModules/specialties/Main.vue'
import Users from './subModules/users/Main.vue'
import Agreements from './subModules/agreements/Main.vue'
import Operators from './subModules/operators/Main.vue'
import Cities from './subModules/cities/Main.vue'
import People from './subModules/people/Main.vue'
import Holidays from './subModules/holidays/Main.vue'
import Providers from './subModules/providers/Main.vue'
import ProvidersList from './subModules/providers/components/List.vue'
import ProvidersGeneralForm from './subModules/providers/components/form/General.vue'
import Workplaces from './subModules/workplaces/Main.vue'
import WorkplaceList from './subModules/workplaces/components/List.vue'
import WorkplacesGeneralForm from './subModules/workplaces/components/form/General.vue'

export default [
  {
    path: '/administrative',
    name: 'administrative',
    component: Main,
    children: [
      {
        path: '/administrative/professionalActivities',
        name: 'professionalActivities',
        component: ProfessionalActivities
      },
      {
        path: '/administrative/specialties',
        name: 'specialties',
        component: Specialties
      },
      {
        path: '/administrative/users',
        name: 'users',
        component: Users
      },
      {
        path: '/administrative/agreements',
        name: 'agreements',
        component: Agreements
      },
      {
        path: '/administrative/operators',
        name: 'operators',
        component: Operators
      },
      {
        path: '/administrative/cities',
        name: 'cities',
        component: Cities
      },
      {
        path: '/administrative/people',
        name: 'people',
        component: People
      },
      {
        path: '/administrative/holidays',
        name: 'holidays',
        component: Holidays
      },
      {
        path: '/administrative/providers',
        name: 'providers',
        component: Providers,
        children: [
          {
            path: '',
            name: 'providers',
            component: ProvidersList
          },
          {
            path: '/administrative/providers/:state',
            name: 'providers.new',
            component: ProvidersGeneralForm
          },
          {
            path: '/administrative/providers/:state/:providerId',
            name: 'providers.update',
            component: ProvidersGeneralForm
          }
        ]
      },
      {
        path: '/administrative/workplaces',
        name: 'workplaces',
        component: Workplaces,
        children: [
          {
            path: '',
            name: 'workplaces',
            component: WorkplaceList
          },
          {
            path: '/administrative/workplaces/:state',
            name: 'workplaces.new',
            component: WorkplacesGeneralForm
          },
          {
            path: '/administrative/workplaces/:state/:workplaceId',
            name: 'workplaces.update',
            component: WorkplacesGeneralForm
          }
        ]
      }
    ]
  }
]
