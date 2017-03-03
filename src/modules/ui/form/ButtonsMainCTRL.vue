<template lang="html">
  <div class="level">
    <div class="control is-grouped is-hidden-mobile">
      <p class="control">
        <a :class="{ 'button': true, 'is-info': true, 'is-disabled': !saveEnabled }" @click="actionSave()">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>Salvar</span>
        </a>
      </p>
      <p class="control">
        <a :class="{ 'button': true, 'is-disabled': !cancelEnabled }" @click="actionCancel()">
          <span class="icon is-small">
            <i class="fa fa-ban"></i>
          </span>
          <span>Cancelar</span>
        </a>
      </p>
      <p class="control">
        <a :class="{ 'button': true, 'is-danger': true, 'is-disabled': !deleteEnabled }" @click="actionDelete()">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
          <span>Excluir</span>
        </a>
      </p>
    </div>
    <div class="control is-grouped is-hidden-tablet">
      <p class="control">
        <a :class="{ 'button': true, 'is-info': true, 'is-disabled': !saveEnabled }" @click="actionSave()">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
        </a>
      </p>
      <p class="control">
        <a :class="{ 'button': true, 'is-disabled': !cancelEnabled }" @click="actionCancel()">
          <span class="icon is-small">
            <i class="fa fa-ban"></i>
          </span>
        </a>
      </p>
      <p class="control">
        <a :class="{ 'button': true, 'is-danger': true, 'is-disabled': !deleteEnabled }" @click="actionDelete()">
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
  data () {
    return {
    }
  },
  methods: {
    actionSave () {
      this.$emit('action-save')
    },
    actionCancel () {
      this.$emit('action-cancel')
    },
    actionDelete () {
      this.$emit('action-delete')
    }
  },
  props: [
    'save-enabled',
    'cancel-enabled',
    'delete-enabled'
  ]
}
</script>

<style lang="css">
</style>
