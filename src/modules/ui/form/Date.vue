<template lang="html">
  <div>
    <Flatpickr v-model="selectedValue" :options="fpOptions" @input="$emit('input', $event)" :class="{ 'input': true, 'is-disabled': readonly }"></Flatpickr>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueFlatpickr from 'vue-flatpickr'
  import { pt } from 'flatpickr/dist/l10n/pt.js'

  Vue.use(VueFlatpickr)

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
      // this.fpOptions.clickOpens = !this.readonly
    },
    methods: {
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

  @import '~vue-flatpickr/theme/flatpickr.min.css';

  .flatpickr-calendar {
    z-index: 999999 !important;
  }

</style>
