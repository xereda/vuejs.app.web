<template lang="html">
<div>

<el-input :placeholder="placeholder" v-model="selectedValue" :value="value"></el-input>

</div>
</template>

<script>
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import locale from 'element-ui/lib/locale/lang/pt-br'
  Vue.use(ElementUI, { locale })

  export default {
    name: 'dmFormName',
    data () {
      return {
        selectedValue: ''
      }
    },
    methods: {
    },
    watch: {
      selectedValue (val, oldValue) {
        this.$emit('event', { fieldName: this.fieldName, fieldValue: val })
      }
    },
    props: [
      'placeholder',
      'field-name',
      'value'
    ]
  }
</script>

<style lang="css" scoped>

  @import "~element-ui/lib/theme-default/index.css";

</style>
