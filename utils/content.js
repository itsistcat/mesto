export const initialCards = [
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

export const options = {
  formSelector: '.popup__form',
  submitSelector: '.popup__save',
  inputSelector: '.popup__input',
  disableButtonClass: 'popup__save_disabled',
  inputSectionSelector: '.popup__input-element',
  inputErrorSelector: '.popup__input-error',
  classError: 'popup__input_active'
}

export const elContainer = '.elements';
export const template = '#template';

export const profile = document.querySelector('.profile');
export const profileEditBtn = profile.querySelector('.profile__edit-btn');
export const placeAddBtn = profile.querySelector('.profile__add-btn');

export const popupEdit = '.popup_edit_profile';
export const popupAdd = '.popup_add_place';

export const profileName = '.profile__title';
export const profileJob = '.profile__subtitle';

export const popupImage = '.popup_type_image';


