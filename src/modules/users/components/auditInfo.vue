<template lang="html">
  <collapse accordion is-fullwidth class="margem">
     <collapse-item title="Informações de auditoria">
       <div class="columns is-multiline">
         <div class="column is-3">
           <label class="label">Criado em:</label>
           <p class="control has-icon">
             <input type="text" :value="auditInfo.createdBy.date" class="input is-disabled" />
             <i class="fa fa-calendar"></i>
           </p>
         </div>
         <div class="column is-3">
           <label class="label">Criado por:</label>
           <p class="control has-icon">
             <input type="text" :value="auditInfo.createdBy.name" class="input is-disabled" />
             <i class="fa fa-user"></i>
           </p>
         </div>
         <div class="column is-3">
           <label class="label">Alterado em:</label>
           <p class="control has-icon">
             <input type="text" :value="auditInfo.updatedBy.date" class="input is-disabled" />
             <i class="fa fa-calendar"></i>
           </p>
         </div>
         <div class="column is-3">
           <label class="label">Alterado por:</label>
           <p class="control has-icon">
             <input type="text" :value="auditInfo.updatedBy.name" class="input is-disabled" />
             <i class="fa fa-user"></i>
           </p>
         </div>
       </div>
     </collapse-item>
     <!-- <collapse-item title="Elements">
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
     </collapse-item>
     <collapse-item title="Nests" selected>
       <collapse>
         <collapse-item title="Nest Child" selected>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
         </collapse-item>
       </collapse>
     </collapse-item> -->
   </collapse>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import CollapseObject from '../../../utils/collapse'

export default {
  data () {
    return {
      auditInfo: {
        createdBy: {
          name: '',
          date: ''
        },
        updatedBy: {
          name: '',
          date: ''
        }
      }
    }
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      API: state => {
        const { API } = state.users
        return API
      }
    })
  },
  mounted () {
    this.getAuditInfo()
  },
  methods: {
    getAuditInfo () {
      console.log('vai buscar as informacoes de auditoria do _id: ', this.documentId)
      // GET /someUrl
      const _uri = this.config.APIURIBase + this.API.resource + '/' + this.documentId + '/?_populate=createdById,updatedById&_fields=createdAt,updatedAt,createdById,updatedById'
      this.$http.get(_uri).then((response) => {
        this.showAuditInfo(response.body)
      }, (response) => {
        console.log('response.body: ', response.body)
        // error callback
      })
    },
    showAuditInfo (data) {
      console.log('informacoes de auditoria: ', data)
      if (data !== undefined) {
        this.auditInfo.createdBy.name = data.createdById.name
        this.auditInfo.createdBy.date = moment(data.createdAt).format('DD/MM/YYYY HH:mm')
        this.auditInfo.updatedBy.name = data.updatedById.name
        this.auditInfo.updatedBy.date = moment(data.updatedAt).format('DD/MM/YYYY HH:mm')
      }
    }
  },
  components: {
    Collapse: CollapseObject.Collapse,
    CollapseItem: CollapseObject.CollapseItem
  },
  watch: {
    documentId (val) {
      console.log('vai chamar vindo de uma alteracao em documentId')
      this.getAuditInfo()
    },
    lastDocUpdateDate (val, oldVal) {
      console.log('vai chamar vindo de uma alteracao em lastDocUpdateDate', val, oldVal)
      this.getAuditInfo()
    }
  },
  props: [
    'documentId',
    'lastDocUpdateDate'
  ]
}
</script>

<style lang="css" scoped>
  input {
    font-size: .88em;
  }
  .margem {
    margin-top: 25px;
    margin-bottom: 10px;
  }
</style>
