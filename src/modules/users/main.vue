<template>
    <section class="section">
      <div class="container">
        <h1 class="title">{{ general.title }}</h1>
        <h2 class="subtitle">{{ general.subTitle }}</h2>
        <hr>
        <!-- Main container -->
        <nav class="level">
          <!-- Left side -->
          <div class="level-left" v-if="appliedFilters()">
            <span class="">Filtro aplicado:&nbsp;</span>
            <span class="tag is-warning is-medium">
              [{{ (filters.search.fieldName === 'q') ? 'Todos' : filters.search.fieldName }}] {{ filters.search.text }}
              <button @click="clearSearchFields()" class="delete is-small"></button>
            </span>
          </div>
          <div class="level-left" v-else>
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ pagination.total }}</strong> {{ general.title }}
              </p>
            </div>
            <div class="level-item">
              <p class="control has-addons">
                <span class="select">
                  <select :class="getCSSState()" @change="selectChanged" v-model="control.filters.search.fieldName">
                    <option value="q">Todos</option>
                    <option v-for="(col, index) in collection" v-if="isSearchFilter(col)" :value="index">{{ col.label }}</option>
                  </select>
                </span>
                <input :class="'input ' + getCSSState()" type="text"
                      ref="searchTextField"
                       v-focus
                       v-model="control.filters.search.text"
                       @keyup.enter="(control.filters.search.text.length > 3) ? localUpdateSearchFilters() : null"
                       placeholder="Filtrar o resultado">
                <button class="button is-info"
                        :disabled="control.filters.search.text.length <= 3"
                        @click="localUpdateSearchFilters">
                  Filtrar
                </button>
              </p>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-right">
            <p class="level-item"><a :class="getCSSState()" @click="removeAllBooleanFilter([])"><strong>Todos</strong></a></p>
            <p class="level-item"
               v-for="(col, index) in collection"
               v-if="col.type === 'boolean'">
              <a :class="getCSSState()" @click="localAddBooleanFilter(index)" v-if="isBooleanApplied(index) === false">{{ col.label }}</a>
              <span v-else class="tag is-warning is-medium">
                {{ col.label }}
                <button @click="localRemoveBooleanFilter(index)" :class="'delete is-small ' + getCSSState()"></button>
              </span>
            </p>


            <p class="level-item"><a :class="'button is-success ' + getCSSState()" @click="newDocument()">Novo</a></p>
          </div>
        </nav>

        <div ref="tableDiv" class="tableDivClass">
          <transition name="fade">
            <table class="table" v-show="transitionTable">
              <thead>
                <tr>
                  <th v-for="(col, index) in collection" v-if="isVisibleHeader(col)" :class="col.table.header.class">
                    <a :class="control.disableSortColumns === true ? 'is-disabled': ''" @click="localAddSortColumn(index)">
                      <i :class="getCSSSorteColumnSate(index)" aria-hidden="true"></i> {{ col.label }}
                    </a>
                  </th>
                  <th class="is-hidden-touch">
                    <a :class="control.disableSortColumns === true ? 'is-disabled': ''" @click="localAddSortColumn('createdAt')">
                      <i :class="getCSSSorteColumnSate('createdAt')" aria-hidden="true"></i> Criado em
                    </a>
                  </th><!-- criado em  -->
                  <th></th><!-- botao editar -->
                  <th></th><!-- excluir -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="doc in docs">
                  <td v-for="(col, index) in collection" v-if="isVisibleHeader(col)" :class="col.table.header.class">{{ getValueField(doc, col, index) }}</td>
                  <td class="is-hidden-touch" v-if="doc['createdAt'] !== undefined">
                    {{  doc['createdAt'] | moment('DD/MM/YYYY HH:mm') }}
                  </td>
                  <td class="is-hidden-touch" v-else>
                  </td>
                  <td class="is-icon">
                    <a @click="updateDocument(doc)">
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
          </transition>
        </div>
        <dm-pagination :current-pag="pagination.currentPag"
                       :total="pagination.total"
                       :page-limite="pagination.limit"
                       :is-loading="isLoading()"
                       @set-current-pag="changePag"></dm-pagination>
  </div>

  <dm-modal :control="modalIsOpened()" :modal-state="getModalState()" :document="control.modal.document" @set-pag="changePag" @close-modal="setModalClosed"></dm-modal>

