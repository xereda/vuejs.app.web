<template>
  <div>

    <h3>USERS</h3>

    <h4>{{ user }}</h4>

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
