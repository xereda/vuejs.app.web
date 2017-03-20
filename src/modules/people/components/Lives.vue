<template lang="html">
  <transition name="fade">
    <div class="">
      <table class="table" v-show="state === 'list'">
        <thead>
          <tr>
            <th class="is-hidden-mobile">Nome</th>
            <th>Apelido</th>
            <th class="is-hidden-mobile">CPF</th>
            <th class="is-hidden-mobile">Nascimento</th>
            <th class="is-hidden-mobile">Nome da mãe</th>
            <th class="is-hidden-mobile">Convênios</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="live in lives"  v-show="!showNotification">
            <td class="is-hidden-mobile">{{ live.name }}</td>
            <td>{{ live.shortName }}</td>
            <td class="is-hidden-mobile">{{ live.cpf }}</td>
            <td class="is-hidden-mobile">{{ moment(live.birthday, 'DD/MM/YYYY') }}</td>
            <td class="is-hidden-mobile">{{ live.mothersName }}</td>
            <td class="is-hidden-mobile">{{ getHI(live.agreements) }}</td>
            <td class="is-icon">
              <a @click="updateLife(live._id)">
                <span class="icon">
                  <i class="fa fa-folder-open"></i>
                </span>
              </a>
            </td>
            <td class="is-icon">
              <a @click="deleteConfirm(live._id)">
                <span class="icon">
                  <i class="fa fa-trash"></i>
                </span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <dm-life-form v-show="state !== 'list'" :state="state" @close-form="state = 'list'" @after-new-life="afterNewLife" @delete-life="deleteConfirm" :person-id="personId" :life-id-update="lifeIdUpdate"></dm-life-form>
      <dm-notification v-show="showNotification">
        <span>Não há dependentes relacionados a esta pessoa.</span>
      </dm-notification>
      <div class="level-right" v-show="state === 'list'">
        <a @click="newLife()" class="button is-success">
          <span class="icon is-small">
            <i class="fa fa-file-o"></i>
          </span>
          <span>Novo dependente</span>
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import localePTBR from 'moment/locale/pt-br'
import Http from '../../../utils/services/http'
import { showAPIErrors, showConfirmDelete } from '../../../utils/services/messenger/main'
import dmNotification from '../../../utils/ui/Notification.vue'
import dmLifeForm from './LifeForm.vue'

export default {
  name: 'dmLives',
  data () {
    return {
      lives: [{}],
      showNotification: false,
      state: 'list', // list, update, new
      lifeIdUpdate: '',
      lifeIdDelete: ''
    }
  },
  components: {
    dmNotification,
    dmLifeForm
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      }
    }),
    requestURI () {
      return '/lives/?_populate=agreements.agreement&person=' + this.personId
    }
  },
  mounted () {
    moment().locale('pt-BR', localePTBR)
    this.getLives()
  },
  methods: {
    moment (str, format) {
      return moment.utc(str).format(format)
    },
    getHI (hiList) {
      return _.map(hiList, 'agreement.shortName').join(', ')
    },
    newLife () {
      this.state = 'new'
      this.showNotification = false
      this.lifeIdUpdate = ''
    },
    afterNewLife (lifeId) {
      this.lifeIdUpdate = lifeId
      this.state = 'update'
    },
    updateLife (lifeId) {
      console.log('dentro da updateLife', lifeId)
      this.lifeIdUpdate = lifeId
      this.state = 'update'
    },
    deleteCallback () {
      this.deleteLife(this.lifeIdDelete)
    },
    deleteConfirm (lifeId) {
      this.lifeIdDelete = lifeId
      showConfirmDelete(this.deleteCallback)
    },
    deleteLife (lifeId) {
      console.log('vai delelatar o lifeId: ', lifeId)
      Http.delete('/lives/' + lifeId)
      .then(response => {
        console.log('DELETOU', lifeId)
        this.state === 'list' ? this.getLives() : this.state = 'list'
      })
      .catch(response => {
        console.log(response)
        showAPIErrors(response)
      })
    },
    getLives () {
      console.log(this.requestURI)
      Http.get(this.requestURI)
      .then((response) => {
        console.log(response.headers['x-total-count'])
        response.headers['x-total-count'] === '0' ? this.showNotification = true : this.showNotification = false
        this.lives = response.data
      })
      .catch((response) => {
        console.log(response)
        showAPIErrors(response)
      })
    }
  },
  watch: {
    state (val) {
      if (val === 'list') {
        this.getLives()
      }
    }
  },
  props: [
    'person-id'
  ]
}
</script>

<style lang="css" scoped>


</style>
