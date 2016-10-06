<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">Cadastro de usuários</h1>
        <h2 class="subtitle">aqui entra o subtitle</h2>
        <hr>

    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th class="is-hidden-mobile">E-mail</th>
          <th class="is-hidden-mobile">Admin?</th>
          <th class="is-hidden-mobile">Ativo?</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doc in docs">
          <td>{{ doc.name }}</td>
          <td class="is-hidden-mobile">{{ doc.email }}</td>
          <td class="is-hidden-mobile">{{ (doc.admin) ? 'Sim' : 'Não' }}</td>
          <td class="is-hidden-mobile">{{ (doc.active) ? 'Sim' : 'Não' }}</td>
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
</section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    const payload = {
      _id: '57a2bb75be785a529de5fb33',
      name: 'Jackson Ricardo Schroeder',
      email: 'jacksonrs@gmail.com',
      lastSessionDate: new Date()
    }
    setTimeout(() => {
      this.updateUserSession(payload)
    }, 2000)
  },
  methods: {
    ...mapActions(['updateUserSession'])
  },
  computed: {
    ...mapState({
      user: state => {
        const { name, email, _id } = state.user
        return `O usuário logado é ${name} e seu email é ${email} e seu _id é ${_id}.`
      }
    })
  }
}
</script>

<style scope>
</style>
