<template>
    <section class="section">
      <div class="container">
        <h1 class="title">Cadastro de usuários</h1>
        <h2 class="subtitle">aqui entra o subtitle</h2>
        <hr>

    <table class="table">
      <thead>
        <tr>
          <th v-for="col in collection" v-if="col.table && col.table.header && col.table.header.visible === true" :class="col.table.header.class">{{ col.label }}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in docs">
          <td v-for="col in collection" v-if="col.table && col.table.header && col.table.header.visible === true" :class="col.table.header.class">{{ doc[col.name] }}</td>
          <td class="is-icon">
            <a href="#">
              <i class="fa fa-folder-open"></i>
            </a>
          </td>
          <td class="is-icon">
            <a href="#">
              <i class="fa fa-trash"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  {{ collection }}

</section>
</template>

<script>
// import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      docs: []
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    ...mapActions(['updateUserSession']),
    getAll () {
      const _params = ''
      // GET /someUrl
      this.$http.get('http://localhost:5000/users/?_fields=_id,name,email,active,admin' + _params).then((response) => {
        this.docs = response.body
      }, (response) => {
        // error callback
        console.log('erro no http: ', response)
      })
    }
  },
  computed: {
    ...mapState({
      collection: state => {
        const { collection } = state.users
        return collection
      }
    })
  }
}
</script>

<style scope>
</style>
