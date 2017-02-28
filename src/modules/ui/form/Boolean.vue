<template lang="html">
<div>
  <label v-if="showLabel" class="label">{{ label }}</label>
  <p class="control">
    <input type="checkbox" class="checkbox" :checked="value" @change="$emit('input', $event.target.checked)">
    <span v-if="errorMessage !== ''" class="help is-danger">{{ errorMessage }}</span>
  </p>
</div>
</template>

<script>
  export default {
    name: 'dmFormBoolean',
    props: {
      value: {
        required: true
      },
      label: {
        type: String,
        default: ''
      },
      errorMessage: {
        type: String,
        default: ''
      }
    },
    methods: {
      showLabel () {
        return this.label !== undefined && this.label.length > 0
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
