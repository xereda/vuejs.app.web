<template lang="html">
<div>
  <input v-model="selectedValue"  @input="$emit('input', $event)" class="input"></input>
</div>
</template>

<script>
  export default {
    name: 'dmFormName',
    data () {
      return {
        selectedValue: ''
      }
    },
    methods: {
    },
    watch: {
      selectedValue (val, oldVal) {
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      },
      defaultValue (val, oldVal) {
        this.selectedValue = val
      }
    },
    props: [
      'default-value',
      'placeholder',
      'field-name',
      'value'
    ]
  }
</script>

<style lang="css">

</style>
