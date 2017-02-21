<template lang="html">
<div>
  <p class="control">
    <span class="select">
      <select v-model="selectedValue" :class="{ 'is-disabled': disabled }">
        <option value="">{{ placeholder }}</option>
        <option v-for="item in dataList" :value="item._id">{{ item.name }}</option>
      </select>
    </span>
  </p>
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import Http from '../../services/http'

  export default {
    name: 'dmFormSelect',
    data () {
      return {
        isLoading: false,
        selectedValue: '',
        dataList: []
      }
    },
    mounted () {
      this.asyncFind('')
    },
    components: {
    },
    methods: {
      asyncFind (query) {
        this.isLoading = true
        let _search = ''
        if (query !== '') {
          _search = 'name=/' + query + '/i'
        }
        const _uri = this.apiResource + '/?_limit=' + this.optionsLimit + this.activesOnly + '&_fields=_id,name&' + _search
        Http.get(_uri)
        .then((response) => {
          this.dataList = response.data
          this.selectedValue = this.defaultValueReturn
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
      }
    },
    watch: {
      selectedValue (val, oldVal) {
        const _objReturn = { fieldName: this.fieldName, fieldValue: val }
        this.$emit('event', _objReturn)
      }
      // defaultValue (val) {
      //   setTimeout(() => {
      //     this.selectedValue = val
      //   }, 0)
      // }
    },
    computed: {
      ...mapState({
      }),
      activesOnly () {
        return this.actives !== undefined && this.actives === true ? '&active=true' : ''
      },
      defaultValueReturn () {
        return this.defaultValue
      }
    },
    props: {
      defaultValue: {
      },
      placeholder: {
        type: String,
        default: 'Selecione um valor...'
      },
      optionsLimit: {
        type: Number,
        default: 10
      },
      disabled: {
        type: Boolean
      },
      apiResource: {
        type: String,
        required: true
      },
      fieldName: {
        type: String,
        required: true
      },
      actives: {
        type: Boolean
      }
    }
  }
</script>

<style lang="css">


</style>
