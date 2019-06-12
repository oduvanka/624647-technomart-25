var tabCart = document.querySelector(".main-header .cart");
  tabBookmark = document.querySelector(".main-header .bookmark");
  counterCart = tabCart.querySelector("span");
  counterBookmark = tabBookmark.querySelector("span");

var listCatalog = document.querySelector(".catalog-list");

var listServices = document.querySelector(".services-list"),
  currentService,
  currentLinkService;

var overlay = document.querySelector(".overlay"),
  currentPopup;

var btnShowMap = document.querySelector(".contacts-map"),
  popupMap = document.querySelector(".modal-map");

var btnCreateMessage = document.querySelector(".btn-create-message"),
  popupMessage = document.querySelector(".modal-message"),
  formMessage,
  inputName,
  inputEmail,
  inputText;

var popupInformer = document.querySelector(".modal-informer");

var isStorageSupport = true;

var numberCart = Number(counterCart.textContent),
  numberBookmark = Number(counterBookmark.textContent),
  storageName = "",
  storageEmail = "";

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

if (listServices) {
  currentService = listServices.querySelector(".service-active");
  currentLinkService = currentService.querySelector("a");
  listServices.addEventListener("click", clickSliderServices);
}

/* Функция для обработчика клика по каталогу товаров */
function clickCatalog(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains("btn-add-cart")) {
    numberCart = incCounterTab(numberCart, counterCart);

    tabCart.classList.add("cart-full");

    showPopup(popupInformer);
  }
  else if (evt.target.classList.contains("btn-add-bookmark")) {
    numberBookmark = incCounterTab(numberBookmark, counterBookmark);

    tabBookmark.classList.add("bookmark-full");
  }
}

/* Функция для обработки кликов по меню сервисов */
function clickSliderServices(evt) {
  evt.preventDefault();

  var myLink = evt.target;
  
  if (myLink.hasAttribute("href")) {

    var oldDataService = currentLinkService.getAttribute("data-service"),
      oldInfo = document.querySelector(".service-info[data-service="+oldDataService+"]"),
      
      parentMyLink = myLink.closest(".service-item"),
      myDataService = myLink.getAttribute("data-service"),
      newInfo = document.querySelector(".service-info[data-service="+myDataService+"]");

    /* Передаёт активность другому пункту меню - 
    сохранённому активному возвращает ссылку и убирает класс активности,
    у нового активного убирает ссылку, добавляет класс активности.
    Переключает блок с информацией о сервисе */
    
    currentService.classList.remove("service-active");
    currentLinkService.setAttribute("href", "#");
    oldInfo.classList.remove("service-info-show");

    currentService = parentMyLink;
    currentLinkService = myLink;

    currentService.classList.add("service-active");
    currentLinkService.removeAttribute("href");
    newInfo.classList.add("service-info-show");
  }
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

/* МОДАЛЬНЫЕ ОКНА */

/* Функция для обработчика отправки формы сообщения */
function sendMessage(evt) {
  

  if (!inputName.value || !inputEmail.value || !inputText.value) {
    popupMessage.classList.remove("modal-error");
    popupMessage.offsetWidth = popupMessage.offsetWidth;
    popupMessage.classList.add("modal-error");
    
    evt.preventDefault();
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
  overlay.classList.add("overlay-show");
  overlay.addEventListener("click", onClickOverlay);

  currentPopup = myPopup;
  myPopup.classList.add("modal-show");

  var btnClosePopup = myPopup.querySelector(".btn-close"),
    btnContinueShopping= myPopup.querySelector(".btn-continue-shopping");

  if (btnClosePopup) {
    btnClosePopup.addEventListener("click", onClickBtnClosePopup);
  }
  if (btnContinueShopping) {
    btnContinueShopping.addEventListener("click", onClickBtnClosePopup);
  }
  window.addEventListener("keydown", keydownClosePopup);
}

/* Функция для обработчика клика по кнопке Закрыть */
function onClickBtnClosePopup(evt) {
  evt.preventDefault();

  hidePopup(currentPopup);
}

/* Функция для обработчика нажатия по клавише Esc */
function keydownClosePopup(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    if (currentPopup) {
      hidePopup(currentPopup);
    }
  }
}

/* Функция для обработчика клика по overlay */
function onClickOverlay(evt) {
  evt.preventDefault();

  hidePopup(currentPopup);
}

/* Функция добавляет окну класс, который скрывает его,
myPopup - модальное окно*/
function hidePopup(myPopup) {
  myPopup.classList.remove("modal-show");
  overlay.classList.remove("overlay-show");  
  myPopup.classList.remove("modal-error");

  formMessage.removeEventListener("submit", sendMessage);
  
  window.removeEventListener("keydown", keydownClosePopup);
  overlay.removeEventListener("click", onClickOverlay);

  var btnPopupClose = myPopup.querySelector(".btn-close"),
    btnContinueShopping = myPopup.querySelector(".btn-continue-shopping");
  if (btnPopupClose) {
    btnPopupClose.removeEventListener("click", onClickBtnClosePopup);
  }
  if (btnContinueShopping) {
    btnContinueShopping.removeEventListener("click", onClickBtnClosePopup);
  }

  currentPopup = null;
}

/* ОБЩЕГО НАЗНАЧЕНИЯ */

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
myCounterTab - вкладка со счётчиком,
возвращает - новое значение счётчика */
function incCounterTab(myNumber, myCounterTab) {
  myNumber++;
  myCounterTab.textContent = myNumber;

  return myNumber;
}