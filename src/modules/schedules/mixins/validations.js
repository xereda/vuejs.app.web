export default {
  computed: {
    isInvalidWeekDays () {
      if (!this.$v.formFields.startHour.$dirty && !this.$v.formFields.endHour.$dirty) return false
      return !this.formFields.weekDays.seg &&
             !this.formFields.weekDays.ter &&
             !this.formFields.weekDays.qua &&
             !this.formFields.weekDays.qui &&
             !this.formFields.weekDays.sex
    },
    isInvalidDuration () {
      if (this.$v.formFields['startHour'].$invalid) return false
      if (this.$v.formFields['endHour'].$invalid) return false
      if (this.$v.formFields['intervalStart'].$invalid) return false
      if (this.$v.formFields['intervalEnd'].$invalid) return false
      if (this.$v.formFields['durationMinutes'].$invalid) return false
      this.formStates.durationMinutes = false
      const diffInterval = new Date('2017/01/01 ' + this.formFields.intervalEnd + ':01:0001Z') - new Date('2017/01/01 ' + this.formFields.intervalStart + ':01:0001Z')
      const diffPeriod = new Date('2017/01/01 ' + this.formFields.endHour + ':01:0001Z') - new Date('2017/01/01 ' + this.formFields.startHour + ':01:0001Z')
      let diff = (diffPeriod - diffInterval) / 1000 / 60
      this.formStates.durationMinutes = !(diff <= this.parseHour(this.formFields.durationMinutes))
      return !this.formStates.durationMinutes
    },
    hasIntervalError () {
      if (this.isInvalidField('intervalStart')) return true
      if (this.isInvalidField('intervalEnd')) return true
      if (this.formStates.intervalStart === false) return true
      if (this.formStates.intervalEnd === false) return true
      if (this.formStates.interval === false) return true
      return false
    },
    hasPeriodError () {
      if (this.isInvalidField('startHour')) return true
      if (this.isInvalidField('endHour')) return true
      if (this.formStates.startHour === false) return true
      if (this.formStates.endHour === false) return true
      return false
    },
    getIntervalErrorMessage () {
      if (this.formStates.intervalStart === false || this.isInvalidField('intervalStart')) return 'A hora de início do intervalo é invalida!'
      if (this.formStates.intervalEnd === false || this.isInvalidField('intervalEnd')) return ' A hora de fim do intervalo é inválida!'
      if (this.formStates.interval === false) return 'O intervalo é invalido!'
      return ''
    },
    getPeriodErrorMessage () {
      if (this.formStates.startHour === false || this.isInvalidField('startHour')) return 'A hora de início é invalida!'
      if (this.formStates.endHour === false || this.isInvalidField('endHour')) return ' A hora de fim é inválida!'
      return ''
    }
  },
  methods: {
    applyAllValidationsfForm (callback) {
      this.$v.formFields.$touch()
      if (this.$v.formFields.$invalid) {
        this.masterLoadingStop()
        return false
      }
      callback()
    },
    isInvalidField (field) {
      return (this.$v.formFields[field].$dirty && this.$v.formFields[field].$invalid)
    },
    parseHour (hour) {
      return parseInt(hour.replace(':', ''))
    },
    validateHour (field) {
      if (field === 'startHour' || field === 'endHour') {
        this.formStates.startHour = true
        this.formStates.endHour = true
      }
      if (field === 'intervalStart' || field === 'intervalEnd') {
        this.formStates.intervalStart = true
        this.formStates.intervalEnd = true
        this.formStates.interval = true
      }
      const value = this.formFields[field]
      const hour = parseInt(value.substring(0, 2))
      const minutes = parseInt(value.substring(3, 5))
      const time = this.parseHour(value)
      console.log(field, value, value.length, hour, minutes)
      if (value.length !== 5) {
        this.formStates[field] = false
        return true
      }
      if (hour < 0 || hour > 23) {
        this.formStates[field] = false
        return true
      }
      if (minutes < 0 || minutes > 59) {
        this.formStates[field] = false
        return true
      }
      if (field === 'startHour' && time >= this.parseHour(this.formFields.endHour)) {
        this.formStates[field] = false
        return true
      }
      if (field === 'intervalStart') {
        if (time >= this.parseHour(this.formFields.intervalEnd)) {
          this.formStates[field] = false
          return true
        }
        if (time <= this.parseHour(this.formFields.startHour)) {
          this.formStates['interval'] = false
          return true
        }
        if (this.parseHour(this.formFields.intervalEnd) >= this.parseHour(this.formFields.endHour)) {
          this.formStates['interval'] = false
          return true
        }
      }
      if (field === 'endHour') {
        if (time <= this.parseHour(this.formFields.startHour)) {
          this.formStates[field] = false
          return true
        }
      }
      if (field === 'intervalEnd') {
        if (time <= this.parseHour(this.formFields.intervalStart)) {
          this.formStates[field] = false
          return true
        }
        if (time >= this.parseHour(this.formFields.endHour)) {
          this.formStates['interval'] = false
          return true
        }
        if (this.parseHour(this.formFields.intervalStart) <= this.parseHour(this.formFields.startHour)) {
          this.formStates['interval'] = false
          return true
        }
      }
      this.formStates[field] = true
    }
  }
}
