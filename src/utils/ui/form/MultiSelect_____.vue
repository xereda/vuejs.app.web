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
  <!-- <pre>defaultValue: {{ defaultValue }}</pre>
  <pre>selectedValue: {{ selectedValue }}</pre>
  <pre>initialDataValue: {{ initialDataValue }}</pre> -->
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import Multiselect from 'vue-multiselect'
  import Http from '../../../utils/services/http'

  export default {
    name: 'dmFormSelect',
    data () {
      return {
        isLoading: false,
        selectedValue: {},
        dataList: []
      }
    },
    mounted () {
      setTimeout(() => {
        this.selectedValue = this.initialDataValue
      }, 300)
      this.asyncFind('')
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
        const _uri = this.apiResource + '/?_limit=' + this.optionsLimit + '&_fields=_id,name&' + _search
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
      // defaultValue (val) {
      //   console.log('DENTRO DA COMPUTATED DEFAULTVALUE')
      // },
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
      }),
      initialDataValue () {
        return this.defaultValue
      }
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
