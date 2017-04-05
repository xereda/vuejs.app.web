<template>
  <section class="section">
    <div class="container is-fluid">
      <h1 class="title">Definição da Agenda</h1>
      <h2 class="subtitle">Defina os regras para agendamento</h2>
      <hr>
      <div class="columns">
          <div class="column">
            <a class="button is-primary is-fullwidth" @click="goRouteByName('scheduleDefinitions.generator')">
              <span class="icon is-small">
                <i class="fa fa-file-text-o"></i>
              </span>
              <span>Gerar definições em lote</span>
            </a>
          </div>
          <div class="column">
            <a class="button is-success is-fullwidth">
              <span class="icon is-small">
                <i class="fa fa-file-o"></i>
              </span>
              <span>Nova definição</span>
            </a>
          </div>
          <div class="column">
            <a class="button is-danger is-fullwidth">
              <span class="icon is-small">
                <i class="fa fa-list"></i>
              </span>
              <span>Listar definições</span>
            </a>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import navigation from 'mixins/navigation'

export default {
  mixins: [
    navigation
  ],
  methods: {
  }
}
</script>

<style lang="css">
</style>
