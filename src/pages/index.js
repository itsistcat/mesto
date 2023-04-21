import './index.css';
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
  nameInput ,
  jobInput ,
  popupImage,
  photoItem,
  photoSubt,
  //nameEditPopup,
  //jobEditPopup,
  popupEditForm,
  popupAddForm,


} from '../utils/content.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


// информация формы редактирования
const userInfo = new UserInfo({ profileName: '.profile__title', profileJob: '.profile__subtitle' });

// открытие фото 
const popupPhotos = new PopupWithImage(popupImage, photoItem, photoSubt);
popupPhotos.setEventListener();

// отрисовка элементов на странице
const cards = new Section({
  items: initialCards, renderer: (item) => {
    //const cardElement = createCard(item, template);
    cards.addItem(createCard(item));
  },
}, elContainer);
cards.renderItems();

// генерация карточек
function createCard(items) {
  const card = new Card(items, template, () => {
    popupPhotos.open(items.link, items.name);
  });
  return card.createItemCard();
};

const submitEditingUserInfoForm = items => {
  console.log( items.profileName);
  console.log( items.profileJob);
  userInfo.setUserInfo(items.profileName, items.profileJob); 
  popupEditProfile.close();
}

const popupEditProfile = new PopupWithForm(popupEdit, submitEditingUserInfoForm);
popupEditProfile.setEventListener();


const submitAddingPhotocardForm = items => {
  const photocardValue  = {
  name: items.name,
  link: items.link
}
popupAddPlace.close();
cards.addNewItem(createCard(photocardValue ));
}


const popupAddPlace = new PopupWithForm(popupAdd,  submitAddingPhotocardForm);
popupAddPlace.setEventListener();


// обработка ошибок формы "редактирование"
const popupEditFormValidator = new FormValidator(options, popupEditForm);
popupEditFormValidator.enableValidation();

// обработка ошибок формы "добавления нового места"
const popupAddFormValidator = new FormValidator(options, popupAddForm);
popupAddFormValidator.enableValidation();


// слушатель кнопки "редактирование"
profileEditBtn.addEventListener('click', (e) => {
  console.log(e);
  popupEditProfile.open();
  const input = userInfo.getUserInfo();
  nameInput.value = input.profileName;
  jobInput.value = input.profileJob; 
 
 // popupEditFormValidator.resetValidation();
});

// слушатель кнопки "добавления нового места"
placeAddBtn.addEventListener('click', () => {
  popupAddPlace.open();
 // popupAddFormValidator.toggleButtonState();
 // popupAddFormValidator.resetValidation();
});
