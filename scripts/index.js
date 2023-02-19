const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup');
const closeBtn = popupEdit.querySelector('.popup__close');
const namePopup = popupEdit.querySelector('.popup__field_name');
const jobPopup = popupEdit.querySelector('.popup__field_job');
const form = popupEdit.querySelector('.popup__form');

// открытие формы при нажатии 
const openToClick = function () {
  namePopup.value = profileName.textContent;
  jobPopup.value = profileJob.textContent;
  popupEdit.classList.add('popup__opened');
}

// закрытие формы 
function closeToClick() {
  popupEdit.classList.remove('popup__opened');
}

//Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); //отмена стандартной отправки формы
  //"возврат" значений
  profileName.textContent = namePopup.value;
  profileJob.textContent = jobPopup.value;
  closeToClick();
}
//обработчик 
form.addEventListener('submit', handleFormSubmit);

//срабатывание функций при нажатии на соответсвующую кнопку
profileEditBtn.addEventListener('click', openToClick);
closeBtn.addEventListener('click', closeToClick);