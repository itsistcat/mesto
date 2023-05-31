import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitEdit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleFormSubmitEdit = handleFormSubmitEdit;
    this._popupSubmit = this._popup.querySelector('.popup__save');
    this._popupSubmitText = this._popupSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // процесс загрузки
  renderLoading(isLoading) { 
    isLoading
    ? this._popupSubmit.textContent = 'Сохранение...'
    : this._popupSubmit.textContent = this._popupSubmitText;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmitEdit(this._getInputValues())
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}