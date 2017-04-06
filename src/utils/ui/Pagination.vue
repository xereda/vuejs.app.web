<template lang="html">
  <div>
    <nav class="pagination">
      <a :class="backButtonCSS" @click="setPage(currentPag - 1)" :disabled="defPrevButton()">Voltar</a>
      <a :class="nextButtonCSS" @click="setPage(currentPag + 1)" :disabled="defNextButton()">Próxima</a>
      <ul class="pagination-list">
        <li v-show="defFirstAndLastPageButtons()">
          <a :disabled="iscurrentPagInLoop(currentPag, 1)" :class="setCSSButton(currentPag, 1) + ''" @click="setPage(1)">1</a>
        </li>
        <li v-show="defFirstAndLastPageButtons()">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-for="pag in pages" v-show="pages.length > 1">
          <a :disabled="iscurrentPagInLoop(currentPag, pag)" :class="setCSSButton(currentPag, pag)" @click="setPage(pag)">{{ pag }}</a>
        </li>
        <li v-show="defFirstAndLastPageButtons()">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-show="defFirstAndLastPageButtons()">
          <a :disabled="iscurrentPagInLoop(currentPag, totalPages())" :class="setCSSButton(currentPag, totalPages())" @click="setPage(totalPages())">{{ totalPages() }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import _ from 'lodash'

const CENTRAL_PAGE_BUTTONS = 5 // informar um inteiro impar
const TOTAL_PAGE_BUTTONS = CENTRAL_PAGE_BUTTONS + 2 // nao alterar essa constante

export default {
  data () {
    return {
      loadingControl: false
    }
  },
  computed: {
    backButtonCSS () {
      if (this.isLoading === true) {
        return 'pagination-previous is-disabled'
      }
      return 'pagination-previous'
    },
    nextButtonCSS () {
      if (this.isLoading === true) {
        return 'pagination-next is-disabled'
      }
      return 'pagination-next'
    },
    pages () {
      const totalPages = this.totalPages()
      let _array = []

      if (totalPages <= TOTAL_PAGE_BUTTONS) {
        _array = _.range(1, totalPages + 1)
      } else if (this.currentPag <= CENTRAL_PAGE_BUTTONS) {
        _array = _.range(2, CENTRAL_PAGE_BUTTONS + 2)
      } else if ((this.currentPag + (_.toInteger(CENTRAL_PAGE_BUTTONS / 2))) >= totalPages) {
        _array = _.range(totalPages - CENTRAL_PAGE_BUTTONS, totalPages)
      } else {
        _array = _.range(this.currentPag - 2, this.currentPag + (CENTRAL_PAGE_BUTTONS - 2))
      }

      return _array
    }
  },
  mounted () {
  },
  methods: {
    setCSSButton (currentPag, pag) {
      let _css = 'pagination-link'
      if (this.iscurrentPagInLoop(currentPag, pag)) {
        _css += ' is-current'
      }
      if (this.isLoading === true) {
        _css += ' is-disabled'
      }
      return _css
    },
    iscurrentPagInLoop (currentPag, pag) {
      if (currentPag === pag) {
        return true
      }
      return false
    },
    setPage (pag) {
      console.log('isLoading: ', this.isLoading)
      this.$emit('set-current-pag', pag)
    },
    defPrevButton () {
      return this.currentPag < 2
    },
    defNextButton () {
      return (this.currentPag * this.pageLimite) >= this.total
    },
    defFirstAndLastPageButtons () {
      return ((this.total / this.pageLimite) >= TOTAL_PAGE_BUTTONS)
    },
    totalPages () {
      const _t = _.toInteger(this.total / this.pageLimite)
      if ((this.total % this.pageLimite) > 0) {
        return _t + 1
      }
      return _t
    }
  },
  props: [ 'total', 'currentPag', 'pageLimite', 'isLoading' ],
  components: {}
}
</script>

<style lang="css">
</style>
