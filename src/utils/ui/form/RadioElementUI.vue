<template>
  <el-radio class="radio" :label="selectedId" :value="value" :checked="true" @click="$emit('input', $event.target.value)">{{ label }}</el-radio>
</template>

<script>
import Vue from 'vue'
import { Radio } from 'element-ui'
Vue.use(Radio)

export default {
  name: 'DmFormRadioElementUI',
  data () {
    return {
    }
  },
  props: [
    'value',
    'label',
    'selectedId'
  ],
  watch: {
    value (val, oldVal) {
      console.log('val - oldVal: ', val, oldVal)
    }
  }
}
</script>

<style lang="css" scoped>
  @import '~element-ui/lib/theme-default/index.css';
</style>
