<template lang="html">
<div>
  <label v-if="showLabel" class="label">{{ label }}</label>
  <p :class="pClass">
    <input :placeholder="placeholder" ref="email" :value="value" @input="$emit('input', $event.target.value)" :class="defineClass"></input>
    <span :class="'icon ' + iconSize" v-show="!hiddenIcon">
      <i :class="faIcon"></i>
    </span>
    <span v-if="hasError" class="help is-danger">{{ errorMessage }}</span>
  </p>
</div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'dmFormEmail',
  mounted () {
    if (this.autofocus) this.$refs.email.focus()
  },
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
      default: 'fa fa-envelope'
    },
    label: {
      type: String,
      default: ''
    },
    vuelidate: {
      type: Object,
      default: () => Object.assign({})
    },
    hiddenIcon: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: 'is-small'
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pClass () {
      return this.hiddenIcon ? 'control' : 'control has-icon'
    },
    defineClass () {
      let _class = 'input '
      if (this.disabled) _class += ' is-disabled'
      if (this.hasError) _class += ' is-danger'
      _class += ' ' + this.size
      return _class
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
      if (this.vuelidate.email !== undefined && this.vuelidate.email === false) {
        return 'E-mail inválido!'
      }
      return ''
    },
    hasError () {
      return this.errorMessage !== ''
    }
  }
}
</script>

<style lang="css" scoped>

</style>
