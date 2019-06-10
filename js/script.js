let btnShowMap = document.querySelector(".contacts-map");
let btnCreateMessage = document.querySelector(".btn-create-message");
let btnAddCartAll = document.querySelectorAll(".btn-add-cart");

if (btnShowMap) {
  btnShowMap.addEventListener("click", function(evt) {
    evt.preventDefault();

    let modalMap = document.querySelector(".modal-map");
    modalMap.classList.add("modal-show");
  });
}

if (btnCreateMessage) {
  btnCreateMessage.addEventListener("click", function(evt) {
    evt.preventDefault();
    
    let modalMessage = document.querySelector(".modal-message");
    modalMessage.classList.add("modal-show");
  });
}

if (btnAddCartAll.length > 0) {
  addEvtForBtnAddCart(btnAddCartAll);
}

function addEvtForBtnAddCart (arrBtns, btnN=0) {
  arrBtns[btnN].addEventListener("click", function(evt) {
    evt.preventDefault();
    
    let modalInformer = document.querySelector(".modal-informer");
    modalInformer.classList.add("modal-show");
  });
  btnN++;
  if (btnN < arrBtns.length) {
    addEvtForBtnAddCart(arrBtns, btnN);
  }

/* Функция добавляет окну класс, который делает его видимым,
myModal - модальное окно*/
function showModal(myModal) {
  myModal.classList.add("modal-show");
}

/* Функция добавляет окну класс, который скрывает его,
myModal - модальное окно*/
function hideModal(myModal) {
  myModal.classList.remove("modal-show");
}