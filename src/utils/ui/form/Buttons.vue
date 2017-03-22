<template lang="html">
  <div class="level-right">
    <div class="control is-grouped is-hidden-mobile">
      <p class="control" v-if="showSave">
        <a :class="{ 'button': true, 'is-info': true, 'is-disabled': !saveEnabled, 'is-loading': saveButtonIsLoading }" @click="actionSave()">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>{{ labelSave }}</span>
        </a>
      </p>
      <p class="control" v-if="showCancel">
        <a :class="{ 'button': true, 'is-disabled': !cancelEnabled }" @click="actionCancel()">
          <span class="icon is-small">
            <i class="fa fa-ban"></i>
          </span>
          <span>Cancelar</span>
        </a>
      </p>
      <p class="control" v-if="showDelete">
        <a :class="{ 'button': true, 'is-danger': true, 'is-disabled': !deleteEnabled }" @click="actionDelete()">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
          <span>Excluir</span>
        </a>
      </p>
    </div>
    <div class="control is-grouped is-hidden-tablet">
      <p class="control" v-if="showSave">
        <a :class="{ 'button': true, 'is-small': false, 'is-info': true, 'is-disabled': !saveEnabled, 'is-loading': saveButtonIsLoading }" @click="actionSave()">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>{{ labelSave }}</span>
        </a>
      </p>
      <p class="control" v-if="showCancel">
        <a :class="{ 'button': true, 'is-small': false, 'is-disabled': !cancelEnabled }" @click="actionCancel()">
          <span class="icon is-small">
            <i class="fa fa-ban"></i>
          </span>
          <span>Cancelar</span>
        </a>
      </p>
      <p class="control" v-if="showDelete">
        <a :class="{ 'button': true, 'is-small': false, 'is-danger': true, 'is-disabled': !deleteEnabled }" @click="actionDelete()">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dmFormButtons',
  data () {
    return {
      saveButtonIsLoading: false
    }
  },
  methods: {
    actionSave () {
      this.hasLoading()
      this.$emit('action-save')
    },
    actionCancel () {
      this.$emit('action-cancel')
    },
    actionDelete () {
      this.$emit('action-delete')
    },
    hasLoading () {
      console.log('dentro da hasLoading')
      this.saveButtonIsLoading = true
      setTimeout(() => {
        console.log('vai desligar o loading')
        this.saveButtonIsLoading = false
      }, 600)
    }
  },
  props: {
    showSave: {
      default: true,
      type: Boolean
    },
    showCancel: {
      default: true,
      type: Boolean
    },
    showDelete: {
      default: true,
      type: Boolean
    },
    saveEnabled: {
      type: Boolean,
      default: false
    },
    cancelEnabled: {
      type: Boolean,
      default: false
    },
    deleteEnabled: {
      type: Boolean,
      default: false
    },
    labelSave: {
      type: String,
      default: 'Salvar'
    }
  }
}
</script>

<style lang="css">
</style>
