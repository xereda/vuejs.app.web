<template lang="html">
<div>
  <!-- <multiselect v-model="selectedValue" :multiple="false" :taggable="true" :options="options"></multiselect> -->
  <multiselect v-model="selectedValue"
               id="ajax"
               label="name"
               track-by="id"
               placeholder="Pesquisar..."
               :options="dataList"
               :multiple="true"
               :searchable="true"
               :loading="isLoading"
               :internal-search="false"
               :clear-on-select="false"
               :close-on-select="false"
               :options-limit="300"
               :limit="3"
               :limit-text="limitText"
               @search-change="asyncFind">
    <span slot="noResult">Sem resultados na pesquisa.</span>
  </multiselect>
</div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'dmFormName',
    data () {
      return {
        isLoading: false,
        selectedValue: '',
        dataList: []
      }
    },
    components: {
      Multiselect
    },
    methods: {
      limitText (count) {
        return `and ${count} other countries`
      },
      asyncFind (query) {
        console.log('aqui vai chamar a api', query)
        const _list = [
          { id: 1, name: 'item 1' },
          { id: 2, name: 'item 2' },
          { id: 3, name: 'item 3' },
          { id: 4, name: 'item 4' },
          { id: 5, name: 'item 5' }
        ]
        this.dataList = _list
      }
    },
    watch: {
      selectedValue (val, oldValue) {
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      }
    },
    props: [
      'placeholder',
      'field-name',
      'value'
    ]
  }
</script>

<style lang="css">


</style>
