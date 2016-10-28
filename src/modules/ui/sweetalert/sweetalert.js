const removeOne = (callback, doc) => {
  swal({
    title: 'Deseja remover?????',
    text: 'Após remover o registro selecionado, \n você não poderá restaurá-lo!',
    type: 'warning',
    showCancelButton: true,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Sim, pode remover!',
    cancelButtonText: 'Cancelar',
    closeOnConfirm: false },
    function () {
      setTimeout(() => callback(doc))
      callback(doc)
    })
}

export default {
  removeOne
}
