<template lang="html">
  <transition name="fade">
  <div id="modal" :class="{ 'modal': true, 'is-active': control }">
    <div class="modal-background"></div>
    <div class="modal-card custom">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ general.modal.titleNewDocument }}</p>
        <button class="delete" @click="modalClose()"></button>
      </header>
      <section class="modal-card-body">
        <div class="tabs is-boxed">
          <ul>
            <li class="is-active">
              <a>
                <span class="icon"><i class="fa fa-info-circle"></i></span>
                <span>Geral</span>
              </a>
            </li>
          </ul>
        </div>
        <form>
          <div class="columns is-multiline">
            <div class="column is-2">
              <label class="label">Data</label>
              <dm-form-date format="d/m/Y" input-format="d/F" placeholder="DD/MM" @event="getValueField" field-name="date" value="12/2/2019"></dm-form-date>
            </div>
            <div class="column is-7">
              <label class="label">Feriado</label>
              <dm-form-name placeholder="Informe o nome do feriado" @event="getValueField" field-name="name" value="jackson"></dm-form-name>
            </div>
            <div class="column is-3">
              <label class="label">Recorrente</label>
              <dm-form-boolean @event="getValueField" field-name="recurrent" :checked="false"></dm-form-boolean>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-2">
              <label class="label">Regional</label>
              <dm-form-boolean @event="getValueField" field-name="regional" :checked="false"></dm-form-boolean>
            </div>
            <div class="column is-3">
              <label class="label">Cidade</label>
              <dm-form-select @event="getValueField" field-name="city"></dm-form-select>
            </div>
          </div>
        </form>
      </section>

      <footer class="modal-card-foot">

        <a :class="'button is-info'">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>Salvar</span>
        </a>

        <a :class="'button'" @click="modalClose()">
          <span class="icon is-small">
            <i class="fa fa-ban"></i>
          </span>
          <span>Cancelar</span>
        </a>

        <a :class="'button is-danger'">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
          <span>Excluir</span>
        </a>

        {{ formFields }}

      </footer>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import dmFormDate from '../../ui/form/Date.vue'
import dmFormName from '../../ui/form/Name.vue'
import dmFormBoolean from '../../ui/form/Boolean.vue'
import dmFormSelect from '../../ui/form/Select.vue'

export default {
  data () {
    return {
      formFields: {
        date: '',
        name: '',
        recurrent: false,
        regional: false,
        city: ''
      }
    }
  },
  components: {
    dmFormDate,
    dmFormName,
    dmFormBoolean,
    dmFormSelect
  },
  methods: {
    modalClose () {
      this.$emit('close-modal')
    },
    getValueField (fieldObj) {
      console.log('emitiu um evento para executar este metodo getValueField(): ', fieldObj)
      this.formFields[fieldObj.fieldName] = fieldObj.fieldValue
    }
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.holidays
        return general
      }
    })
  },
  props: [
    'control',
    'documentId',
    'modalState'
  ]
}
</script>

<style lang="scss" scoped>
  @import '../../../scss/config.scss';

  .custom {
    width: 80% !important;
    overflow: visible !important;
  }
  .modal-card-body {
    overflow: visible !important;
  }


</style>
