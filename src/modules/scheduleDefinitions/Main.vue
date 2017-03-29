<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ general.title }}</h1>
      <h2 class="subtitle">{{ general.subTitle }}</h2>
      <hr>
      {{ session.workplaces }}
      <dm-form-search-select v-model="providerSelectedObject"
                 api-resource="providers"
                 :disabled="false"
                 label="Prestador *"
                 select-label=""></dm-form-search-select>
    </div>

<hr>
    <pre>

      yJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGQ2NmIzMTM5NWRlNTk2MzMwNWYzZjkiLCJleHAiOjE0OTA5MDIwMTYuMDgyfQ.X3TxGV59G3UJqqA6mVnQ3mcZWaOeiwoyoUtuKghkd44 string
      state.js?76cd:10 {"_id":"58d66b31395de5963305f3f9","name":"XEREDA","email":"xereda@me.com","active":true,"admin":false,"lastChangeDate":"2017-03-29T18:29:26.186Z","workplaces":[{"_id":"57b378bec9dc733d16851976","name":"CLÍNICA SÃO MARCOS NOVA"}]} string
      routes.js?3ca5:55 Object {name: "scheduleDefinitions", meta: Object, path: "/scheduleDefinitions", hash: "", query: Object…} Object {name: null, meta: Object, path: "/", hash: "", query: Object…}
      vue.common.js?e881:7199 You are running Vue in development mode.
      Make sure to turn on production mode when deploying for production.
      See more tips at https://vuejs.org/guide/deployment.html
      auth.js?8404:16 response.data:  Object {success: true, _id: "58d66b31395de5963305f3f9", lastChangeDate: "2017-03-29T18:29:26.186Z"}
      backend.js:1 [vue-devtools] Ready. Detected Vue v2.2.4
      SearchSelect.vue?9fac:86 vai passar este objeto:  Object {__ob__: Observer}

    </pre>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import { DmFormSelect,
         DmFormSearchSelect,
         DmFormMultiSelect } from '../../utils/ui/form/main'

export default {
  data () {
    return {
      providerSelectedObject: '',
      formFields: {
        provider: ''
      }
    }
  },
  components: {
    DmFormSelect,
    DmFormMultiSelect,
    DmFormSearchSelect
  },
  computed: {
    ...mapState({
      session: state => {
        const { user } = state
        return user
      },
      general: state => {
        const { general } = state.scheduleDefinitions
        return general
      },
      config: state => {
        const { config } = state
        return config
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
