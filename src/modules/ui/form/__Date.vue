<template lang="html">
<div>

  <el-date-picker
    v-model="selectedValue"
    type="date"
    :format="format"
    :placeholder="placeholder">
  </el-date-picker>

</div>
</template>

<script>
  import Vue from 'vue'
  import VueI18n from 'vue-i18n'
  import Element from 'element-ui'
  import enLocale from 'element-ui/lib/locale/lang/en'
  import ptbrLocale from 'element-ui/lib/locale/lang/pt-br'

  Vue.use(VueI18n)
  Vue.use(Element)

  Vue.config.lang = 'pt-br'
  Vue.locale('pt-br', ptbrLocale)
  Vue.locale('en', enLocale)

  export default {
    name: 'dmFormDate',
    data () {
      return {
        selectedValue: ''
      }
    },
    mounted () {
      console.log(this.value, this.value === undefined, this.value === null, this.value === '')
      if ((this.value !== '') && (this.value !== undefined)) {
        this.selectedValue = this.value
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
      'format',
      'placeholder',
      'field-name',
      'value'
    ]
  }
</script>

<style lang="css" scoped>

  @import "~element-ui/lib/theme-default/index.css";

</style>
