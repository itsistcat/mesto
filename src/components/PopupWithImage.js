import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup, photoItem, photoSubt) {
        super(popup);
        this._photoItem = photoItem;
        this._photoSubt = photoSubt;
    }
    open(imageLink, imageName) {
        super.open();
        this._photoItem.src = imageLink;
        this._photoItem.alt = imageName;
        this._photoSubt.textContent = imageName;
    }
}