<template lang="html">
<div>
  <input :placeholder="placeholder" v-model="selectedValue" @input="$emit('input', $event)" :value="value" class="input"></input>
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
        console.log('dentro da computed defaultValue: ', val, oldVal)
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

<style lang="css" scoped>

</style>
