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

<style lang="css" scoped>

</style>
