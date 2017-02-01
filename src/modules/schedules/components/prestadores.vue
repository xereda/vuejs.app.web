<template>
  <div class="tile is-child box">
    <p class="title"><h1><b>PRESTADORES</b></h1></p>
      <ul>
        <li v-for="prestador in prestadores">
          <a class="panel-block"> {{ prestador }} </a>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prestadores: [
        'Maurino Salazar',
        'Paula Guimarães (Cardiologia)',
        'Sérgio Silva Souza (Cardiologia)'
      ]
    }
  }
}
</script>
<style>
</style>
