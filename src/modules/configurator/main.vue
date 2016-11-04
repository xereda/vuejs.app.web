<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ general.title }}</h1>
      <h2 class="subtitle">{{ general.subTitle }}</h2>
      <hr>

      selected: {{ selected }}

      <hr>

      <multiselect
        :value="selected"
        :options="healthInsurances"
        select-label="[enter] para selecionar"
        selected-label="selecionado"
        deselect-label="[enter] para remover"
        :loading="isLoading"
        :local-search="false"
        @search-change="asyncFind"
        :searchable="true"
        track-by="_id"
        label="name"
        @input="updateSelected">
      </multiselect>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import Multiselect from 'vue-multiselect'

export default {
  data () {
    return {
      isLoading: false,
      selected: null,
      healthInsurances: []
    }
  },
  components: {
    Multiselect
  },
  mounted () {
    this.asyncFind('')
  },
  methods: {
    updateSelected (newSelected) {
      this.selected = newSelected
    },
    asyncFind (query) {
      query !== '' ? query = '&name=/' + query + '/i' : null
      this.healthInsurances = []
      this.isLoading = true
      console.log(query)
      const _uri = this.config.APIURIBase + 'healthInsurances/?_fields=name' + query
      console.log('_uri: ', _uri)
      this.$http.get(_uri).then((response) => {
        this.healthInsurances = response.body
        this.isLoading = false
      }, (response) => {
        console.log('deu erro no select: ', response)
        this.isLoading = false
      })
    }
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      general: state => {
        const { general } = state.configurator
        return general
      }
    })
  }
}
</script>

<style>
</style>
