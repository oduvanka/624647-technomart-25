var tabCart = document.querySelector(".main-header .cart");
  tabBookmark = document.querySelector(".main-header .bookmark");
  counterCart = tabCart.querySelector("span");
  counterBookmark = tabBookmark.querySelector("span");

var slider = document.querySelector(".slider"),
  currentDataSlide,
  controlsSlider;

var listCatalog = document.querySelector(".catalog-list");

var listServices = document.querySelector(".services-list"),
  currentDataService;

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

var rangeСontrols = document.querySelector(".range-controls"),
  rangeScale,
  rangeBar,
  toogleMin,
  toogleMax;

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

if (slider) {
  currentDataSlide = slider.querySelector(".slide-active").getAttribute("data-slide");

  controlsSlider = slider.querySelector(".slider-controls");
  controlsSlider.addEventListener("click", clickControlsSlider);

  controlNavigationBack = slider.querySelector(".control-navigation-back");
  controlNavigationBack.addEventListener("click", clickControlNavigationSlide);
  controlNavigationNext = slider.querySelector(".control-navigation-next");
  controlNavigationNext.addEventListener("click", clickControlNavigationSlide);
}

if (listCatalog) {
  listCatalog.addEventListener("click", clickCatalog);
}

if (listServices) {
  currentDataService = listServices.querySelector(".service-active").getAttribute("data-service");
  
  listServices.addEventListener("click", clickSliderServices);
}

if (btnCreateMessage) {
  btnCreateMessage.addEventListener("click", createMessage);
}

if (btnShowMap) {
  /* Добавляет обработчик клика на карту */
  btnShowMap.addEventListener("click", function(evt) {
    evt.preventDefault();

    showPopup(popupMap);
  });
}

if (rangeСontrols) {
  rangeScale = rangeСontrols.querySelector(".scale"),
  rangeBar = rangeСontrols.querySelector(".bar"),
  toogleMin = rangeСontrols.querySelector(".toogle-min"),
  toogleMax = rangeСontrols.querySelector(".toogle-max");

  var rangeCoords = getCoords(rangeСontrols),
    currentToogle,
    currentToogleCoords,
    shiftX;

  var deltaEdge = (rangeСontrols.offsetWidth - rangeScale.offsetWidth) / 2,
    leftEdge,
    rightEdge;
  
  toogleMin.addEventListener("mousedown", mousedownToogle);
  toogleMax.addEventListener("mousedown", mousedownToogle);

  rangeBar.style.position = "absolute";
}

/* Функция для обработчика нажатия кнопки мыши */
function mousedownToogle(evt) {
  currentToogle = evt.target;

  currentToogleCoords = getCoords(currentToogle);
  shiftX = evt.pageX - currentToogleCoords.left; // чтобы при клике ползунок не центрировался по курсору

  currentToogle.addEventListener("dragstart", dragstartToogle);

  document.addEventListener("mousemove", moveToogle);

  currentToogle.addEventListener("mouseup", mouseupToogle);
}

/* Функция для обработчика начала перетаскивания.
Отключает браузерное перетаскивание */
function dragstartToogle(evt) {
  evt.preventDefault();
}

/* Функция для обработчика перемещения мыши.
Вычисляет новые координаты перемещаемого объекта */
function moveToogle(evt) {
  var newLeft = evt.pageX - shiftX - rangeCoords.left;

  if (evt.target === toogleMin) {
    leftEdge = deltaEdge;
    rightEdge = getCoords(toogleMax).left - rangeCoords.left - 5;
  }
  else {
    leftEdge = getCoords(toogleMin).left - rangeCoords.left + 5;
    rightEdge = rangeСontrols.offsetWidth - deltaEdge - currentToogle.offsetWidth;
  }

  if (newLeft < leftEdge) {
    newLeft = leftEdge;
  }
  else if (newLeft > rightEdge) {
    newLeft = rightEdge;
  }

  currentToogle.style.left = newLeft + "px";

  if (evt.target === toogleMin) {
    rangeBar.style.left = newLeft + "px";
  }
  setWidthBar();
}

