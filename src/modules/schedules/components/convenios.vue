<template>
<ul>CONVÊNIOS
  <br><br>
    <li v-for="convenio in convenios">
      <a class="panel-block" v-if="convenio === 'Particular'">
        <span class="tag is-dark is-small">&nbsp;</span>
        <p>&nbsp;{{ convenio }}</p>
      </a>
      <a class="panel-block" v-if="convenio === 'Agemed'">
        <span class="tag is-light">&nbsp;</span>
          &nbsp;{{ convenio }}
      </a>
      <a class="panel-block" v-if="convenio === 'Amil'">
        <span class="tag is-info">&nbsp;</span>
          &nbsp;{{ convenio }}
      </a>
      <a class="panel-block" v-if="convenio === 'Bradesco'">
        <span class="tag is-danger">&nbsp;</span>
          &nbsp;{{ convenio }}
      </a>
      <a class="panel-block" v-if="convenio === 'Cassi'">
        <span class="tag is-warning">&nbsp;</span>
          &nbsp;{{ convenio }}
      </a>
      <a class="panel-block" v-if="convenio === 'Unimed'">
        <span class="tag is-success">&nbsp;</span>
          &nbsp;{{ convenio }}
      </a>
    </li>
</ul>
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
