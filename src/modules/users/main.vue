<template>
    <section class="section">
      <div class="container">
        <h1 class="title">Cadastro de usuários</h1>
        <h2 class="subtitle">aqui entra o subtitle</h2>
        <hr>
        <!-- Main container -->
        <nav class="level">
          <!-- Left side -->
          <div class="level-left" v-if="filters.search.state === 'applied'">
            <span class="">Filtro aplicado:&nbsp;</span>
            <span class="tag is-warning is-medium">
              [{{ (filters.search.fieldName === 'q') ? 'Todos' : filters.search.fieldName }}] {{ filters.search.text }}
              <button @click="clearSearchFields()" class="delete is-small"></button>
            </span>
          </div>
          <div class="level-left" v-else>
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ pagination.total }}</strong> Usuários
              </p>
            </div>
            <div class="level-item">
              <p class="control has-addons">
                <span class="select">
                  <select @change="selectChanged" v-model="control.filters.search.fieldName">
                    <option value="q">Todos</option>
                    <option v-for="(col, index) in collection" v-if="isSearchFilter(col)" :value="index">{{ col.label }}</option>
                  </select>
                </span>
                <input class="input" type="text"
                      ref="searchTextField"
                       v-focus
                       v-model="control.filters.search.text"
                       @keyup.enter="(control.filters.search.text.length > 3) ? localUpdateFiltersSearch() : null"
                       placeholder="Filtrar o resultado">
                <button class="button is-primary"
                        :disabled="control.filters.search.text.length <= 3"
                        @click="localUpdateFiltersSearch">
                  Filtrar
                </button>
              </p>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <p class="level-item"><strong>Todos</strong></p>
            <p class="level-item"><a>Ativos</a></p>
            <p class="level-item"><a>Administradores</a></p>
            <p class="level-item"><a class="button is-success" @click="modalOpen()">Novo</a></p>
          </div>
        </nav>

        <table class="table">
          <thead>
            <tr>
              <th v-for="col in collection" v-if="isVisibleHeader(col)" :class="col.table.header.class">{{ col.label }}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doc in docs">
              <td v-for="(col, index) in collection" v-if="isVisibleHeader(col)" :class="col.table.header.class">{{ getValueField(doc, col, index) }}</td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-folder-open"></i>
                </a>
              </td>
              <td class="is-icon">
                <a href="#">
                  <i class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <dm-pagination :current-pag="pagination.currentPag"
                       :total="pagination.total"
                       :page-limite="pagination.limit"
                       @set-current-pag="changePag"></dm-pagination>

  filters: {{ filters.search }} | control.filters: {{ control.filters.search }}
  </div>
</section>
</template>

<script>
import topbar from 'topbar'
import { mapState, mapActions } from 'vuex'
import dmPagination from '../ui/pagination.vue'

export default {
  name: 'dmUsers',
  data () {
    return {
      docs: [],
      control: {
        filters: {
          search: {
            text: '',
            fieldName: 'q',
            state: ''
          }
        }
      }
    }
  },
  components: {
    dmPagination
  },
  mounted () {
    console.log(this.topbarConfig)
    topbar.config(this.topbarConfig)
    this.getAll()
  },
  methods: {
    ...mapActions([
      'updateUserSession',
      'updateCurrentPag',
      'updateTotalDocs',
      'updateFiltersSearchUsers'
    ]),
    selectChanged () {
      console.log('dentro')
      this.$refs.searchTextField.focus()
    },
    localUpdateFiltersSearch () {
      const _search = this.control.filters.search
      this.updateFiltersSearchUsers({ text: _search.text, fieldName: _search.fieldName, state: 'applied' })
    },
    clearSearchFields () {
      const _obj = { text: '', fieldName: 'q', state: '' } // defino o objeto para zerar as propriedades
      this.control.filters.search = _.clone(_obj) // esta em meu data
      this.updateFiltersSearchUsers(_obj) // eh uma mutations invocada por uma action no vuex
    },
    changePag (pag) {
      this.updateCurrentPag(pag)
      this.getAll()
    },
    // localUpdateFiltersSearch () {
    //   this.control.filter.search.applied = true
    //   this.updateFiltersSearchUsers(control.filters.search)
    // },
    isSearchFilter (col) {
      if (((col.type === 'text') || (col.type === 'email')) && (col.filter === true)) {
        return true
      }
      return false
    },
    isVisibleHeader (col) {
      if (col.table && col.table.header && col.table.header.visible === true) {
        return true
      }
      return false
    },
    getValueField (doc, col, index) {
      switch (col.type) {
        case 'boolean':
          if ((doc[index] === undefined) || (doc[index] === false)) {
            return 'Não'
          }
          return 'Sim'
        default:
          return doc[index]
      }
    },
    getAll () {
      topbar.show()
      const _search = this.filters.search
      const _limit = this.pagination.limit
      let _params = ''

      if (_search.state === 'applied') {
        _params += '&' + _search.fieldName + '='
        if (_search.fieldName === 'q') {
          _params += _search.text
        } else {
          _params += '/' + _search.text + '/i'
        }
        this.updateCurrentPag(1)
      }

      let _pag = this.pagination.currentPag
      _params += '&_limit=' + _limit
      _params += '&_pag=' + _pag

      // GET /someUrl
      this.$http.get('http://localhost:5000/users/?_fields=_id,name,email,active,admin' + _params).then((response) => {
        this.updateTotalDocs(response.headers.get('X-Total-Count'))
        this.docs = response.body
        topbar.hide()
      }, (response) => {
        // error callback
        console.log('erro no http: ', response)
        topbar.hide()
      })
    }
  },
  computed: {
    ...mapState({
      collection: state => {
        const { collection } = state.users
        return collection
      },
      topbarConfig: state => {
        const { config } = state
        return config.topbar
      },
      pagination: state => {
        const { config } = state
        return config.pagination
      },
      filters: state => {
        const { filters } = state.users
        return filters
      }
    })
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  watch: {
    'filters.search.state' (val, oldVal) {
      console.log('dentro do watch')
      this.getAll()
    }
  }
}
</script>

<style>
</style>
