import izitoast from 'izitoast'
import _ from 'lodash'

const _TOAST_POSITION = 'topRight'

const _humanMessage = (_data) => {
  let _return = _data
  const _replace = [
    { search: 'date_1_city_1', replaceBy: 'Feriado já cadastrado!' },
    { search: 'professionalactivities index: name_1 dup key', replaceBy: 'Ramo de Atividade já cadastrado!' },
    { search: 'professionalactivities index: regionalCouncilAcronym_1 dup key', replaceBy: 'Sigla do Conselho Regional já informada em outro Ramo de Atividade!' },
    { search: 'cities index: name_1 dup key', replaceBy: 'Cidade já cadastrada!' },
    { search: 'providers index: cpf_1 dup key', replaceBy: 'CPF já cadastrado!' },
    { search: 'providers index: cnpj_1 dup key', replaceBy: 'CNPJ já cadastrado!' },
    { search: 'specialties index: name_1 dup key', replaceBy: 'Operadora já cadastrada!' },
    { search: 'healthinsurances index: name_1 dup key', replaceBy: 'Convênio já cadastrado!' },
    { search: 'healthinsurances index: shortName_1 dup key', replaceBy: 'Nome curto já cadastrado em outro convênio!' },
    { search: 'operators index: ANSCode_1 dup key', replaceBy: 'Código ANS já informado em outra operadora!' },
    { search: 'professionalactivities.$name_1 dup key', replaceBy: 'Ramo de Atividade já cadastrado!' },
    { search: 'professionalactivities.$regionalCouncilAcronym_1 dup key', replaceBy: 'Sigla do Conselho Regional já informada em outro Ramo de Atividade!' },
    { search: 'cities.$name_1 dup key', replaceBy: 'Cidade já cadastrada!' },
    { search: 'specialties.$name_1 dup key', replaceBy: 'Operadora já cadastrada!' },
    { search: 'healthinsurances.$name_1 dup key', replaceBy: 'Convênio já cadastrado!' },
    { search: 'healthinsurances.$shortName_1 dup key', replaceBy: 'Nome curto já cadastrado em outro convênio!' },
    { search: 'operators.$ANSCode_1 dup key', replaceBy: 'Código ANS já informado em outra operadora!' },
    { search: 'email_1 dup key', replaceBy: 'E-mail já cadastrado!' },
    { search: 'users.$email_1', replaceBy: 'E-mail já em uso por outro usuário!' }
  ]

  _replace.forEach((element, index, array) => {
    if (_data.indexOf(element.search) > -1) {
      _return = element.replaceBy
    }
  })

  return _return
}

const showAPIErrors = (_objectErrors) => {
  if (_objectErrors === undefined || _objectErrors.status === 0) {
    izitoast.error({ title: 'AVISO - T0', message: 'Não foi possível acessar a API', position: _TOAST_POSITION })
    return true
  }
  if (_objectErrors.status === 401) {
    izitoast.error({ title: 'AVISO - T401', message: 'Dados não autorizados', position: _TOAST_POSITION })
    return true
  }
  if (_objectErrors.data === undefined) {
    return false
  }
  if (_objectErrors.data.err !== undefined) {
    if (_objectErrors.data.err.errors !== undefined) {
      _.forEach(_objectErrors.data.err.errors, (value, key) => {
        izitoast.error({ title: 'AVISO - T1', message: _humanMessage(value.message), position: _TOAST_POSITION })
      })
      return true
    }
    if (_objectErrors.data.err.errmsg !== undefined) {
      izitoast.error({ title: 'AVISO - T2', message: _humanMessage(_objectErrors.data.err.errmsg), position: _TOAST_POSITION })
      return true
    }
    if (_objectErrors.data.err.message !== undefined) {
      izitoast.error({ title: 'AVISO - T3', message: _humanMessage(_objectErrors.data.err.message), position: _TOAST_POSITION })
      return true
    }
  }

  if (_objectErrors.data.error !== undefined) {
    izitoast.error({ title: 'AVISO - T4', message: _humanMessage(_objectErrors.data.error), position: _TOAST_POSITION })
    return true
  }

  if (_objectErrors.data.response !== undefined) {
    izitoast.error({ title: 'AVISO - T5', message: _humanMessage(_objectErrors.data.response), position: _TOAST_POSITION })
    return true
  }
}

const showWarning = (_objectWarning) => {
  const _pos = _objectWarning.position !== undefined ? _objectWarning.position : _TOAST_POSITION
  izitoast.warning({ title: _objectWarning.title, message: _objectWarning.message, position: _pos })
}

const showAPISuccess = (_objectMessage) => {
  const _pos = _objectMessage.position !== undefined ? _objectMessage.position : _TOAST_POSITION
  _objectMessage === undefined ? _objectMessage = { title: 'OK', message: 'Ação realizada com sucesso!' } : null
  console.log({ title: _objectMessage.title, message: _objectMessage.message, position: _pos })
  izitoast.success({ title: _objectMessage.title, message: _objectMessage.message, position: _pos })
}

const showConfirmDelete = (callback) => {
  izitoast.show({
    position: 'center',
    icon: 'fa fa-exclamation-triangle',
    color: 'red',
    title: 'Deseja excluir?',
    message: 'Você realmente deseja excluir???',
    buttons: [
      ['<button> Excluir </button>', (instance, toast) => {
        callback()
        instance.hide({
          transitionOut: 'fadeOutUp',
          onClose: (instance, toast, closedBy) => {
            console.log('closedBy: ' + closedBy) // btn2
          }
        }, toast)
      }],
      ['<button> Fechar </button>', (instance, toast) => {
        instance.hide({
          transitionOut: 'fadeOutUp',
          onClose: (instance, toast, closedBy) => {
            console.log('closedBy: ' + closedBy) // btn2
          }
        }, toast, 'close', 'btn2')
      }]
    ]
  })
}

const showConfirm = (object, callback) => {
  izitoast.show({
    // position: 'center',
    // icon: 'fa fa-check-square',
    // color: 'green',
    // title: 'Definição de agenda.',
    // message: 'Foram gerados ',
    position: object.position,
    icon: object.icon,
    color: object.color,
    title: object.title,
    timeout: object.timeout,
    message: object.message,
    buttons: [
      ['<button> ' + object.buttons.btn1.label + ' </button>', (instance, toast) => {
        object.buttons.btn1.callback()
        instance.hide({
          transitionOut: 'fadeOutUp',
          onClose: (instance, toast, closedBy) => {
            console.log('closedBy: ' + closedBy) // btn2
          }
        }, toast)
      }],
      ['<button> ' + object.buttons.btn2.label + ' </button>', (instance, toast) => {
        object.buttons.btn2.callback()
        instance.hide({
          transitionOut: 'fadeOutUp',
          onClose: (instance, toast, closedBy) => {
            console.log('closedBy: ' + closedBy) // btn2
          }
        }, toast, 'close', 'btn2')
      }]
    ]
  })
}

export {
  showAPIErrors,
  showAPISuccess,
  showWarning,
  showConfirmDelete,
  showConfirm
}
