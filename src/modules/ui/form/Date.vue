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
  import ElementUI from 'element-ui'
  import locale from 'element-ui/lib/locale/lang/pt-br'
  Vue.use(ElementUI, { locale })

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
