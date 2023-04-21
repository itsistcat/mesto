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
  /*
  getFormValues() {
    return this._getInputValues();
  }
  getFormElement() {
    return this._formSelector;
  }
  */
  setEventListener() {
    super.setEventListener();
    this._formSelector.addEventListener('submit', (evt) => {
    console.log(evt);
    evt.preventDefault();
    
    this._handleFormSubmitEdit(this._getInputValues(evt))
    });
  }
  close() {
    this._formSelector.reset();
    super.close();
  }
}