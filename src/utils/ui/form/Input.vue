<template lang="html">
<div>
  <label v-if="showLabel" class="label">{{ label }}</label>
  <p :class="pClass">
    <input :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)" :class="{ 'input': true, 'is-disabled': disabled, 'is-danger': hasError }"></input>
    <span class="icon is-small" v-show="!hiddenIcon">
      <i :class="faIcon"></i>
    </span>
    <span v-if="hasError" class="help is-danger">{{ errorMessage }}</span>
  </p>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'dmFormInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    faIcon: {
      type: String,
      default: 'fa fa-font'
    },
    label: {
      type: String,
      default: ''
    },
    vuelidate: {
      type: Object,
      default: () => Object.assign({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hiddenIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pClass () {
      return this.hiddenIcon ? 'control' : 'control has-icon'
    },
    showLabel () {
      return this.label !== undefined && this.label.length > 0
    },
    errorMessage () {
      if (_.isEmpty(this.vuelidate)) {
        return ''
      }
      if (this.vuelidate.$dirty !== undefined && this.vuelidate.$dirty === false) {
        return ''
      }
      if (this.vuelidate.required !== undefined && this.vuelidate.required === false) {
        if (this.label === '') {
          return 'Campo é requerido!'
        } else {
          return this.label.replace(' *', '') + ' é requerido!'
        }
      }
      if (this.vuelidate.minLength !== undefined && this.vuelidate.minLength === false) {
        return 'Qt mínima de caracteres não atendida!'
      }
      if (this.vuelidate.maxLength !== undefined && this.vuelidate.maxLength === false) {
        return 'Ultrapassou qt máxima de caracteres!'
      }

      return ''
    },
    hasError () {
      return this.errorMessage !== ''
    }}
}
</script>

<style lang="css" scoped>
</style>
