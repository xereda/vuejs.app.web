<template lang="html">
<div>
  <section class="hero is-info">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
      <div class="container">
        <nav class="nav">
          <div class="nav-left">
            <router-link class="nav-item is-brand" to="/dashboard">
                <img src="../../img/docmob_header.svg" alt="Logo">
            </router-link>
          </div>
          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div class="nav-center">
            <a class="nav-item" href="#">
              <span class="icon">
                <i class="fa fa-facebook-official"></i>
              </span>
            </a>
            <a class="nav-item" href="#">
              <span class="icon">
                <i class="fa fa-twitter"></i>
              </span>
            </a>
          </div>


          <div class="nav-right nav-menu">
            <a class="nav-item is-active">
              Início
            </a>
            <a class="nav-item">
              DocMob
            </a>
            <a class="nav-item">
              Contato
            </a>
            <span class="nav-item">
              <a class="button is-info is-inverted">
                <span class="icon is-small">
                  <i class="fa fa-download"></i>
                </span>
                <span>Download</span>
              </a>
            </span>
          </div>
        </nav>
      </div>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          {{ session.workplace.name }}
        </h1>
        <h2 class="subtitle">
          <span>
            {{ session.provider.name }}
            <span class="tag is-small">
              sair
              <button @click="logOff()" class="delete is-small"></button>
            </span>
          </span>
        </h2>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <li :class="($route.name === 'dashboard') ? 'is-active' : ''"><router-link to="/dashboard">Dashboard</router-link></li>
            <li :class="($route.name === 'users') ? 'is-active' : ''"><router-link to="/users">Usuários</router-link></li>
            <li :class="($route.name === 'configurator') ? 'is-active' : ''"><router-link to="/configurator">Configuração</router-link></li>
          </ul>
        </div>
      </nav>
    </div>

  </section>

  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-center">
        <a :class="($route.name === 'healthInsurances') ? 'nav-item is-tab is-active' : 'nav-item is-tab'"><router-link to="/healthInsurances">Planos de Saúde</router-link></a>
        <a class="nav-item is-tab" v-for="">Level</a>
        <a class="nav-item is-tab">Media object</a>
        <a class="nav-item is-tab">Menu</a>
        <a class="nav-item is-tab">Message</a>
        <a class="nav-item is-tab">Modal</a>
        <a class="nav-item is-tab">Nav</a>
        <a class="nav-item is-tab">Pagination</a>
        <a class="nav-item is-tab">Panel</a>
        <a class="nav-item is-tab">Tabs</a>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    logOff () {
      console.log('logOff')
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.healthInsurances
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      config: state => {
        const { config } = state
        return config
      }
    })
  },
  props: [ 'title' ]
}
</script>

<style lang="css">
</style>
