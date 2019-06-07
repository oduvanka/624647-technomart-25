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
}