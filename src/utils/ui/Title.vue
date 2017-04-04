<template lang="html">
<div class="is-hidden-mobile">
  <div class="hero-body">
    <div class="container is-fluid">
      <h1 class="title">
        {{ workplaceName }}
      </h1>
      <h2 class="subtitle">
        {{ userIdentification }}
        <!-- <span class="tag">
          &nbsp;sair&nbsp;
          <button class="delete is-small" @click="logOff()"></button>
        </span> -->
      </h2>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'sessionLogOff'
    ]),
    logOff () {
      console.log('logOff')
      this.sessionLogOff()
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      session: state => {
        const { user } = state
        return user
      },
      config: state => {
        const { config } = state
        return config
      }
    }),
    workplaceName () {
      if (this.session.workplaces === undefined || _.isEmpty(this.session.workplaces)) return 'Usuário sem local definido'
      if (_.isEmpty(this.session.workplaces[0].name) === false) return this.session.workplaces[0].name
      if (this.session.admin) return 'Administrador (sem local de trabalho definido)'
      return 'Você não tem um local de trabalho defenido.'
    },
    userIdentification () {
      return _.startCase(_.lowerCase(this.session.name)) + ' - ' + this.session.email
    }
  }
}
</script>

<style lang="css">
</style>
