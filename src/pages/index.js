import './index.css';
import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import {
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
  profileAvatar,
  popupConfirmation,
  profileEditAvatar,
  formAvatar,
  popupAvatar,
} from "../utils/content.js";

// информация формы редактирования
const userInfo = new UserInfo({ profileName, profileJob, profileAvatar });

// информация формы подтверждения
const popupConfirmationDeletion = new PopupWithConfirmation(popupConfirmation);
popupConfirmationDeletion.setEventListener();

// открытие фото 
const popupPhotos = new PopupWithImage(popupImage);
popupPhotos.setEventListener();

// отрисовка элементов на странице
const cards = new Section({
  renderer: (item) => {
    const cardElement = createCard(item, template);
    cards.addItem(cardElement);
  },
}, elContainer);

// генерация карточек
function createCard(item) {
  const card = new Card(item, userId, template, () => {
    popupPhotos.open(item.link, item.name);
  }, (id) => {
    popupConfirmationDeletion.open();
    popupConfirmationDeletion.setSubmitDeletion(() => {
      api.deleteCards(id)
        .then((item) => {
          card.handleRemoveButtonClick(item);
          popupConfirmationDeletion.close();
        })
        .catch((error) => {
          console.log(`Ошибка при удалении карточки: ${error}`);
        })
    });
  },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then((response) => {
            card.showPhotocardLikes(response.likes);
          })
          .catch((error) => {
            console.log(`Ошибка при удалении лайке: ${error}`);
          })
      } else {
        api.addLike(id)
          .then((response) => {
            card.showPhotocardLikes(response.likes);
          })
          .catch((error) => {
            console.log(`Ошибка при лайке: ${error}`);
          })
      }
    });
  return card.createItemCard();
};

// открытие и закрытие попапа "редактирование"
const popupEditProfile = new PopupWithForm(popupEdit, data => {
  popupEditProfile.renderLoading(true);
  api.editUserInfo(data.name, data.job)
    .then((formValues) => {
      userInfo.setUserInfo({
        userName: formValues.name,
        userDescription: formValues.about
      });
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(`Ошибка при изменении информации о пользователе: ${error}`);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
})
popupEditProfile.setEventListener();

// открытие и закрытие попапа "Добавление нового места"
const popupAddPlace = new PopupWithForm(popupAdd, (formValues) => {
  popupAddPlace.renderLoading(true);
  api.addNewCards(formValues.name, formValues.link)
    .then((data) => {
      const cardElement = createCard(data, template);
      cards.addNewItem(cardElement);
      popupAddPlace.close();
    })
    .catch((error) => {
      console.log(`Ошибка при сохранении новой карточки: ${error}`);
    })
    .finally(() => {
      popupAddPlace.renderLoading(false);
    })
})
popupAddPlace.setEventListener();

// открытие и закрытие попапа "редактирование аватарки"
const popupEditAvatar = new PopupWithForm(popupAvatar, (formValues) => {
  popupEditAvatar.renderLoading(true);
  api.editUserAvatar(formValues.profileAvatar)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log(`Ошибка при сохранение аватара: ${error}`);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    })
});
popupEditAvatar.setEventListener();

// обработка ошибок формы "редактирование"
const popupEditFormValidator = new FormValidator(options, formEdit);
popupEditFormValidator.enableValidation();

// обработка ошибок формы "добавления нового места"
const popupAddFormValidator = new FormValidator(options, formAdd);
popupAddFormValidator.enableValidation();

// обработка ошибок формы "редактирование аватарки"
const popupAvatarFormValidator = new FormValidator(options, formAvatar);
popupAvatarFormValidator.enableValidation();

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
  popupAddFormValidator.resetValidation();
});

// слушатель кнопки "редактирование аватарки"
profileEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  popupAvatarFormValidator.resetValidation();
})

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-66/",
  headers: {
    "Content-Type": "application/json",
    authorization: "d647408b-bad2-4351-8f58-989ba8d12956",
  },
});

let userId;
// Promise
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, photo]) => {
    userId = user._id;
    userInfo.setUserInfo(
      {
        userName: user.name,
        userDescription: user.about,
      }
    );
    userInfo.setUserAvatar(user.avatar);
    cards.renderItems(photo);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  // .catch((error) => {
  //   console.log(`Ошибка api: ${error}`);
  // })


// // Информация о пользователе
// api.getUserInfo()
//   .then((user) => {
//     userInfo.setUserInfo(
//       {
//         userName: user.name,
//         userDescription: user.about,
//       }
//       );
//       userInfo.setUserAvatar(user.avatar)
//       userId = user._id;
//   })
//   .catch((error) => {
//     console.log(error);
//   })

//   api.getCards()
//   .then((photo) => {
//     cards.renderItems(photo);
//   })
//   .catch((error) => {
//     console.log(error);
//   })

