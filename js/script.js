function openModal1() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal1'));
  myModal.show();
}

function openModal2() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal2'));
  myModal.show();
}

function openModal3() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal3'));
  myModal.show();
}

function openModal4() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal4'));
  myModal.show();
}

function openModal5() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal5'));
  myModal.show();
}

function openModal6() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal6'));
  myModal.show();
}

function openModal7() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal7'));
  myModal.show();
}

function openModal8() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal8'));
  myModal.show();
}

function openModal9() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal9'));
  myModal.show();
}

document.getElementById('showToast').addEventListener('click', function () {
  const toastElement = document.getElementById('myToast');
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 }); // Авто-закрытие через 3 сек
  toast.show();
});

var scrollSpy = new bootstrap.ScrollSpy(document.querySelector('.scrollspy-example-2'), {
    target: '#navbar-example3'
  });