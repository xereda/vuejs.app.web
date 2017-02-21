<template lang="html">
<div>
  <el-switch v-model="selectedValue" @change="$emit('change', $event)" on-color="#13ce66" on-text="Sim" off-text="Não" off-color="#ff4949"></el-switch>
</div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import locale from 'element-ui/lib/locale/lang/pt-br'
  Vue.use(ElementUI, { locale })

  export default {
    name: 'dmFormBoolean',
    data () {
      return {
        selectedValue: true
      }
    },
    mounted () {
    },
    methods: {
    },
    watch: {
      selectedValue (val, oldVal) {
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      },
      defaultValue (val, oldVal) {
        this.selectedValue = val
      }
    },
    props: [
      'field-name',
      'default-value'
    ]
  }
</script>

<style lang="css" scoped>

  @import "~element-ui/lib/theme-default/index.css";

</style>
