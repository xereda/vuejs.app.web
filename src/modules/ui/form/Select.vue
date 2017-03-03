<template lang="html">
  <div>
    <label v-if="showLabel" class="label">{{ label }}</label>
    <p class="control has-icon">
      <span class="select">
        <select :value="value" @change="$emit('input', $event.target.value)" :class="{ 'is-disabled': disabled, 'is-danger': showError }">
          <option value="">{{ placeholder }}</option>
          <option v-for="item in dataList" :value="item._id">{{ item.name }}</option>
        </select>
      </span>
      <span class="icon is-small">
        <i :class="faIcon"></i>
      </span>
      <span v-if="showError" class="help is-danger">{{ errorMessage }}</span>
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
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
      }
    },
    watch: {
    },
    computed: {
      ...mapState({
      }),
      activesOnly () {
        return this.actives !== undefined && this.actives === true ? '&active=true' : ''
      },
      showLabel () {
        return this.label !== undefined && this.label.length > 0
      },
      showError () {
        return this.errorMessage !== undefined && this.errorMessage.length > 0
      }
    },
    props: {
      value: {
      },
      placeholder: {
        type: String,
        default: 'Selecione um opção...'
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
      actives: {
        type: Boolean
      },
      faIcon: {
        type: String,
        default: 'fa fa-list-ul'
      },
      label: {
        type: String,
        default: ''
      },
      errorMessage: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="css" scoped>

  select {
    padding-left: 35px !important;
  }

</style>
