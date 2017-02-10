<template lang="html">
  <div>
    <input v-model="selectedValue" ref="flatpickr" @input="$emit('input', $event)" :class="{ 'input': true, 'is-disabled': readonly }">
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
        selectedValue: '',
        fpOptions: {
          utc: true,
          locale: pt,
          dateFormat: this.format,
          altFormat: this.inputFormat,
          altInput: true,
          defaultDate: this.selectedValue,
          clickOpens: !this.readonly
        }
      }
    },
    mounted () {
      this.flatPickerInit()
    },
    methods: {
      flatPickerInit () {
        return new Flatpickr(this.$refs.flatpickr, this.fpOptions)
      }
    },
    watch: {
      selectedValue (val, oldVal) {
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      },
      defaultValue (val, oldVal) {
        if (val === '') {
          this.selectedValue = null
        } else {
          this.selectedValue = val
        }
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
      'readonly'
    ]
  }
</script>

<style lang="css">

  @import '~flatpickr/dist/flatpickr.css';

  .flatpickr-calendar {
    z-index: 999999 !important;
  }

</style>
