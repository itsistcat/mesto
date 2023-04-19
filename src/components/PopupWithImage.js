import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    _photoItem = this._popup.querySelector('.fullscreen');
    _photoSubt = this._popup.querySelector('.fullscreen-subtitle');

    open(imageLink, imageName) {
        super.open();
        this._photoItem.src = imageLink;
        this._photoItem.alt = imageName;
        this._photoSubt.textContent = imageName;
    }
}