

export const options  = {
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
export const profileAvatar = '.profile__avatar';

export const popupImage = '.popup_type_image';

export const formEdit = document.querySelector('.popup__form_edit');
export const formAdd = document.querySelector('.popup__form_place');


export const inputName = formEdit.querySelector('.popup__input_name');
export const inputJob = formEdit.querySelector('.popup__input_job');

export const popupConfirmation = '.popup__confirmation';

export const formAvatar = document.querySelector('.popup__form_avatar');//formEditingUserAvatar
export const popupAvatar = '.popup_type_avatar';//popupTypeEditingUserAvatar
export const profileEditAvatar = document.querySelector('.profile__container-avatar');