<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="columns">
        <div class="column">
         <dm-workplaces-list api-resource="providers"
                              :mainId="providerId"
                              subDoc="workplaces"
                              :update-list="updateList"
                              :data-def="dataTableDef"
                              :del-item-disabled="true"
                              ></dm-workplaces-list>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required } from 'vuelidate/lib/validators'

import { mapState } from 'vuex'

import _ from 'lodash'

import DmWorkplacesList from '../../../../utils/ui/form/SubDocumentsList.vue'

export default {
  name: 'DmProviderWorkplace',
  data () {
    return {
      formFields: {
        selectedObject: {},
        workplace: ''
      },
      updateList: false,
      dataTableDef: {
        _id: {
          field: 'workplace._id',
          visible: false,
          class: 'is-hidden-mobile'
        },
        workplace: {
          label: 'Local de Atendimento',
          field: 'workplace.name',
          visible: true,
          class: ''
        }
      }
    }
  },
  validations: {
    formFields: {
      workplace: {
        required
      }
    }
  },
  components: {
    DmWorkplacesList
  },
  methods: {
    saveForm () {
      // this.updateList = false
      // console.log('dentro do saveform')
      // console.log('------>>> : ', this.objectDataPost)
      // Http.post('/providers/' + this.providerId + '/blockedLives', this.objectDataPost)
      // .then(response => {
      //   console.log('response', response, response.data)
      //   this.updateList = true
      //   showAPISuccess({ title: 'OK', message: 'Vida relacionada ao prestador com sucesso!' })
      // })
      // .catch(error => {
      //   console.log(error.response)
      //   showAPIErrors(error.response)
      // })
    }
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.providers
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      breadcrumbs: state => {
        const { breadcrumbs } = state.providers.general
        return breadcrumbs
      }
    }),
    objectDataPost () {
      const _obj = {
        workplace: this.formFields.workplace,
        createdById: this.session._id
      }
      return _obj
    },
    enableSaveButton () {
      if (_.filter(this.$v.formFields, e => e.$invalid).length > 0) return false
      return true
    }
  },
  props: {
    providerId: {
      type: String,
      required: true
    }
  },
  watch: {
    'formFields.selectedObject' (val) {
      this.formFields.workplace = val._id
    }
  }
}
</script>

<style lang="css">
</style>
