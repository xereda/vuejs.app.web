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

export default {
  removeOne
}
