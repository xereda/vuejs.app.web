<template>
  <div class="">
    <ul>PRESTADORES
      <br><br>
      <li v-for="prestador in prestadores">
        <div class="columns">
          <div class="column">
            <dm-form-checkbox v-model="prestador.checked"></dm-form-checkbox>
            {{ prestador.name }}
          </div>
        </div>
      </li>
      </p>
    </ul>
  </div>
</template>

<script>
import { DmFormCheckbox } from 'utils/ui/form/main'

export default {
  data () {
    return {
      prestadores: [
        { checked: false, name: 'Maurino Salazar' },
        { checked: false, name: 'Paula Guimarães' },
        { checked: false, name: 'Sérgio Silva Souza' }
      ]
    }
  },
  components: {
    DmFormCheckbox
  }
}
</script>
<style>
</style>
