<template lang="html">
  <div>
    <label v-if="showLabel" class="label">{{ label }}</label>
    <p class="control has-icon">
      <input :value="value" ref="flatpickr" @input="eventField($event.target.value)" :class="{ 'input': true, 'is-disabled': readonly, 'is-danger': hasError }">
      <span class="icon is-small">
        <i :class="faIcon"></i>
      </span>
      <span v-if="hasError" class="help is-danger">{{ errorMessage }}</span>
    </p>
    <!-- <pre>value: {{ value }}</pre>
    <pre>fpOptions: {{ fpOptions }}</pre> -->
  </div>
</template>

<script>
  import { isEmpty as _isEmpty } from 'lodash'
  import Flatpickr from 'flatpickr'
  import { pt } from 'flatpickr/dist/l10n/pt.js'
  // flatpickr/dist/themes/base16_flat.css

  export default {
    name: 'dmFormDate',
    data () {
      return {
        Calendar: {},
        fpOptions: {
          utc: true,
          locale: pt,
          dateFormat: this.format,
          altFormat: this.inputFormat,
          altInput: true,
          clickOpens: !this.readonly,
          minDate: this.minDate,
          maxDate: this.maxDate
        }
      }
    },
    mounted () {
      this.flatPickerInit()
    },
    computed: {
      showLabel () {
        return this.label !== undefined && this.label.length > 0
      },
      errorMessage () {
        console.log('typeof this.vuelidate', typeof this.vuelidate, this.vuelidate)
        if (_isEmpty(this.vuelidate)) {
          return ''
        }
        if (this.vuelidate.$dirty !== undefined && this.vuelidate.$dirty === false) {
          return ''
        }
        if (this.vuelidate.required !== undefined && this.vuelidate.required === false) {
          if (this.label === '') {
            return 'Campo é requerido!'
          } else {
            return this.label + ' é requerido!'
          }
        }
        return ''
      },
      hasError () {
        return this.errorMessage !== ''
      }
    },
    methods: {
      eventField (value) {
        this.$emit('input', value)
      },
      flatPickerInit () {
        this.Calendar = new Flatpickr(this.$refs.flatpickr, this.fpOptions)
      }
    },
    watch: {
      value (val, oldVal) {
        console.log(val === null, val === '', val, oldVal)
        this.Calendar.setDate(val)
        // if (oldVal === '') {
        //   this.Calendar.setDate(val)
        // }
      },
      inputFormat (val, oldVal) {
        console.log('vai formatar: ', val)
        this.Calendar.set('altFormat', val)
        this.Calendar.setDate(this.value)
      },
      clear (val) {
        if (val === true) {
          this.Calendar.clear()
        }
      }
    },
    props: {
      placeholder: {
        type: String,
        default: 'Data'
      },
      value: {
        required: true,
        type: String
      },
      format: {
        type: String,
        default: 'Y-m-d'
      },
      inputFormat: {
        type: String,
        default: 'd/m/Y'
      },
      readonly: {
        default: false,
        type: Boolean
      },
      faIcon: {
        default: 'fa fa-calendar',
        type: String
      },
      label: {
        type: String,
        default: 'Data'
      },
      minDate: {
        type: Date,
        default: () => new Date('1900-01-01')
      },
      maxDate: {
        type: Date,
        default: () => new Date('2100-12-31')
      },
      vuelidate: {
        type: Object,
        default: () => Object.assign({})
      },
      clear: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="css">

  @import '~flatpickr/dist/flatpickr.css';

  .flatpickr-calendar {
    z-index: 999999 !important;
  }

</style>
