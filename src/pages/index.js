import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
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
  inputName,
  inputJob,
  formEdit,
  formAdd,
} from "../utils/content.js";

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
const popupEditProfile = new PopupWithForm(popupEdit, (formValues) => {
  //evt.preventDefault();
  //const formValues = popupEditProfile.getFormValues(evt);
  userInfo.setUserInfo({
    userName: formValues.name,
    userDescription: formValues.job
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListener();

// открытие и закрытие попапа "добавления нового места"
const popupAddPlace = new PopupWithForm(popupAdd, (formValues) => {
 // evt.preventDefault();
  //const formValues = popupAddPlace.getFormValues(evt);
  
  const item = {
    name: formValues.name,
    link: formValues.link
  };
  
 console.log(formValues.name)
 console.log(formValues.link)
  popupAddPlace.close();
  const cardElement = createCard(item, template);
  cards.addNewItem(cardElement);
});
popupAddPlace.setEventListener();

// обработка ошибок формы "редактирование"
const popupEditFormValidator = new FormValidator(options, formEdit);
popupEditFormValidator.enableValidation();

// обработка ошибок формы "добавления нового места"
const popupAddFormValidator = new FormValidator(options, formAdd);
popupAddFormValidator.enableValidation();

// слушатель кнопки "редактирование"
profileEditBtn.addEventListener('click', () => {
  popupEditProfile.open();
  const userInfoData = userInfo.getUserInfo();

  inputName.value = userInfoData.userName;
  inputJob.value = userInfoData.userDescription;
  popupEditFormValidator.resetValidation();
});

// слушатель кнопки "добавления нового места"
placeAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
  //popupAddFormValidator .toggleButtonState();
  popupAddFormValidator.resetValidation();
});
