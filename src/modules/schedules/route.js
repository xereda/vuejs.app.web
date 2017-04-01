import Module from './Main.vue'
import ScheduleDefinitions from 'modules/schedules/components/ScheduleDefinitions.vue'
import Schedule from 'modules/schedules/components/Schedule.vue'

export default [
  {
    path: '/schedules',
    name: 'schedules',
    component: Module,
    children: [
      {
        path: '/schedules/scheduleDefinitions',
        name: 'scheduleDefinitions',
        component: ScheduleDefinitions
      },
      {
        path: '/schedules/schedule',
        name: 'schedule',
        component: Schedule
      }
    ]
  }
]
