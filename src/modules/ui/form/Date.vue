<template lang="html">
  <div>
    <p class="control has-icon">
      <input :value="value" ref="flatpickr" @input="eventField($event.target.value)" :class="{ 'input': true, 'is-disabled': readonly }">
      <span class="icon is-small">
        <i :class="faIcon"></i>
      </span>
    </p>
    <!-- <pre>value: {{ value }}</pre>
    <pre>fpOptions: {{ fpOptions }}</pre> -->
  </div>
</template>

<script>
  import Flatpickr from 'flatpickr'
  import { pt } from 'flatpickr/dist/l10n/pt.js'
  // flatpickr/dist/themes/base16_flat.css

  export default {
    name: 'dmFormName',
    data () {
      return {
        Calendar: {},
        fpOptions: {
          utc: true,
          locale: pt,
          dateFormat: this.format,
          altFormat: this.inputFormat,
          altInput: true,
          clickOpens: !this.readonly
        }
      }
    },
    mounted () {
      this.flatPickerInit()
    },
    computed: {
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
        if (oldVal === '') {
          this.Calendar.setDate(val)
        }
      },
      inputFormat (val, oldVal) {
        console.log('vai formatar: ', val)
        this.Calendar.set('altFormat', val)
        this.Calendar.setDate(this.value)
      }
    },
    props: [
      'placeholder',
      'field-name',
      'value',
      'format',
      'inputFormat',
      'readonly',
      'clear',
      'fa-icon'
    ]
  }
</script>

<style lang="css">

  @import '~flatpickr/dist/flatpickr.css';

  .flatpickr-calendar {
    z-index: 999999 !important;
  }

</style>
