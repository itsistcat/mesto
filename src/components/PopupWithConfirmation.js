import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }

  submitDeletion(submitCardDelete) {
    this._submitForm = submitCardDelete;
  };

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this);
    })
  }
}