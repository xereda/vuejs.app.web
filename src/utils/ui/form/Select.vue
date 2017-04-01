<template lang="html">
  <div>
    <label v-if="showLabel" class="label">{{ label }}</label>
    <p class="control has-icon">
      <span class="select">
        <select :value="value" @change="$emit('input', $event.target.value)" :class="{ 'is-disabled': disabled, 'is-danger': showError }">
          <option value="">{{ placeholder }}</option>
          <option v-for="item in dataList" :value="item._id">{{ item.name }}</option>
        </select>
      </span>
      <span class="icon is-small">
        <i :class="faIcon"></i>
      </span>
      <span v-if="hasError" class="help is-danger">{{ errorMessage }}</span>
    </p>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import Http from '../../services/http'

  export default {
    name: 'dmFormSelect',
    data () {
      return {
        isLoading: false,
        dataList: []
      }
    },
    mounted () {
      this.asyncFind('')
    },
    components: {
    },
    methods: {
      asyncFind (query) {
        this.isLoading = true
        const _uri = this.apiResource + '/?_limit=' + this.optionsLimit + this.activesOnly + this.filter + '&_fields=_id,name&'
        console.log(_uri)
        Http.get(_uri)
        .then((response) => {
          this.dataList = response.data
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
      }
    },
    watch: {
      filter (val) {
        this.asyncFind()
      }
    },
    computed: {
      ...mapState({
      }),
      activesOnly () {
        return this.actives !== undefined && this.actives === true ? '&active=true' : ''
      },
      showLabel () {
        return this.label !== undefined && this.label.length > 0
      },
      showError () {
        return this.errorMessage !== undefined && this.errorMessage.length > 0
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
        return ''
      },
      hasError () {
        return this.errorMessage !== ''
      }
    },
    props: {
      value: {
      },
      placeholder: {
        type: String,
        default: 'Selecione um opção...'
      },
      optionsLimit: {
        type: Number,
        default: 20
      },
      disabled: {
        type: Boolean
      },
      apiResource: {
        type: String,
        required: true
      },
      actives: {
        type: Boolean
      },
      faIcon: {
        type: String,
        default: 'fa fa-list-ul'
      },
      label: {
        type: String,
        default: ''
      },
      filter: {
        type: String,
        default: ''
      },
      vuelidate: {
        type: Object,
        default: () => Object.assign({})
      }
    }
  }
</script>

<style lang="css" scoped>

  select {
    padding-left: 35px !important;
  }

</style>
