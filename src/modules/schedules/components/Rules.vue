<template>
  <section class="section">
    <div class="container is-fluid">
      <dm-breadcrumbs :object-links="breadcrumbs"></dm-breadcrumbs>
      <collapse accordion is-fullwidth>
        <collapse-item :selected="true" :title="startCase(provider.name)" v-for="provider in providersList">
          <table class="table" v-if="filterRules(provider._id).length > 0">
            <thead>
              <tr>
                <th><abbr title="Dia da semana"></abbr>Dia</th>
                <th><abbr title="Hora início"></abbr>HI</th>
                <th><abbr title="Hora fim"></abbr>HF</th>
                <th class="is-hidden-mobile"><abbr title="Duração">Dur.</abbr></th>
                <th class="is-hidden-mobile"><abbr title="Data de início da validade">Data Ini.</abbr></th>
                <th class="is-hidden-mobile"><abbr title="Data de fim da validade">Data Fim</abbr></th>
                <th class="is-hidden-mobile"><abbr title="Ativo">Ativo</abbr></th>
                <th class="is-hidden-mobile"><abbr title="Aprovaçao automática">Apr. Auto.</abbr></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rule in rulesList" v-if="rule.provider === provider._id">
                <td>{{ rule.weekDay }}</td>
                <td>{{ rule.startHour }}</td>
                <td>{{ rule.endHour }}</td>
                <td class="is-hidden-mobile">{{ rule.durationMinutes }}</td>
                <td class="is-hidden-mobile">{{ moment(rule.startDate, 'DD/MM/YYYY') }}</td>
                <td class="is-hidden-mobile">{{ moment(rule.endDate, 'DD/MM/YYYY') }}</td>
                <td class="is-hidden-mobile">{{ rule.active ? 'Sim' : 'Não' }}</td>
                <td class="is-hidden-mobile">{{ rule.autoApproval ? 'Sim' : 'Não' }}</td>
                <td class="is-icon">
                  <a @click="accessRule(rule)">
                    <span class="icon">
                      <i class="fa fa-ellipsis-h"></i>
                    </span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <h5 class="subtitle is-5" v-else>Não há regras definidas para este prestador.</h5>
        </collapse-item>
       </collapse>

    </div>
  </section>
</template>

<script>
import navigation from 'mixins/navigation'
import format from 'mixins/format'
import session from 'mixins/session'
import validations from '../mixins/validations'
import http from '../mixins/http'
import messengers from '../mixins/messengers'
import businessObject from '../mixins/businessObject'
import DmBreadcrumbs from 'utils/ui/Breadcrumbs.vue'
import Collapse from 'utils/ui/collapse/Collapse.vue'
import CollapseItem from 'utils/ui/collapse/Item.vue'

export default {
  mixins: [
    navigation,
    validations,
    session,
    http,
    businessObject,
    messengers,
    format
  ],
  components: {
    DmBreadcrumbs,
    Collapse,
    CollapseItem
  },
  mounted () {
    this.getProvidersList()
  },
  data () {
    return {
      providersList: [
      ],
      rulesList: [
      ],
      breadcrumbs: [
        {
          route: 'scheduleDefinitions',
          name: 'Definições'
        },
        {
          route: '',
          name: 'Regras'
        }
      ]
    }
  },
  methods: {
    filterRules (providerId) {
      console.log(providerId, this.rulesList)
      return this.rulesList.filter(e => {
        console.log(e.provider, providerId)
        return e.provider === providerId
      })
    }
  },
  watch: {
    providersList () {
      this.getRulesList()
    }
  }
}
</script>

<style lang="css">
</style>
