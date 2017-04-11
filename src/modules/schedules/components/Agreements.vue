<template>
<ul>CONVÊNIOS
  <br><br>
    <li>
      <a class="panel-block">
        <span class="">&nbsp;</span>
        <p>&nbsp;Todos</p>
      </a>
      <a class="panel-block" v-for="agreement in agreementsList.agreements">
        <span :class="defineAgreementCss(agreement.name)">&nbsp;</span>
        <p>&nbsp;{{ agreement.name }}</p>
      </a>
    </li>
</ul>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      selected: 'all'
    }
  },
  methods: {
    defineAgreementCss (agreementName) {
      console.log('agreementsColorClasses: ', this.agreementsColorClasses)
      const className = this.agreementsColorClasses.filter(e => e.agreementName === agreementName.toUpperCase())
      console.log('className: ', className)
      if (_.isEmpty(className)) return 'tag tag-outros'
      return 'tag ' + className[0].class
    }
  },
  computed: {
    ...mapGetters([
      'agreementsColorClasses'
    ])
  },
  props: [
    'agreementsList'
  ]
}
</script>

<style lang="css">
  .tag-bradesco {
    background-color: pink;
  }
  .tag-outros {
    background-color: white;
    border: 1px solid black;
  }
  .tag-uniodonto {
    background-color: rgb(236, 141, 41);
  }
  .tag-cassi {
    background-color: rgb(224, 224, 135);
  }
</style>
