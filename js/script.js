if(document.getElementById('showToast')){
  document.getElementById('showToast').addEventListener('click', function () {
    const toastElement = document.getElementById('myToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 }); // Авто-закрытие через 3 сек
    toast.show();
  });
}