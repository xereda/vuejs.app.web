<template>
  <div class="">
    <ul>PRESTADORES
      <br><br>
      <li v-for="provider in providersList">
        <div class="columns">
          <div class="column">
            <dm-form-radio v-model="provider._id" @change.native="teste(provider._id)" :selectedId="providerId" :label="provider.name"></dm-form-radio>
            <!-- {{ provider.name }} -->
          </div>
        </div>
      </li>
      </p>
    </ul>
  </div>
</template>

<script>
import { DmFormRadioElementUI } from 'utils/ui/form/main'

export default {
  name: 'DmProviders',
  data () {
    return {
    }
  },
  mixins: [
  ],
  methods: {
    teste (provider) {
      console.log('dentro do componente provider: ', provider)
      this.$emit('provider-select', provider)
    }
  },
  mounted () {
  },
  components: {
    DmFormRadio: DmFormRadioElementUI
  },
  props: [
    'providersList',
    'providerId'
  ]
}
</script>
<style>
</style>
