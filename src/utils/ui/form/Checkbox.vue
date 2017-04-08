<template>
  <el-checkbox :checked="value" @change="$emit('input', $event.target.checked)">{{ label }}</el-checkbox>
</template>

<script>
import Vue from 'vue'
import { Checkbox } from 'element-ui'
Vue.use(Checkbox)

export default {
  name: 'DmFormCheckbox',
  data () {
    return {
    }
  },
  props: [
    'value',
    'label'
  ]
}
</script>

<style lang="css" scoped>
  @import '~element-ui/lib/theme-default/index.css';
</style>
