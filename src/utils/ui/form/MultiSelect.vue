<template lang="html">
  <div>
    <!-- <pre>{{ selectedObject }}</pre> -->
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
          :disabled="disabled"
          :multiple="true"
          :value="value"
          :close-on-select="false"
          :clear-on-select="true"
          :hide-selected="true"
          :style="'z-index:' + zIndex"
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
    name: 'dmFormMultiSelect',
    data () {
      return {
        query: '',
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
        this.query = q
        this.dataList = []
        if (this.disabled) return false
        this.isLoading = true
        Http.get(this.URIResource)
        .then(response => {
          this.hidratyDataList(response.data)
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
          this.isLoading = false
        })
      },
      // hidratyDataList (data) {
      //   const _list = []
      //   data.map(element => {
      //     _list.push({ _id: element[this.subdocField]._id, name: element[this.subdocField].name })
      //   })
      //   this.dataList = _list
      // }
      hidratyDataList (data) {
        if (this.subdocField === '') {
          this.dataList = (data.map(e => { return { '_id': e._id, 'name': _.startCase(_.toLower(e.name)) } }))
        } else {
          this.dataList = (data.map(e => {
            return e[this.subdocField]
          })).map(e => { return { '_id': e._id, 'name': _.startCase(_.toLower(e.name)) } })
        }
      }
    },
    watch: {
      filter (val) {
        this.asyncFind()
      },
      selectedObject (val) {
        this.$emit('input', val === null ? [] : val)
      },
      docId (val) {
        this.selectedObject = null
        this.asyncFind()
      }
    },
    computed: {
      ...mapState({
      }),
      URIResource () {
        if (this.subdocField === '') {
          return this.apiResource + '/?_limit=' + this.optionsLimit + this.activesOnly + this.filter + this.filterName
        }
        return this.apiResource + '/' + this.docId + '/' + this.subdoc + '/?_limit=' + this.optionsLimit + this.activesOnly + this.filter + this.filterName
      },
      filterName () {
        if (this.query === undefined) return ''
        if (this.query === '') return ''
        if (this.subdocField === '') return '&name=/' + this.query + '/i'
        return '&' + this.subdocField + '.name=/' + this.query + '/i'
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
        type: Boolean,
        default: false
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
        default: ''
      },
      deselectLabel: {
        type: String,
        default: ''
      },
      selectedLabel: {
        type: String,
        default: ''
      },
      subdoc: {
        type: String,
        default: ''
      },
      subdocField: {
        type: String,
        default: ''
      },
      docId: {
        type: String,
        default: ''
      },
      zIndex: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~vue-multiselect/dist/vue-multiselect.min.css';

  .noResult {
    font-size: .8em;
  }

</style>
