<template lang="html">
<div>
  <label v-if="showLabel" class="label">{{ label }}</label>
  <p class="control has-icon">
    <input :placeholder="placeholder" v-model="cep" :value="value" @input="applyMask($event.target.value)" :class="{ 'input': true, 'is-danger': hasError }"></input>
    <span class="icon is-small">
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
    name: 'dmFormCEP',
    data () {
      return {
        cep: ''
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
        default: 'fa fa-location-arrow'
      },
      label: {
        type: String,
        default: ''
      },
      vuelidate: {
        type: Object,
        default: () => Object.assign({})
      }
    },
    methods: {
      applyMask (val) {
        // val.length > 14 ? this.phone = VMasker.toPattern(val, '99.999-999') : this.phone = VMasker.toPattern(val, '(99) 9999-9999')
        this.cep = VMasker.toPattern(val, '99.999-999')
        this.$emit('input', this.cep)
      }
    },
    computed: {
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
        this.cep = VMasker.toPattern(val, '99.999-999')
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
