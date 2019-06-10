let modalAll = document.querySelectorAll(".modal");
  btnShowMap = document.querySelector(".contacts-map"),
  btnCreateMessage = document.querySelector(".btn-create-message"),
  btnAddCartAll = document.querySelectorAll(".btn-add-cart"),
  btnCloseModalAll = document.querySelectorAll(".btn-close");

let isStorageSupport = true;

let storageName = "",
  storageEmail = "";

/* Проверяет доступность localStoradge */
try {
  storageName = localStorage.getItem("technomartMessageName");
  storageEmail = localStorage.getItem("technomartMessageEmail");
}
catch (err) {
  isStorageSupport = false;
}

if (btnShowMap) {
  /* Добавляет обработчик клика на карту */
  btnShowMap.addEventListener("click", function(evt) {
    evt.preventDefault();

    let modalMap = document.querySelector(".modal-map");
    showModal(modalMap);
  });
}

if (btnCreateMessage) {
  addEvtToBtnMessage();
}

if (btnAddCartAll.length > 0) {
  addEvtToBtnAddCart(btnAddCartAll);
}

if (btnCloseModalAll.length > 0) {
  addEvtToBtnCloseModal(btnCloseModalAll);
}

/* Добавляет обработчик клика на кнопку Напишите нам */
function addEvtToBtnMessage() {
  btnCreateMessage.addEventListener("click", function(evt) {
    evt.preventDefault();
    
    let modalMessage = document.querySelector(".modal-message"),
      formMessage = modalMessage.querySelector(".modal-message-form"),
      inputName = formMessage.querySelector(".message-input-name"),
      inputEmail = formMessage.querySelector(".message-input-email"),
      inputText = formMessage.querySelector(".message-input-text"),
      btnSendMessage = formMessage.querySelector(".btn-send-message");

    showModal(modalMessage);

    fillInput(inputName, storageName);
    fillInput(inputEmail, storageEmail);
    
    if (!storageName) {
      inputName.focus();
    }
    else if (!storageEmail) {
      inputEmail.focus();
    }
    else {
      inputText.focus();
    }

    addEvtToSendMessage(formMessage);
  });
}

function addEvtToSendMessage(formMessage) {
  /* Отслеживает отправку формы с сообщением */
  formMessage.addEventListener("submit", function(evt) {
    let inputName = formMessage.querySelector(".message-input-name"),
      inputEmail = formMessage.querySelector(".message-input-email"),
      inputText = formMessage.querySelector(".message-input-text");

    if (!inputName.value || !inputEmail.value || !inputText.value) {
      evt.preventDefault();
    }
    else {
      if (isStorageSupport) {
        localStorage.setItem("technomartMessageName", inputName.value);
        localStorage.setItem("technomartMessageEmail", inputEmail.value);
        hideModal(modalMessage);
      }
    }
  });
}

/* Функция рекурсивно добавляет обработчик клика на кнопку В корзину
arrBtns - все найденные кнопки В корзину,
btnN - номер текущей кнопки */
function addEvtToBtnAddCart(arrBtns, btnN=0) {
  arrBtns[btnN].addEventListener("click", function(evt) {
    evt.preventDefault();
    
    let modalInformer = document.querySelector(".modal-informer");
    showModal(modalInformer);
  });
  btnN++;
  if (btnN < arrBtns.length) {
    addEvtToBtnAddCart(arrBtns, btnN);
  }
}

/* Функция рекурсивно добавляет обработчик на кнопку Закрыть окно,
arrBtns - все найденные кнопки Закрыть окно,
btnN - номер текущей кнопки */
function addEvtToBtnCloseModal(arrBtns, btnN=0) {
  arrBtns[btnN].addEventListener("click", function(evt) {
    evt.preventDefault();
    
    let parentModal = evt.target.parentElement.closest(".modal");
    hideModal(parentModal);
  });
  btnN++;
  if (btnN < arrBtns.length) {
    addEvtToBtnCloseModal(arrBtns, btnN);
  }
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

/* Функция заполняет значение в поле ввода 
myInput - поле ввода,
myValue - значение */
function fillInput(myInput, myValue) {
  if (myValue) {
    myInput.value = myValue;
  }
}

/* Функция очищает значение в поле ввода 
myInput - поле ввода */
function clearInput(myInput) {
  myInput.value = "";
}