</section>
</template>

<script>
import moment from 'moment'
import localePTBR from 'moment/locale/pt-br'

import dmModal from './components/modal.vue'
import Spinner from 'spin'
let spinner

import topbar from 'topbar'
import { mapState, mapActions } from 'vuex'
import dmPagination from '../ui/pagination.vue'

import showNotification from '../../utils/notification'

export default {
  name: 'dmUsers',
  data () {
    return {
      transitionTable: false,
      docs: [],
      control: {
        modal: {
          show: false,
          state: 'new',
          document: {}
        },
        disableSortColumns: false,
        isLoading: false,
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
    dmPagination,
    dmModal
  },
  mounted () {
    moment().locale('pt-BR', localePTBR)
    topbar.config(this.topbarConfig)
    spinner = new Spinner(this.spinnerConfig)
    this.getAll()
  },
  methods: {
    ...mapActions([
      'updateUserSession',
      'updateCurrentPag',
      'updateTotalDocs',
      'updateFiltersSearch',
      'addBooleanFilter',
      'removeBooleanFilter',
      'removeAllBooleanFilter',
      'addSortColumn'
    ]),
    newDocument () {
      this.control.modal.document = {}
      this.setModalState('new')
      this.setModalOpened()
    },
    updateDocument (doc) {
      console.log('doc: ', JSON.stringify(doc))
      this.control.modal.document = doc
      this.setModalState('update')
      this.setModalOpened()
    },
    getModalState () {
      return this.control.modal.state
    },
    setModalState (state) {
      this.control.modal.state = state
    },
    modalIsOpened () {
      return this.control.modal.show === true
    },
    setModalOpened () {
      this.control.modal.show = true
    },
    setModalClosed () {
      this.control.modal.show = false
    },
    appliedFilters () {
      return this.filters.search.state === 'applied'
    },
    selectChanged () {
      this.$refs.searchTextField.focus()
    },
    localUpdateSearchFilters () {
      const _search = this.control.filters.search
      this.updateFiltersSearch({ text: _search.text, fieldName: _search.fieldName, state: 'applied' })
    },
    localRemoveBooleanFilter (field) {
      this.removeBooleanFilter(field)
    },
    localAddBooleanFilter (field) {
      this.addBooleanFilter(field)
    },
    isBooleanApplied (index) {
      const _boolean = this.filters.boolean
      if (_boolean.indexOf(index) > -1) {
        return true
      }
      return false
    },
    clearSearchFields () {
      const _obj = { text: '', fieldName: 'q', state: '' } // defino o objeto para zerar as propriedades
      this.control.filters.search = _.clone(_obj) // esta em meu data
      this.updateFiltersSearch(_obj) // eh uma mutations invocada por uma action no vuex
    },
    changePag (pag) {
      this.updateCurrentPag(pag)
      this.getAll()
    },
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
        case 'text':
          if (doc[index] !== undefined) {
            if (doc[index].length > this.config.grid.textCropLength) {
              return doc[index].substring(0, this.config.grid.textCropLength - 3) + '...'
            }
          }
          return doc[index]
        case 'email':
          if (doc[index] !== undefined) {
            if (doc[index].length > this.config.grid.textCropLength) {
              return doc[index].substring(0, this.config.grid.textCropLength - 3) + '...'
            }
          }
          return doc[index]
        case 'date':
          if (doc[index] !== undefined) {
            return moment(doc[index]).format('DD/MM/YYYY HH:mm')
          }
          return ''
        default:
          return doc[index]
      }
    },
    startLoading () {
      this.control.disableSortColumns = true
      this.transitionTable = false
      this.control.isLoading = true
      spinner.spin(this.$refs.tableDiv)
      topbar.show()
    },
    stopLoading () {
      this.control.disableSortColumns = false
      clearTimeout(this.startProcess)
      this.control.isLoading = false
      spinner.stop()
      topbar.hide()
      this.transitionTable = true
    },
    isLoading () {
      return this.control.isLoading
    },
    getCSSState () {
      if (this.isLoading() === true) {
        return 'is-disabled'
      }
      return ''
    },
    localAddSortColumn (column) {
      if (this.isLoading() === false) {
        this.control.disableSortColumns = true
        this.addSortColumn({ field: column, sort: this.getSortColumnState(column) })
        this.changePag(1)
      }
    },
    getSortColumnState (column) {
      if (this.sort.indexOf('-' + column) > -1) {
        return 'desc'
      } else if (this.sort.indexOf(column) > -1) {
        return 'asc'
      }
      return ''
    },
    getCSSSorteColumnSate (column) {
      if (this.getSortColumnState(column) === 'asc') {
        return 'fa fa-arrow-circle-o-down fa-lg'
      } else if (this.getSortColumnState(column) === 'desc') {
        return 'fa fa-arrow-circle-o-up fa-lg'
      }
      return ''
    },
    getAll () {
      const startProcess = setTimeout(() => {
        if (this.isLoading() === false) {
          this.startLoading()
        }
      }, this.config.grid.delayLoading)

      const _boolean = this.filters.boolean
      const _search = this.filters.search
      const _limit = this.pagination.limit
      let _pag = this.pagination.currentPag
      let _params = ''
      const _fields = this.returnableColumnFields.join() + ',createdAt,createdById,updatedAt,updatedById'
      const _sort = this.sort.join()

      if (_search.state === 'applied') {
        _params += '&' + _search.fieldName + '='
        if (_search.fieldName === 'q') {
          _params += _search.text
        } else {
          _params += '/' + _search.text + '/i'
        }
      }

      _boolean.forEach((element, index) => {
        _params += '&' + element + '=true'
      })

      _params += '&_limit=' + _limit
      _params += '&_pag=' + _pag

      // GET /someUrl
      const _uri = this.config.APIURIBase + this.API.resource + '/?_fields=' + _fields + _params + '&_sort=' + _sort
      this.$http.get(_uri).then((response) => {
        this.updateTotalDocs(response.headers.get('X-Total-Count'))
        this.docs = response.body
        this.stopLoading()
        clearTimeout(startProcess)
      }, (response) => {
        // error callback
        this.stopLoading()
        clearTimeout(startProcess)
        showNotification({
          title: '[ Erro de acesso a API ]',
          message: 'Houve um erro ao acessar a API do sistema. Por favor, entre em contato com o administrador do sistema.',
          type: 'danger',
          duration: 5000
        })
      })
    }
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.users
        return general
      },
      API: state => {
        const { API } = state.users
        return API
      },
      collection: state => {
        const { collection } = state.users
        return collection
      },
      returnableColumnFields: state => {
        const { collection } = state.users
        let _arr = []
        Object.keys(collection).forEach((element) => {
          if (collection[element].APIReturnable === true) {
            _arr.push(element)
          }
        })
        return _arr
      },
      config: state => {
        const { config } = state
        return config
      },
      topbarConfig: state => {
        const { config } = state
        return config.topbar
      },
      spinnerConfig: state => {
        const { config } = state
        return config.spinner
      },
      pagination: state => {
        const { config } = state
        return config.pagination
      },
      filters: state => {
        const { filters } = state.users
        return filters
      },
      sort: state => {
        let _arr = []
        const { sort } = state.users
        sort.forEach((element, index) => {
          element['sort'] === 'desc' ? _arr.push('-' + element['field']) : _arr.push(element['field'])
        })
        return _arr
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
      this.updateCurrentPag(1)
      this.getAll()
    },
    'filters.boolean' (val, oldVal) {
      this.updateCurrentPag(1)
      this.getAll()
    }
  }
}
</script>

<style lang="scss">
  @import '../../scss/config';

  .tableDivClass {
    min-height: $tableDivHeight;
    background-color: $tableDivBgColor;
  }

  th a {
    color: $columnHeaderLink;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity $fadeGridTime;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

</style>
