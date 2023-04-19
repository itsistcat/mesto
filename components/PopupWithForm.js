import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitEdit) {
    super(popupSelector);
    this._formSelector = this._popup.querySelector(".popup__form");
    this._inputSelector = this._formSelector.querySelectorAll('.popup__input');
    this._handleFormSubmitEdit = handleFormSubmitEdit;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputSelector.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  getFormValues() {
    return this._getInputValues();
  }

  getFormElement() {
    return this._formSelector;
  }

  setEventListener() {
    this._formSelector.addEventListener('submit', (evt) => this._handleFormSubmitEdit(evt));
    super.setEventListener();
  }

  close() {
    this._formSelector.reset();
    super.close();
  }
}