<template lang="html">
<div>
  <label v-if="showLabel" class="label">{{ label }}</label>
  <p :class="pClass">
    <input :placeholder="placeholder" v-model="phone" ref="phone" :value="value" @input="applyMask($event.target.value)" :class="{ 'input': true, 'is-danger': hasError }"></input>
    <span class="icon is-small" v-show="!hiddenIcon">
      <i :class="faIcon"></i>
    </span>
    <span v-if="errorMessage !== ''" class="help is-danger">{{ errorMessage }}</span>
  </p>
</div>
</template>

<script>
  import _ from 'lodash'
  import VMasker from 'vanilla-masker'
  import AwesomeMask from 'awesome-mask'

  export default {
    name: 'dmFormPhone',
    data () {
      return {
        phone: ''
      }
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
      hiddenIcon: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      applyMask (val) {
        val.length > 14 ? this.phone = VMasker.toPattern(val, '(99) 99999-9999') : this.phone = VMasker.toPattern(val, '(99) 9999-9999')
        this.$emit('input', this.phone)
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
      }
    },
    directives: {
      'mask': AwesomeMask
    },
    watch: {
      value (val) {
        this.phone = val
        val.length > 14 ? this.phone = VMasker.toPattern(val, '(99) 99999-9999') : this.phone = VMasker.toPattern(val, '(99) 9999-9999')
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
