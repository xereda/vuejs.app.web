<template>
  <div class="tile is-child box">
    <p class="title"><h1><b>CONVÊNIOS</b></h1></p>
      <ul>
        <li v-for="convenio in convenios" type="disc" id="lista">
          <a class="panel-block">{{ convenio }}</a>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      convenios: [
        'Particular',
        'Agemed',
        'Amil',
        'Bradesco',
        'Cassi',
        'Unimed'
      ]
    }
  }
}
</script>
<style>
</style>
