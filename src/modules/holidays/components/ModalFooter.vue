<template lang="html">
  <transition name="fade">
    <footer class="modal-card-foot">
      <a :class="{ 'button': true, 'is-info': true, 'is-disabled': saveButtonOff }" @click="saveDoc()">
        <span class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
        <span>Salvar</span>
      </a>

      <a :class="{ 'button': true }" @click="modalCloseConfirm()">
        <span class="icon is-small">
          <i class="fa fa-ban"></i>
        </span>
        <span>Cancelar</span>
      </a>

      <a :class="{ 'button': true, 'is-danger': true, 'is-disabled': delButtonOff }">
        <span class="icon is-small">
          <i class="fa fa-trash"></i>
        </span>
        <span>Excluir</span>
      </a>

    </footer>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import confirmation from '../../ui/confirmation/confirmation'

export default {
  data () {
    return {
    }
  },
  methods: {
    saveDoc () {
      this.$emit('save-doc')
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
