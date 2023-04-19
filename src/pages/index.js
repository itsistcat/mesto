import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  options,
  elContainer,
  template,
  popupEdit,
  popupAdd,
  profileEditBtn,
  placeAddBtn,
  profileName,
  profileJob,
  popupImage,

} from '../utils/content.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// информация формы редактирования
const userInfo = new UserInfo({ profileName, profileJob });

// открытие фото 
const popupPhotos = new PopupWithImage(popupImage);
popupPhotos.setEventListener();

// отрисовка элементов на странице
const cards = new Section({
  items: initialCards, renderer: (item) => {
    const cardElement = createCard(item, template);
    cards.addItem(cardElement);
  },
}, elContainer);
cards.renderItems();

// генерация карточек
function createCard(item) {
  const card = new Card(item, template, () => {
    popupPhotos.open(item.link, item.name);
  });
  return card.createItemCard();
};

// открытие и закрытие попапа "редактирование"
const popupEditProfile = new PopupWithForm(popupEdit, (evt) => {
  evt.preventDefault();
  const formValues = popupEditProfile.getFormValues();
  userInfo.setUserInfo({
    userName: formValues.name,
    userDescription: formValues.job
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListener();

// открытие и закрытие попапа "добавления нового места"
const popupAddPlace = new PopupWithForm(popupAdd, (evt) => {
  evt.preventDefault();
  const formValues = popupAddPlace.getFormValues();
  const item = {
    name: formValues.name,
    link: formValues.link
  };
  popupAddPlace.close();
  const cardElement = createCard(item, template);
  cards.addNewItem(cardElement);
});
popupAddPlace.setEventListener();

// обработка ошибок формы "редактирование"
const popupEditFormValidator = new FormValidator(options, popupEditProfile.getFormElement());
popupEditFormValidator.enableValidation();

// обработка ошибок формы "добавления нового места"
const popupAddFormValidator = new FormValidator(options, popupAddPlace.getFormElement());
popupAddFormValidator.enableValidation();

// слушатель кнопки "редактирование"
profileEditBtn.addEventListener('click', () => {
  popupEditProfile.open();
  const userInfoData = userInfo.getUserInfo();
  const profileForm = popupEditProfile.getFormElement();
  profileForm.elements.name.value = userInfoData.userName;
  profileForm.elements.job.value = userInfoData.userDescription;
  popupEditFormValidator.resetValidation();
});

// слушатель кнопки "добавления нового места"
placeAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
  //popupAddFormValidator .toggleButtonState();
  popupAddFormValidator.resetValidation();
});
