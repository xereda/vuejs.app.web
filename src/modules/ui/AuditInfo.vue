<template lang="html">
  <collapse accordion is-fullwidth class="margem" @on-click="changeCollapseState">
     <collapse-item :selected="userDecisions.modal.AuditInfo.collapseOpened" title="Informações de auditoria">
       <div class="columns is-multiline">
         <div class="column is-3">
           <label class="label">Criado em:</label>
           <p class="control has-icon">
             <input type="text" :value="AuditInfo.createdBy.date" class="input is-disabled" />
             <i class="fa fa-calendar"></i>
           </p>
         </div>
         <div class="column is-3">
           <label class="label">Criado por:</label>
           <p class="control has-icon">
             <input type="text" :value="AuditInfo.createdBy.name" class="input is-disabled" />
             <i class="fa fa-user"></i>
           </p>
         </div>
         <div class="column is-3">
           <label class="label">Alterado em:</label>
           <p class="control has-icon">
             <input type="text" :value="AuditInfo.updatedBy.date" class="input is-disabled" />
             <i class="fa fa-calendar"></i>
           </p>
         </div>
         <div class="column is-3">
           <label class="label">Alterado por:</label>
           <p class="control has-icon">
             <input type="text" :value="AuditInfo.updatedBy.name" class="input is-disabled" />
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
import Collapse from './collapse/Collapse.vue'
import CollapseItem from './collapse/Item.vue'

export default {
  data () {
    return {
      AuditInfo: {
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
      API (state) {
        const { API } = state[this.resource]
        return API
      },
      userDecisions (state) {
        const { ux } = state[this.resource]
        return ux.userDecisions
      }
    })
  },
  mounted () {
    this.getAuditInfo()
  },
  methods: {
    changeCollapseState (param) {
      this.$store.commit(this.mutationPrefix + '.UX_MODAL_COLLAPSE_STATE', param === 'opened')
    },
    getAuditInfo () {
      // GET /someUrl
      const _uri = this.config.APIURIBase + this.API.resource + '/' + this.documentId + '/?_populate=createdById,updatedById&_fields=createdAt,updatedAt,createdById,updatedById'
      this.$http.get(_uri).then((response) => {
        this.showAuditInfo(response.body)
      }, (response) => {
        // error callback
      })
    },
    showAuditInfo (data) {
      if (data !== undefined) {
        this.AuditInfo.createdBy.name = data.createdById.name
        this.AuditInfo.createdBy.date = moment(data.createdAt).format('DD/MM/YYYY HH:mm')
        this.AuditInfo.updatedBy.name = data.updatedById.name
        this.AuditInfo.updatedBy.date = moment(data.updatedAt).format('DD/MM/YYYY HH:mm')
      }
    }
  },
  components: {
    Collapse,
    CollapseItem
  },
  watch: {
    documentId (val) {
      this.getAuditInfo()
    },
    lastDocUpdateDate (val, oldVal) {
      this.getAuditInfo()
    }
  },
  props: [
    'documentId',
    'lastDocUpdateDate',
    'resource',
    'mutationPrefix'
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
