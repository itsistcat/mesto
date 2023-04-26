import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitEdit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleFormSubmitEdit = handleFormSubmitEdit;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    return this._formValues;

  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      this._handleFormSubmitEdit(this._getInputValues())
      console.log(evt);
      evt.preventDefault();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}