/* Функция для обработчика отпускания мыши.
Удаляет назаченные обработчики перемещения и отпускания мыши */
function mouseupToogle(evt) {
  currentToogle.removeEventListener("dragstart", dragstartToogle);
  document.removeEventListener("mousemove", moveToogle);
  currentToogle.removeEventListener("mouseup", mouseupToogle);
}

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function setWidthBar() {
  var deltaToogles = getCoords(toogleMax).left - getCoords(toogleMin).left;
  rangeBar.style.width = deltaToogles + "px";
}

/* СЛАЙДЕРЫ */

/* Функция для обработчика клика по круглым кнопкам в слайдере */
function clickControlsSlider(evt) {
  var newDataSlide = evt.target.getAttribute("data-slide");

  if (evt.target.classList.contains("control-page") && (newDataSlide !== currentDataSlide)) {
    evt.preventDefault();

    replaceActiveSlide(newDataSlide);
    replaceActiveControlPageSlider(newDataSlide);

    currentDataSlide = newDataSlide;
  }
}

/* Функция для обработчика клика по кнопкам Назад-Вперёд в слайдере */
function clickControlNavigationSlide(evt) {
  evt.preventDefault();

  var currentSlide = slider.querySelector(".slider-item[data-slide="+currentDataSlide+"]");
  var newSlide,
    newDataSlide;

  var controlNavigationData = evt.target.getAttribute("data-slide");

  if (controlNavigationData === "back") {
    /* Назад */
    newSlide = currentSlide.previousElementSibling;
    if (!newSlide) {
      newSlide = currentSlide.parentElement.lastElementChild;
    }
  }
  else {
    /* Вперёд */
    newSlide = currentSlide.nextElementSibling;
    if (!newSlide) {
      newSlide = currentSlide.parentElement.firstElementChild;
    }
  }

  newDataSlide = newSlide.getAttribute("data-slide");
  replaceActiveSlide(newDataSlide);
  replaceActiveControlPageSlider(newDataSlide);
  
  currentDataSlide = newDataSlide;
}

/* Функция заменяет текущий слайд на новый,
newData - data-аттрибут нового слайда */
function replaceActiveSlide(newData) {
  var oldSlide = slider.querySelector(".slider-item[data-slide="+currentDataSlide+"]");
  oldSlide.classList.remove("slide-active");

  var newSlide = slider.querySelector(".slider-item[data-slide="+newData+"]");
  newSlide.classList.add("slide-active");
}

/* Функция меняет активный переключатель слайдера,
newData - data-аттрибут нового слайда */
function replaceActiveControlPageSlider(newData) {
  var oldControlPage = controlsSlider.querySelector(".control-page[data-slide="+currentDataSlide+"]");
  oldControlPage.classList.remove("control-page-active");

  var newControlPage = controlsSlider.querySelector(".control-page[data-slide="+newData+"]");
  newControlPage.classList.add("control-page-active");
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
  var newDataService = evt.target.closest(".service-item").getAttribute("data-service");

  if (evt.target.hasAttribute("href") && (newDataService !== currentDataService)) {
    evt.preventDefault();
    
    replaceActiveLinkService(newDataService);
    replaceActiveServiceInfo(newDataService);

    currentDataService = newDataService;
  }
}

/* Функция меняет активный пункт в меню сервисов,
newData - data-аттрибут нового сервиса */
function replaceActiveLinkService(newData) {
  var oldService = listServices.querySelector(".service-item[data-service="+currentDataService+"]"),
    oldLinkService = oldService.querySelector("a");
  oldService.classList.remove("service-active");
  oldLinkService.setAttribute("href", "#");

  var newService = listServices.querySelector(".service-item[data-service="+newData+"]"),
    newLinkService = newService.querySelector("a");
  newService.classList.add("service-active");
  newLinkService.removeAttribute("href");
}

/* Функция меняет активный блок с информацией о сервисе,
newData - data-аттрибут нового сервиса */
function replaceActiveServiceInfo(newData) {
var oldInfo = document.querySelector(".service-info[data-service="+currentDataService+"]");
  oldInfo.classList.remove("service-info-show");

var newInfo = document.querySelector(".service-info[data-service="+newData+"]");
  newInfo.classList.add("service-info-show");
}

/* КНОПКИ И ССЫЛКИ НА СТРАНИЦЕ */

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

/* ПОЛЗУНОК */

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