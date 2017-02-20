import swal from 'sweetalert'

const removeOne = (obj) => {
  swal({
    title: 'Deseja remover?',
    text: 'Após remover o documento selecionado (' + obj.documentIdentify + '), você não poderá restaurá-lo!',
    type: 'warning',
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Sim, pode remover!',
    cancelButtonText: 'Cancelar',
    closeOnConfirm: false },
    function () {
      setTimeout(() => obj.callback({ documentId: obj.documentId, documentIdentify: obj.documentIdentify }))
    })
}

const modalClose = (callback) => {
  swal({ title: 'Deseja sair?',
    text: 'Existem informações não salvas no formulário. \n Deseja realmente sair sem salvar?',
    type: 'warning',
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Sim, desejo sair!',
    cancelButtonText: 'Voltar',
    closeOnConfirm: true },
  () => setTimeout(() => callback()))
}
export default {
  removeOne,
  modalClose
}
