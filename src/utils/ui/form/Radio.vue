<template lang="html">
<div>
  <label v-if="showLabel" class="label">{{ label }}</label>
  <p class="control">
    <label class="radio" v-for="option in options">
      <input type="radio" :name="name" :class="{ 'radio': true }" :value="option.value" :checked="option.value === value" @click="$emit('input', $event.target.value)">
      {{ option.label }}
    </label>
    <span v-if="errorMessage !== ''" class="help is-danger">{{ errorMessage }}</span>
  </p>
</div>
</template>

<script>
  export default {
    name: 'dmFormRadio',
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
      },
      name: {
        type: String,
        default: 'radioGroup___'
      },
      options: {
        type: Array,
        required: true
      }
    },
    methods: {
      showLabel () {
        return this.label !== undefined && this.label.length > 0
      }
    },
    watch: {
      options (val) {
        val.forEach((element) => {
          console.log(element)
        })
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
