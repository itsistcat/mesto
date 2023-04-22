export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup__opened');
        document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
    }

    close() {
        this._popup.classList.remove('popup__opened');
        document.removeEventListener('keyup',  (evt) => this._handleEscClose(evt));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    
    setEventListener() {
        this._closeButton = this._popup.querySelector(".popup__close");
        this._closeButton.addEventListener("mousedown", () => {
            this.close();
        });

        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target !== evt.currentTarget) {
                return;
            }
            this.close();
        });
    }
}  