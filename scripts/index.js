// ОКНО редактировния профиля
const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup_edit_profile');
// Кнопки
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const closeEditBtn = popupEdit.querySelector('.popup__close');
// Форма
const formEdit = popupEdit.querySelector('.popup__form');
const nameEditPopup = popupEdit.querySelector('.popup__field_name');
const jobEditPopup = popupEdit.querySelector('.popup__field_job');
// Профиль
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');


// ОКНО добавления нового места
const popupAdd = document.querySelector('.popup_add_place');
// Кнопки
const placeAddBtn = document.querySelector('.profile__add-btn');
const closeAddBtn = popupAdd.querySelector('.popup__close');
// Форма
const formAdd = popupAdd.querySelector('.popup__form');
const nameAddPopup = popupAdd.querySelector('.popup__field_place');
const jobAddPopup = popupAdd.querySelector('.popup__field_url');


// КАРТОЧКИ
const elList = document.querySelector('.elements');
const template = document.querySelector('.template');

// Большие карточки
const popupImage = document.querySelector('.popup_type_image');
const photoItem = popupImage.querySelector('.fullscreen');
const photoSubt = popupImage.querySelector('.fullscreen__subtitle');
const popupImageClose  = popupImage.querySelector('.popup__close');


// Открытие
function openToClick(popupEl) {
  popupEl.classList.add('popup__opened');
}
// Закрытие
function closeToClick(popupEl) {
  popupEl.classList.remove('popup__opened');
}


// Открытие формы редактирования при нажатии 
profileEditBtn.addEventListener('click', function () {
  openToClick(popupEdit);
  // Передача значение
  nameEditPopup.value = profileName.textContent;
  jobEditPopup.value = profileJob.textContent;
});
// Закрытие формы
closeEditBtn.addEventListener('click', function () {
  closeToClick(popupEdit);
});

// Функция отправки формы
function handleFormSubmit(event) {
  event.preventDefault(); //отмена стандартной отправки формы
  //"возврат" значений
  profileName.textContent = nameEditPopup.value;
  profileJob.textContent = jobEditPopup.value;
  closeToClick(popupEdit);
}
formEdit.addEventListener('submit', handleFormSubmit); // Обработчик


// Открытие окна "добавление новой карточки"
placeAddBtn.addEventListener('click', function () {
  openToClick(popupAdd);
});
// Закрытие окна "добавление новой карточки"
closeAddBtn.addEventListener('click', function () {
  closeToClick(popupAdd);
});


// Карточки 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function createItemCard(dataItem) {
  const cardElement = template.content.cloneNode(true); // Клонируем template
  const elementImage = cardElement.querySelector('.elements__photo');
  const elementTitle = cardElement.querySelector('.elements__title');
  const likeBtn = cardElement.querySelector('.elements__like');
  const deleteButton = cardElement.querySelector('.elements__delete');

  // Передача значение
  elementImage.src = dataItem.link;
  elementImage.alt = dataItem.name;
  elementTitle.textContent = dataItem.name;

  // Чёрное сердечко
  likeBtn.addEventListener('click', function () {
    likeBtn.classList.toggle('elements__like_active'); // переключатель 
  });

  // Кнопка удаления карточек / вызов функции
  deleteButton.addEventListener('click', elemDelete);

  // Нажатие на фото / вызов функции
  elementImage.addEventListener('click', function () {
    handleFormImage(dataItem);
  });
  
  return cardElement;
}

// Функция добавление карт
function addCard(dataItem, itemBox, newItem) {
  const item = createItemCard(dataItem);

  if (newItem) {
    itemBox.prepend(item); // Если новая - встаёт в начало
  } else {
    itemBox.append(item);
  }
}
initialCards.forEach(function (item) {
  addCard(item, elList, false);
});

// Функция удаление карточек 
function elemDelete(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.elements__list');
  targetItem.remove()
}

function handleElementsFormSubmit(event) {
  event.preventDefault();

  addCard({
    name: nameAddPopup.value, //добавление значения строки в объект
    link: jobAddPopup.value
  }, elList, true);

  closeToClick(popupAdd);
  formAdd.reset();
}
formAdd.addEventListener('submit', handleElementsFormSubmit);

// Открытие фото на полный экран
function handleFormImage(popupImageData){
  openToClick(popupImage);

  photoItem.src = popupImageData.link;
  photoItem.alt = popupImageData.name;
  photoSubt.textContent = popupImageData.name;
}
// Закрытие
popupImageClose.addEventListener('click', function() {
  closeToClick(popupImage);
});

