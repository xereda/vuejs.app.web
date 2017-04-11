<template lang="html">
<div>
  <label v-if="showLabel" class="label">{{ label }}</label>
  <p class="control has-icon">
    <input :placeholder="placeholder" v-model="geoLocation" ref="geo" :value="value" @input="applyMask($event.target.value)" :class="{ 'input': true, 'is-danger': hasError }"></input>
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
    name: 'DmFormLatitude',
    data () {
      return {
        geoLocation: ''
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
        default: 'fa fa-map-marker'
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
        if (this.geoLocation.indexOf('+') > -1) {
          // console.log('vai aplicar a maskara com positivo')
          this.geoLocation = VMasker.toPattern(val, '+99.9999999')
          val.length === 1 ? this.geoLocation = '+' + val.replace('+', '') : null
          // VMasker(this.$refs.geo).maskPattern('+99.9999999')
        } else {
          // console.log('vai aplicar a maskara com negativo')
          this.geoLocation = VMasker.toPattern(val, '-99.9999999')
          val.length === 1 ? this.geoLocation = '-' + val.replace('-', '') : null
          // VMasker(this.$refs.geo).maskPattern('-99.9999999')
        }
        this.$emit('input', this.geoLocation)
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
        if (this.vuelidate.between !== undefined && this.vuelidate.between === false) {
          return this.placeholder + ' está fora do intervalo permitido!'
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
        this.geoLocation = val
        this.applyMask(val)
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
