<template lang="html">
<div>
  <multiselect v-model="selectedValue"
               label="name"
               track-by="_id"
               :placeholder="placeholder"
               :options="dataList"
               :loading="isLoading"
               :internal-search="true"
               :close-on-select="true"
               :options-limit="optionsLimit"
               :disabled="disabled"
               :block-keys="['Tab']"
               @input="$emit('input', $event)"
               select-label="Enter para selecionar"
               selected-label="Selecionado"
               deselect-label="Enter para remover"
               @search-change="asyncFind">
    <span slot="noResult">Sem retorno com o filtro.</span>
  </multiselect>
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import Multiselect from 'vue-multiselect'
  import axios from 'axios'

  export default {
    name: 'dmFormSelect',
    data () {
      return {
        isLoading: false,
        selectedValue: { _id: '', name: '' },
        dataList: []
      }
    },
    mounted () {
      this.asyncFind('')
      setTimeout(() => {
        this.selectedValue = { _id: this.defaultValue._id, name: this.defaultValue.name }
        console.log('passou os valores default para o this.selectedValue: ', this.selectedValue, this.defaultValue)
      }, 100)
    },
    components: {
      Multiselect
    },
    methods: {
      asyncFind (query) {
        this.isLoading = true
        let _search = ''
        if (query !== '') {
          _search = 'name=/' + query + '/i'
        }
        const _uri = this.APIURIBase + this.apiResource + '/?_limit=' + this.optionsLimit + '&_fields=_id,name&' + _search
        console.log('_uri do select: ', _uri)
        axios.get(_uri)
        .then((response) => {
          this.dataList = response.data
          console.log('dataList - object de retorno: ', this.dataList)
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
      }
    },
    watch: {
      selectedValue (val, oldVal) {
        if (val === null) {
          val = ''
        } else if (val._id !== undefined) {
          val = val._id
        }
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      }
    },
    computed: {
      ...mapState({
        APIURIBase: state => {
          const { config } = state
          return config.APIURIBase
        }
      })
    },
    props: {
      defaultValue: {
      },
      placeholder: {
        type: String,
        default: 'Pesquisar...'
      },
      fieldName: {
        type: String,
        required: true
      },
      value: {
        type: ['String', 'Number']
      },
      apiResource: {
        type: String,
        required: true
      },
      optionsLimit: {
        type: Number,
        default: 10
      },
      disabled: {
        type: Boolean
      }
    }
  }
</script>

<style lang="css">


</style>
