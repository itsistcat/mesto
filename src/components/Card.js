export default class Card {
  constructor(data, template, handleFormImage) {
    this._imageLink = data.link;
    this._imageName = data.name;
    this._name = data.name;
    this._template = template;
    this._handleFormImage = handleFormImage;
  }

  _setEventListeners() {
    this._cardElement.querySelector('.elements__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__like_active');
    });
    this._cardElement.querySelector('.elements__delete').addEventListener('click', (evt) => {
      this._cardElement.remove();
      this._cardElement = null;
    });
    this._cardsElementImage.addEventListener('click', () => {
      this._handleFormImage();
    });
  }
/*
  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle('elements__like_active');
  }

  _handleRemoveButtonClick(evt) {
    evt.target.closest('.elements__list').remove();

  }
*/
  _getTemplateElement() {
    return document.querySelector(this._template).content.querySelector('.elements__list').cloneNode(true);
  }

  createItemCard() {
    this._cardElement = this._getTemplateElement();
    this._cardsElementImage = this._cardElement.querySelector('.elements__photo');
    this._setEventListeners();

    this._cardsElementImage.src = this._imageLink;
    this._cardsElementImage.alt = this._imageName;
    this._cardElement.querySelector('.elements__title').textContent = this._name;

    return this._cardElement;
  }
}



