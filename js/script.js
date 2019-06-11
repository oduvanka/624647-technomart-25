var tabCart = document.querySelector(".main-header .cart");
  tabBookmark = document.querySelector(".main-header .bookmark");
  counterCart = tabCart.querySelector("span");
  counterBookmark = tabBookmark.querySelector("span");

var btnShowMap = document.querySelector(".contacts-map"),
  popupMap = document.querySelector(".modal-map");

var btnCreateMessage = document.querySelector(".btn-create-message"),
  popupMessage = document.querySelector(".modal-message"),
  formMessage,
  inputName,
  inputEmail,
  inputText;

var listCatalog = document.querySelector(".catalog-list"),
  popupInformer = document.querySelector(".modal-informer");

var isStorageSupport = true;

var storageName = "",
  storageEmail = "",
  numberCart = Number(counterCart.textContent),
  numberBookmark = Number(counterBookmark.textContent);

if (popupMessage) {
  formMessage = popupMessage.querySelector(".modal-message-form");
  inputName = formMessage.querySelector(".message-input-name");
  inputEmail = formMessage.querySelector(".message-input-email");
  inputText = formMessage.querySelector(".message-input-text");
}

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

    showPopup(popupMap);
  });
}

if (btnCreateMessage) {
  btnCreateMessage.addEventListener("click", createMessage);
}

if (listCatalog) {
  listCatalog.addEventListener("click", clickCatalog);
}

/* Функция для обработчика клика на кнопку Напишите нам */
function createMessage(evt) {
    evt.preventDefault();

    showPopup(popupMessage);

    fillInput(inputName, storageName);
    fillInput(inputEmail, storageEmail);
    
    inputText.focus();
    if (!storageName) {
      inputName.focus();
    }
    else if (!storageEmail) {
      inputEmail.focus();
    }
    
    formMessage.addEventListener("submit", sendMessage);
}

/* Функция для обработчика отправки формы сообщения */
function sendMessage(evt) {
  evt.preventDefault();

  if (!inputName.value || !inputEmail.value || !inputText.value) {
    popupMessage.classList.remove("modal-error");
    popupMessage.offsetWidth = popupMessage.offsetWidth;
    popupMessage.classList.add("modal-error");
  }
  else {
    if (isStorageSupport) {
      localStorage.setItem("technomartMessageName", inputName.value);
      localStorage.setItem("technomartMessageEmail", inputEmail.value);
    }
    hidePopup(popupMessage);
  }
};

/* Функция добавляет окну класс, который делает его видимым, и назначает обработчики закрытия окна
myPopup - модальное окно*/
function showPopup(myPopup) {
  myPopup.classList.add("modal-show");

  var btnClosePopup = myPopup.querySelector(".btn-close");

  if (btnClosePopup) {
    btnClosePopup.addEventListener("click", onClickBtnClosePopup);
  }
  window.addEventListener("keydown", keydownClosePopup);
}

/* Функция для обработчика клика по кнопке Закрыть */
function onClickBtnClosePopup(evt) {
  evt.preventDefault();

  hidePopup(evt.target.closest(".modal"));
}

/* Функция для обработчика нажатия по клавише Esc */
function keydownClosePopup(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    /*if (myPopup.classList.contains("modal-show")) {
      hidePopup(myPopup);
    }*/
  }
}

/* Функция для обработчика клика по каталогу товаров */
function clickCatalog(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains("btn-add-cart")) {
    incCounterTab(numberCart, counterCart);

    tabCart.classList.add("cart-full");

    showPopup(popupInformer);
  }
  else if (evt.target.classList.contains("btn-add-bookmark")) {
    incCounterTab(numberBookmark, counterBookmark);

    tabBookmark.classList.add("bookmark-full");
  }
}

/* Функция добавляет окну класс, который скрывает его,
myPopup - модальное окно*/
function hidePopup(myPopup) {
  myPopup.classList.remove("modal-show");
  myPopup.classList.remove("modal-error");

  formMessage.removeEventListener("submit", sendMessage);
  /*btnClosePopup.removeEventListener("click", onClickBtnClosePopup);*/
  window.removeEventListener("keydown", keydownClosePopup);
}

/* Функция заполняет значение в поле ввода 
myInput - поле ввода,
myValue - значение */
function fillInput(myInput, myValue) {
  if (myValue) {
    myInput.value = myValue;
  }
}

/* Функция вычисляет новое значение счётчика и обновляет его на вкладке,
myNumber - текущее значение счётчика,
myCounterTab - вкладка со счётчиком */
function incCounterTab(myNumber, myCounterTab) {
  myNumber++;
  myCounterTab.textContent = myNumber;
}