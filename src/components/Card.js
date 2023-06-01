export default class Card {
  constructor(data, userId, template, handleFormImage, confirmCardDeletion, handleLikeClick) {
    this._imageLink = data.link;
    this._imageName = data.name;
    this._imageLikes = data.likes;
    this._id = data._id;
    this._template = template;
    this._handleFormImage = handleFormImage;
    this._confirmCardDeletion = confirmCardDeletion;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleLikeClick = handleLikeClick;
  }
  //confirmCardDeletion

  _setEventListeners() {
    this._cardButtonLike = this._cardElement.querySelector('.elements__like')
    this._likesCounter = this._cardElement.querySelector('.elements__like-counter');
    this._cardsElementImage = this._cardElement.querySelector('.elements__photo');
    this._cardButtonLike.addEventListener('click', () => {
      console.log(this._id);
      this._handleLikeClick(this._id);
    });
    this._cardButtonDeletion = this._cardElement.querySelector('.elements__delete');
    this._cardButtonDeletion.addEventListener('click', () => {
      this._confirmCardDeletion(this._id);
    });
    this._cardsElementImage.addEventListener('click', () => {
      this._handleFormImage(this._cardsElementImage.src, this._cardsElementImage.alt);
    });
  }

  // Удаление карточки
  handleRemoveButtonClick() {
    this._cardElement.remove();
  }

  _getTemplateElement() {
    return document.querySelector(this._template).content.querySelector('.elements__list').cloneNode(true);
  }

  // Добавление лайка
  _paintOverLikeButton() {
    this._cardButtonLike.classList.add('elements__like_active');
  }

  // Удаление лайка
  _cleanPaintLikeButton() {
    this._cardButtonLike.classList.remove('elements__like_active');
  }

  // Проверка состояния лайков
  isLiked() {
    const userHasLikedCard = this._imageLikes.some((user) => user._id === this._userId);
    return userHasLikedCard;
  }

  // Отображение количества лайков
  showPhotocardLikes(newLikes) {
    this._imageLikes = newLikes;
  
    if (this._imageLikes.length > 0) {
      this._likesCounter.textContent = this._imageLikes.length;
      this._likesCounter.style.display = 'inline-block';
    } else {
      this._likesCounter.style.display = 'none';
    }

    if (this.isLiked()) {
      this._paintOverLikeButton()
    } else {
      this._cleanPaintLikeButton();
    }
  }


  createItemCard() {
    this._cardElement = this._getTemplateElement();
   
    this._setEventListeners();

    this._cardsElementImage.src = this._imageLink;
    this._cardsElementImage.alt = this._imageName;
    this._cardElement.querySelector('.elements__title').textContent = this._imageName;

    this.showPhotocardLikes(this._imageLikes);

    if (this._ownerId !== this._userId) {
      this._cardButtonDeletion.style.display = 'none';
    }

    return this._cardElement;
  }
}



