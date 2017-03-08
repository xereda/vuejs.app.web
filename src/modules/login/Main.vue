<template>
  <section class="hero is-fullheight is-dark is-bold">

    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Acesso
            </h1>
            <div class="box">
              <label class="label">Email</label>
              <p class="control">
                <input class="input" type="text" placeholder="email@dominio.com.br">
              </p>
              <label class="label">Senha</label>
              <p class="control">
                <input class="input" type="password" placeholder="●●●●●●●">
              </p>
              <hr>
              <p class="control">
                <button @click="$router.push({ name: 'providers' })" class="button is-primary">Entrar</button>
                <button class="button is-default">Cancelar</button>
              </p>
            </div>
            <p class="has-text-centered">
              <a href="register.html">Testar</a>
              |
              <a href="#">Recuperar senha</a>
              |
              <a href="#">Necessita de ajuda?</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'dmProviders',
  data () {
    return {
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    ...mapActions([
    ])
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.login
        return general
      }
    })
  },
  directives: {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
  @import '../../scss/config';


</style>
