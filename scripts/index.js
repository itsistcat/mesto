import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, options } from './content.js';

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
//const template = document.querySelector('.template');
const template = '#template';
// Большие карточки
const popupImage = document.querySelector('.popup_type_image');
const photoItem = popupImage.querySelector('.fullscreen');
const photoSubt = popupImage.querySelector('.fullscreen-subtitle');

const popupEditForm = popupEdit.querySelector('.popup__container')
const popupAddForm = popupAdd.querySelector('.popup__container')

const popupEditFormValidator = new FormValidator(options, popupEditForm);
popupEditFormValidator.enableValidation();

const popupAddFormValidator = new FormValidator(options, popupAddForm);
popupAddFormValidator.enableValidation();

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

// Открытие формы редактирования при нажатии 
profileEditBtn.addEventListener('click', function () {
  //включение кнопки
  popupEditFormValidator._enableButton();
  // Передача значение
  nameEditPopup.value = profileName.textContent;
  jobEditPopup.value = profileJob.textContent;
  openPopup(popupEdit);

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

// Обработка формы добавления места
function handleFormSubmitAdd(event) {
  event.preventDefault();
  addCard ({
    name: nameAddPopup.value, //добавление значения строки в объект
    link: jobAddPopup.value
  }, elContainer, true);

  closePopup(popupAdd);
  formAdd.reset();
  // Делает кнопку неактивной после отправки формы
  popupAddFormValidator._toggleButtonState();
  //event.submitter.classList.add('popup__save_disabled');
  //event.submitter.disabled = true;
}
formAdd.addEventListener('submit', handleFormSubmitAdd);

// Открытие фото на полный экран
export function handleFormImage(imageLink, imageName) {
  openPopup(popupImage);

  photoItem.src = imageLink;
  photoItem.alt = imageName;
  photoSubt.textContent = imageName;
}

// Закрытие форм с помощью кнопки Esc
function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__opened'); // ищем открытый попап в document
    closePopup(openedPopup);
  }
}

// Закрытие всех форм
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup'); 
  button.addEventListener('click', () => closePopup(buttonsPopup));
  buttonsPopup.addEventListener('mousedown', closeByClickOverlay);
});

// Закрытие форм оверлэй
function closeByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

function createCard(item) {
  const card = new Card(item, template);
  return card.createItemCard();
}

initialCards.forEach(function (item) {
  addCard(item, elContainer, false);
});


// Функция добавление карт
function addCard(card, itemBox, newItem) {

  const item = createCard(card);

  if (newItem) {
    itemBox.prepend(item); // Если новая - встаёт в начало
  } else {
    itemBox.append(item);
  }
}



// Открытие окна "добавление новой карточки"
const popupSave = formAdd.querySelector('.popup__save');
placeAddBtn.addEventListener('click', function () {
  openPopup(popupAdd);

  popupSave.setAttribute('disabled', true)
  popupSave.classList.add('popup__save_disabled');
  
});








