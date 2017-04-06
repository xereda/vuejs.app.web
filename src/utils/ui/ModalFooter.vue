<template lang="html">
  <transition name="fade">
    <footer class="modal-card-foot">
      <div class="is-hidden-mobile">
        <a :class="{ 'button': true, 'is-info': true, 'is-disabled': saveButtonOff }" @click="saveDoc()">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>Salvar</span>
        </a>
        <a :class="{ 'button': true }" @click="modalCloseConfirm()">
          <span class="icon is-small">
            <i class="fa fa-sign-out"></i>
          </span>
          <span>Sair</span>
        </a>
        <a :class="{ 'button': true, 'is-danger': true, 'is-disabled': delButtonOff }" @click="delDoc()">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
          <span>Excluir</span>
        </a>
      </div>
      <div class="is-hidden-tablet">
        <a :class="{ 'button': true, 'is-info': true, 'is-disabled': saveButtonOff }" @click="saveDoc()">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>Salvar</span>
        </a>
        <a :class="{ 'button': true }" @click="modalCloseConfirm()">
          <span class="icon is-small">
            <i class="fa fa-sign-out"></i>
          </span>
        </a>
        <a :class="{ 'button': true, 'is-danger': true, 'is-disabled': delButtonOff }" @click="delDoc()">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
        </a>
      </div>
    </footer>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import confirmation from './confirmation/confirmation'

export default {
  data () {
    return {
    }
  },
  methods: {
    saveDoc () {
      this.$emit('save-doc')
    },
    delDoc () {
      this.$emit('del-doc')
    },
    modalClose () {
      this.$emit('close-modal')
    },
    modalCloseConfirm () {
      if (this.requestConfirm) {
        confirmation.modalClose(this.modalClose)
      } else {
        this.modalClose()
      }
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
    'saveButtonOff',
    'delButtonOff',
    'requestConfirm'
  ]
}
</script>

<style lang="scss" scoped>

</style>
