import moment from 'moment'
import _ from 'lodash'

export default {
  methods: {
    rulesGenerator () {
      this.masterLoadingStart()
      this.applyAllValidationsfForm(() => {
        this.doGenerating()
      })
    },
    doGenerating () {
      const arrayDataPost = []
      const providersList = this.formFields.provider === 'all' ? this.providersList.map(e => { return { _id: e._id } }) : [ { _id: this.formFields.provider } ]
      const selectedsWeekDays = Object.keys(this.formFields.weekDays).filter(e => this.formFields.weekDays[e])
      const iterationsTotal = (providersList.length * selectedsWeekDays.length) * 2
      let iCount = 0
      return selectedsWeekDays.forEach((weekDay) => {
        providersList.forEach((provider) => {
          iCount = iCount + 2
          const dataObjectStart = {
            workplace: this.session.workplaces[0]._id,
            provider: provider._id,
            active: true,
            autoApproval: true,
            weekDay,
            durationMinutes: this.formFields.durationMinutes,
            startHour: this.formFields.startHour,
            endHour: this.formFields.intervalStart,
            startDate: moment.utc().format(),
            endDate: moment.utc('2099-12-31').format(),
            createdById: this.session._id
          }
          const dataObjectEnd = _.cloneDeep(dataObjectStart)
          dataObjectEnd.startHour = this.formFields.intervalEnd
          dataObjectEnd.endHour = this.formFields.endHour
          arrayDataPost.push(dataObjectStart)
          arrayDataPost.push(dataObjectEnd)
          if (iterationsTotal === iCount) {
            console.log('arrayDataPost: ', arrayDataPost)
            this.rulesAPIPost(arrayDataPost)
          }
        })
      })
    }
  }
}
