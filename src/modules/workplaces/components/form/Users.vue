<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="columns">
        <div class="column is-4">
          <div class="box">
            <h4 class="subtitle is-4">Adicionar</h4>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-search-select v-model="formFields.selectedObject"
                           api-resource="users"
                           :actives="true"
                           label="Usuário *"
                         ></dm-form-search-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-buttons :save-enabled="enableSaveButton"
                            :show-cancel="false"
                            :show-delete="false"
                            @action-save="saveForm"></dm-form-buttons>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
         <dm-list api-resource="workplaces"
                              :mainId="workplaceId"
                              subDoc="users"
                              :update-list="updateList"
                              :data-def="dataTableDef"
                              del-item-message="Usuário removido com sucesso!"
                              ></dm-list>
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

import Http from 'utils/services/http'
import { showAPIErrors, showAPISuccess } from 'utils/services/messenger/main'

import DmFormSearchSelect from 'utils/ui/form/SearchSelect.vue'
import DmList from 'utils/ui/form/SubDocumentsList.vue'
import DmFormButtons from 'utils/ui/form/Buttons.vue'

export default {
  name: 'DmWorkplaceUsers',
  data () {
    return {
      formFields: {
        selectedObject: {},
        user: ''
      },
      updateList: false,
      dataTableDef: {
        _id: {
          field: 'user._id',
          visible: false,
          class: 'is-hidden-mobile'
        },
        user: {
          label: 'Usuário',
          field: 'user.name',
          visible: true,
          class: ''
        },
        email: {
          label: 'E-mail',
          field: 'user.email',
          visible: true,
          class: ''
        }
      }
    }
  },
  validations: {
    formFields: {
      user: {
        required
      }
    }
  },
  components: {
    DmList,
    DmFormSearchSelect,
    DmFormButtons
  },
  methods: {
    saveForm () {
      this.updateList = false
      console.log('dentro do saveform')
      console.log('------>>> : ', this.objectDataPost)
      Http.post('/workplaces/' + this.workplaceId + '/users', this.objectDataPost)
      .then(response => {
        console.log('response', response, response.data)
        this.updateList = true
        showAPISuccess({ title: 'OK', message: 'Usuário relacionado com sucesso!' })
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
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
        user: this.formFields.user,
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
    workplaceId: {
      type: String,
      required: true
    }
  },
  watch: {
    'formFields.selectedObject' (val) {
      this.formFields.user = val._id
    }
  }
}
</script>

<style lang="css">
</style>
