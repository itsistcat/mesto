// ОКНО редактировния профиля
const profile = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup_edit_profile');
// Кнопки
const profileEditBtn = profile.querySelector('.profile__edit-btn');
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
// Форма
const formAdd = popupAdd.querySelector('.popup__form');
const nameAddPopup = popupAdd.querySelector('.popup__field_place');
const jobAddPopup = popupAdd.querySelector('.popup__field_url');


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
}
// Закрытие
function closePopup(popupEl) {
  popupEl.classList.remove('popup__opened');
}

// Закрытие всех форм
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});

// Открытие формы редактирования при нажатии 
profileEditBtn.addEventListener('click', function () {
  openPopup(popupEdit);
  // Передача значение
  nameEditPopup.value = profileName.textContent;
  jobEditPopup.value = profileJob.textContent;
});
// Закрытие формы


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
placeAddBtn.addEventListener('click', function () {
  openPopup(popupAdd);
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
}
formAdd.addEventListener('submit', handleFormSubmitAdd);

// Открытие фото на полный экран
function handleFormImage(popupImageData) {
  openPopup(popupImage);

  photoItem.src = popupImageData.link;
  photoItem.alt = popupImageData.name;
  photoSubt.textContent = popupImageData.name;
}

