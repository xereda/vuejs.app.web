import izitoast from 'izitoast'
import _ from 'lodash'

const _TOAST_POSITION = 'topRight'

const _humanMessage = (_data) => {
  let _return = _data
  const _replace = [
    { search: 'holidays.$date_1_city_1', replaceBy: 'Feriado já cadastrado!' },
    { search: 'docmob.users.$email_1', replaceBy: 'E-mail já em uso por outro usuário!' }
  ]

  _replace.forEach((element, index, array) => {
    if (_data.indexOf(element.search) > -1) {
      _return = element.replaceBy
    }
  })

  return _return
}

const showAPIErrors = (_objectErrors) => {
  if ((_objectErrors === undefined) || (_objectErrors.data === undefined)) {
    return false
  }
  if (_objectErrors.data.err.errmsg !== undefined) {
    izitoast.error({ title: 'AVISO', message: _humanMessage(_objectErrors.data.err.errmsg), position: _TOAST_POSITION })
  } else if (_objectErrors.data.error !== undefined) {
    izitoast.error({ title: 'AVISO', message: _humanMessage(_objectErrors.data.error), position: _TOAST_POSITION })
  } else {
    _.forEach(_objectErrors.data.err.errors, (value, key) => {
      izitoast.error({ title: 'AVISO', message: _humanMessage(value.message), position: _TOAST_POSITION })
    })
  }
}

const showAPISuccess = (_objectMessage) => {
  (_objectMessage === undefined) ? _objectMessage = { title: 'OK', message: 'Ação realizada com sucesso!' } : null
  izitoast.success({ title: _objectMessage.title, message: _objectMessage.message, position: _TOAST_POSITION })
}

export {
  showAPIErrors,
  showAPISuccess
}
