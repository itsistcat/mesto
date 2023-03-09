// ОКНО редактировния профиля
const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup_edit_profile');
// Кнопки
const profileEditBtn = profile.querySelector('.profile__edit-btn');
// Форма
const formEdit = popupEdit.querySelector('.popup__form');
const nameEditPopup = popupEdit.querySelector('.popup__input_name');
const jobEditPopup = popupEdit.querySelector('.popup__input_job');
// Профиль
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
// ОКНО добавления нового места
const popupAdd = document.querySelector('.popup_add_place');
// Кнопки
const placeAddBtn = document.querySelector('.profile__add-btn');
// Форма
const formAdd = popupAdd.querySelector('.popup__form');
const nameAddPopup = popupAdd.querySelector('.popup__input_place');
const jobAddPopup = popupAdd.querySelector('.popup__input_url');
// КАРТОЧКИ
const elContainer = document.querySelector('.elements');
const template = document.querySelector('.template');
// Большие карточки
const popupImage = document.querySelector('.popup_type_image');
const photoItem = popupImage.querySelector('.fullscreen');
const photoSubt = popupImage.querySelector('.fullscreen-subtitle');


// Открытие
function openPopup(popupEl) {
  popupEl.classList.add('popup__opened');
  document.addEventListener('keyup', handleEsc);

 
}
// Закрытие
function closePopup(popupEl) {
  popupEl.classList.remove('popup__opened');
  document.removeEventListener('keyup', handleEsc);

}

// Закрытие всех форм
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup));
  buttonsPopup.addEventListener('click', closeByClickOverlay);
});

// Закрытие форм с помощью кнопки Esc
function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__opened'); // ищем открытый попап в document
    closePopup(openedPopup);
  }
}
// Закрытие форм оверлэй
function closeByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

// Открытие формы редактирования при нажатии 
profileEditBtn.addEventListener('click', function () {
  openPopup(popupEdit);
  // Передача значение
  nameEditPopup.value = profileName.textContent;
  jobEditPopup.value = profileJob.textContent;
});


// Функция отправки формы
function handleFormSubmitEdit(event) {
  event.preventDefault(); //отмена стандартной отправки формы
  //"возврат" значений
  profileName.textContent = nameEditPopup.value;
  profileJob.textContent = jobEditPopup.value;
  closePopup(popupEdit);
}
formEdit.addEventListener('submit', handleFormSubmitEdit); // Обработчик


// Открытие окна "добавление новой карточки"
const popupSave = formAdd.querySelector('.popup__save');
placeAddBtn.addEventListener('click', function () {
  openPopup(popupAdd);

  popupSave.setAttribute('disabled', true)
  popupSave.classList.add('popup__save_disabled');
  
});





function createItemCard(dataItem) {
  const cardElement = template.content.querySelector('.elements__list').cloneNode(true); // Клонируем template
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

  // Удаления карточек
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

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
  addCard(item, elContainer, false);
});

// Обработка формы добавления места
function handleFormSubmitAdd(event) {
  event.preventDefault();

  addCard({
    name: nameAddPopup.value, //добавление значения строки в объект
    link: jobAddPopup.value
  }, elContainer, true);

  closePopup(popupAdd);
  formAdd.reset();
  // Делает кнопку неактивной после отправки формы
  event.submitter.classList.add('popup__save_disabled');
  event.submitter.disabled = true;
}
formAdd.addEventListener('submit', handleFormSubmitAdd);


// Открытие фото на полный экран
function handleFormImage(popupImageData) {
  openPopup(popupImage);

  photoItem.src = popupImageData.link;
  photoItem.alt = popupImageData.name;
  photoSubt.textContent = popupImageData.name;
}


const options = {
  formSelector: '.popup__form',
  submitSelector: '.popup__save',
  inputSelector: '.popup__input',
  disableButtonClass: 'popup__save_disabled',
  inputSectionSelector: '.popup__input-element',
  inputErrorSelector: '.popup__input-error',
  classError: 'popup__input_active'
}

enableValidation(options);


