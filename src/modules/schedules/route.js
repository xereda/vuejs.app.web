import Module from './Main.vue'
import ScheduleDefinitions from 'modules/schedules/components/ScheduleDefinitions.vue'
import Generator from 'modules/schedules/components/Generator.vue'
import Rules from 'modules/schedules/components/Rules.vue'
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
        path: '/schedules/generator',
        name: 'scheduleDefinitions.generator',
        component: Generator
      },
      {
        path: '/schedules/rules',
        name: 'scheduleDefinitions.rules',
        component: Rules
      },
      {
        path: '/schedules/schedule',
        name: 'schedule',
        component: Schedule
      }
    ]
  }
]
