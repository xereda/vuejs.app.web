<template>
  <section class="section">
    <div class="container is-fluid">
      <dm-breadcrumbs :object-links="breadcrumbs"></dm-breadcrumbs>

      <!-- <pre>{{ formStates }}</pre>
      <pre>{{ formFields }}</pre>
      <pre>{{ $v.formFields }}</pre> -->

      <div class="field is-horizontal is-marginless">
        <div class="field-label is-normal">
          <label class="label">Hora início/fim</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input :class="{ 'input': true, 'is-danger': isInvalidField('startHour') || !this.formStates.startHour }" type="text" placeholder="HH:MM" @input="$v.formFields.startHour.$touch()" v-model="formFields.startHour" @change="validateHour('startHour')" v-mask="'##:##'" style="width:80px">
            </p>
            <p class="control">
              <input :class="{ 'input': true, 'is-danger': isInvalidField('endHour') || !this.formStates.endHour }" type="text" placeholder="HH:MM" @input="$v.formFields.endHour.$touch()" v-model="formFields.endHour" v-mask="'##:##'"  @change="validateHour('endHour')" style="width:80px">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="help is-danger" v-show="hasPeriodError">{{ getPeriodErrorMessage }}</p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal is-marginless">
        <div class="field-label is-normal">
          <label class="label">Intervalo</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input :class="{ 'input': true, 'is-danger': isInvalidField('intervalStart') || !this.formStates.intervalStart || !this.formStates.interval }" type="text" placeholder="HH:MM" @input="$v.formFields.intervalStart.$touch()" v-model="formFields.intervalStart" v-mask="'##:##'" @change="validateHour('intervalStart')" style="width:80px">
            </p>
            <p class="control">
              <input :class="{ 'input': true, 'is-danger': isInvalidField('intervalEnd') || !this.formStates.intervalEnd || !this.formStates.interval }" type="text" placeholder="HH:MM" @input="$v.formFields.intervalEnd.$touch()" v-model="formFields.intervalEnd" v-mask="'##:##'" @change="validateHour('intervalEnd')" style="width:80px">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="help is-danger" v-show="hasIntervalError">{{ getIntervalErrorMessage }}</p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal is-marginless">
        <div class="field-label is-normal">
          <label class="label">Duração</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control">
              <input :class="{ 'input': true, 'is-danger': isInvalidField('durationMinutes') || !this.formStates.durationMinutes }"
                     type="text" placeholder="MM"
                     @input="$v.formFields.durationMinutes.$touch()"
                     v-model="formFields.durationMinutes"
                     v-mask="'###'"
                     @change="validateHour('intervalStart')"
                     style="width:80px">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="help is-danger" v-show="isInvalidField('durationMinutes')">Duração é inválida! Por favor, informe um valor minutos.</p>
            <p class="help is-danger" v-show="isInvalidDuration">Duração maior que período disponível.</p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Dias da semana </label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <div class="columns is-multiline">
                <div class="column">
                  <dm-form-checkbox v-model="formFields.weekDays.seg" label="Seg"></dm-form-checkbox>
                  <dm-form-checkbox v-model="formFields.weekDays.ter" label="Ter"></dm-form-checkbox>
                  <dm-form-checkbox v-model="formFields.weekDays.qua" label="Qua"></dm-form-checkbox>
                  <dm-form-checkbox v-model="formFields.weekDays.qui" label="Qui"></dm-form-checkbox>
                </div>
              </div>
              <div class="columns is-multiline">
                <div class="column">
                  <dm-form-checkbox v-model="formFields.weekDays.sex" label="Sex"></dm-form-checkbox>
                  <dm-form-checkbox v-model="formFields.weekDays.sab" label="Sab"></dm-form-checkbox>
                  <dm-form-checkbox v-model="formFields.weekDays.dom" label="Dom"></dm-form-checkbox>
                </div>
              </div>
            </div>
            <p class="help is-danger" v-show="isInvalidWeekDays">Selecione ou mais dias da semana.</p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Prestador</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="formFields.provider" @change="$v.formFields.provider.$touch()" >
                  <option value="all">Gerar para todos</option>
                  <option :value="provider._id" v-for="provider in providersList">{{ provider.name }}</option>
                </select>
              </div>
            </div>
            <!-- <p class="help is-danger" v-show="isInvalidField('provider')">Selecione</p> -->
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field">
            <a class="button is-primary" @click="rulesGenerator()">
              <span class="icon is-small">
                <i class="fa fa-wrench"></i>
              </span>
              <span>Gerar regras</span>
            </a>
            <a class="button is-light" @click="goRouteByName('scheduleDefinitions')">
              <span class="icon is-small">
                <i class="fa fa-sign-out"></i>
              </span>
              <span>Sair</span>
            </a>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import VueMask from 'v-mask'
Vue.use(VueMask)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'

import navigation from 'mixins/navigation'
import session from 'mixins/session'
import validations from '../mixins/validations'
import http from '../mixins/http'
import messengers from '../mixins/messengers'
import businessObject from '../mixins/businessObject'
import DmBreadcrumbs from 'utils/ui/Breadcrumbs.vue'
import { DmFormCheckbox } from 'utils/ui/form/main'

export default {
  mixins: [
    navigation,
    validations,
    session,
    http,
    businessObject,
    messengers
  ],
  components: {
    DmBreadcrumbs,
    DmFormCheckbox
  },
  mounted () {
    this.getProvidersList()
  },
  data () {
    return {
      formStates: {
        startHour: true,
        endHour: true,
        intervalStart: true,
        intervalEnd: true,
        interval: true,
        durationMinutes: true,
        weekDays: false
      },
      formFields: {
        startHour: '',
        endHour: '',
        intervalStart: '',
        intervalEnd: '',
        durationMinutes: '',
        weekDays: {
          seg: true,
          ter: true,
          qua: true,
          qui: true,
          sex: true,
          sab: false,
          dom: false
        },
        provider: 'all'
      },
      providersList: [
      ],
      breadcrumbs: [
        {
          route: 'scheduleDefinitions',
          name: 'Definições'
        },
        {
          route: '',
          name: 'Gerador'
        }
      ]
    }
  },
  validations: {
    formFields: {
      startHour: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      endHour: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      intervalStart: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      intervalEnd: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5)
      },
      durationMinutes: {
        required,
        between: between(15, 120)
      },
      provider: {
        required
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
