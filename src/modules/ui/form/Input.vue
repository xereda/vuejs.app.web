<template lang="html">
<div>
  <input v-model="selectedValue" class="input"></input>
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
      selectedValue (val, oldValue) {
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      }
    },
    props: [
      'placeholder',
      'field-name',
      'value'
    ]
  }
</script>

<style lang="css">

</style>
