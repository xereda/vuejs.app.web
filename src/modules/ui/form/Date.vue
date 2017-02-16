<template lang="html">
  <div>
    <input v-model="selectedValue" ref="flatpickr" @input="$emit('input', $event)" :class="{ 'input': true, 'is-disabled': readonly }">
    <!-- <pre>defaultValue: {{ defaultValue }}</pre><br />
    <pre>selectedValue: {{ selectedValue }}</pre><br />
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
        selectedValue: '',
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
    methods: {
      flatPickerInit () {
        this.Calendar = new Flatpickr(this.$refs.flatpickr, this.fpOptions)
      }
    },
    watch: {
      selectedValue (val, oldVal) {
        if ((val === null) || (val === '')) {
          this.Calendar.clear()
        }
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      },
      defaultValue (val, oldVal) {
        this.selectedValue = this.defaultValue
        this.Calendar.setDate(this.defaultValue, true)
      },
      inputFormat (val, oldVal) {
        this.fpOptions.altFormat = val
      }
    },
    props: [
      'default-value',
      'placeholder',
      'field-name',
      'value',
      'format',
      'inputFormat',
      'readonly',
      'clear'
    ]
  }
</script>

<style lang="css">

  @import '~flatpickr/dist/flatpickr.css';

  .flatpickr-calendar {
    z-index: 999999 !important;
  }

</style>
