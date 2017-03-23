<template lang="html">
  <div class="">
    <table class="table">
      <thead>
        <tr>
          <th :class="dataTableDef[propertie].class" v-for="propertie in dataTableProperties" v-if="dataTableDef[propertie].visible">{{ dataTableDef[propertie].label }}</th>
          <th v-if="!updateItemDisabled"></th>
          <th v-if="!delItemDisabled"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td :class="dataTableDef[propertie].class" v-for="propertie in dataTableProperties" v-if="dataTableDef[propertie].visible">{{ item[propertie] }}</td>
          <td class="is-icon" v-if="!updateItemDisabled">
            <a @click="updateItem(item._id)">
              <span class="icon">
                <i class="fa fa-folder-open"></i>
              </span>
            </a>
          </td>
          <td class="is-icon" v-if="!delItemDisabled">
            <a @click="deleteItem(item._id)">
              <span class="icon">
                <i class="fa fa-trash"></i>
              </span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Http from '../../services/http'
import { showAPIErrors, showAPISuccess } from '../../services/messenger/main'
import moment from 'moment'
import localePTBR from 'moment/locale/pt-br'

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    moment().locale('pt-BR', localePTBR)
    this.getList()
  },
  methods: {
    getList () {
      console.log('vai atualizar a lista')
      this.list = []
      Http.get(this.resourceURI)
      .then(response => {
        console.log('dentro do subdocumentolist: ', response.data)
        this.hydrateData(response.data)
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    deleteItem (item) {
      Http.delete(this.resourceURI + '/' + item)
      .then(response => {
        showAPISuccess({ title: 'OK', message: this.delItemMessage })
        this.getList()
        if (this.actionAfterDelete) this.$emit('action-after-delete', item)
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    updateItem (item) {
      console.log('vai abrir o documento: ', item)
      this.$emit('update-action', item)
    },
    hydrateData (data) {
      data.forEach(element => {
        const _objPush = {}
        this.dataTableProperties.forEach(propertie => {
          const _field = this.dataTableDef[propertie].field.split('.')
          if (_field.length > 1) {
            _objPush[propertie] = element[_field[0]][_field[1]]
          } else {
            _objPush[propertie] = element[_field[0]]
          }
          if (this.dataTableDef[propertie].type !== undefined && this.dataTableDef[propertie].type === 'date') {
            if (_objPush[propertie] === undefined) {
              _objPush[propertie] = ''
            } else if (_objPush[propertie] !== '') {
              _objPush[propertie] = moment.utc(_objPush[propertie]).format('DD/MM/YYYY')
            }
          }
          if (_objPush[propertie] === undefined) {
            _objPush[propertie] = ''
          }
        })
        // _id: element.specialty._id,
        // specialty: element.specialty.name,
        // regionalCouncilCode: element.regionalCouncilCode
        this.list.push(_objPush)
      })
    }
  },
  computed: {
    resourceURI () {
      return '/' + this.ApiResource + '/' + this.mainId + '/' + this.subDoc
    },
    dataTableDef () {
      return this.dataDef
    },
    dataTableProperties () {
      return Object.keys(this.dataTableDef)
    }
  },
  props: {
    ApiResource: {
      type: String,
      required: true
    },
    mainId: {
      type: String,
      required: true
    },
    subDoc: {
      type: String,
      required: true
    },
    updateList: {
      type: Boolean,
      default: false
    },
    dataDef: {
      type: Object,
      required: true
    },
    delItemMessage: {
      type: String,
      default: 'Item removido com sucesso!'
    },
    delItemDisabled: {
      type: Boolean,
      default: false
    },
    updateItemDisabled: {
      type: Boolean,
      default: true
    },
    actionAfterDelete: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    updateList (val) {
      if (val) this.getList()
    }
  }
}
</script>

<style lang="css">
</style>
