<template lang="html">
  <div>
    <label v-if="showLabel" class="label">{{ label }}</label>
        <multiselect
          v-model="selectedObject"
          :options="dataList"
          :select-label="selectLabel"
          :selected-label="selectedLabel"
          :deselect-label="deselectLabel"
          :placeholder="placeholder"
          :loading="isLoading"
          :local-search="false"
          @search-change="asyncFind"
          :searchable="true"
          track-by="_id"
          :multiple="multiple"
          label="name">
          <span slot="noResult" class="noResult">Não há elementos com a pesquisa.</span>
        </multiselect>

      <span v-if="hasError" class="help is-danger">{{ errorMessage }}</span>
    </p>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import Http from '../../../utils/services/http'
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'dmFormSearchSelect',
    data () {
      return {
        isLoading: false,
        dataList: [{}],
        selectedObject: null
      }
    },
    mounted () {
      this.asyncFind('')
    },
    components: {
      Multiselect
    },
    methods: {
      asyncFind (q) {
        this.isLoading = true
        let query = ''
        q !== undefined && q !== null && q !== '' ? query = '&name=/' + q + '/i' : query = ''
        Http.get(this.URIResource + query)
        .then(response => {
          this.dataList = response.data
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
      }
    },
    watch: {
      filter (val) {
        this.asyncFind()
      },
      selectedObject (val) {
        console.log('vai passar este objeto: ', val)
        this.$emit('input', val === null ? { _id: '', name: '' } : val)
      }
    },
    computed: {
      ...mapState({
      }),
      URIResource () {
        const _uri = this.apiResource + '/?_limit=' + this.optionsLimit + this.activesOnly + this.filter + '&_fields=_id,name'
        return _uri
      },
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
      },
      selectLabel: {
        type: String,
        default: '[enter] para selecionar'
      },
      deselectLabel: {
        type: String,
        default: '[enter] para remover'
      },
      selectedLabel: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="css" scoped>
  @import '~vue-multiselect/dist/vue-multiselect.min.css';

  .noResult {
    font-size: .8em;
  }

</style>
