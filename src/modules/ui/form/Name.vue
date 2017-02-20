<template lang="html">
<div>
  <p class="control has-icon">
    <input :placeholder="placeholder" v-model="selectedValue" @input="$emit('input', $event)" :value="value" class="input"></input>
    <span class="icon is-small">
      <i :class="faIcon"></i>
    </span>
  </p>
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
      'value',
      'fa-icon'
    ]
  }
</script>

<style lang="css" scoped>

</style>
