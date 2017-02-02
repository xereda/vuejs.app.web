<template lang="html">
<div>
  <Flatpickr v-model="selectedValue" :options="fpOptions" @input="$emit('input', $event)" class="input"></Flatpickr>
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
          altInput: true
        }
      }
    },
    methods: {
    },
    watch: {
      selectedValue (val, oldValue) {
        console.log('mudou o valor: ', val, oldValue)
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      }
    },
    props: [
      'placeholder',
      'field-name',
      'value',
      'format',
      'inputFormat'
    ]
  }
</script>

<style lang="css">

  @import '~vue-flatpickr/theme/flatpickr.min.css';

  .flatpickr-calendar {
    z-index: 999999 !important;
  }

</style>
