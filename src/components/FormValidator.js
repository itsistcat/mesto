export default class FormValidator {
    constructor(validationProps , form) {
        this._options = validationProps ;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));
        this._submitElement = this._form.querySelector(this._options.submitSelector);
    }
    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this.toggleButtonState();
            });
        });
    };

    _toggleInputState = (inputElement) => {
        const isValid = inputElement.validity.valid;
        const inputSectionElement = inputElement.closest(this._options.inputSectionSelector);
        const errorElement = inputSectionElement.querySelector(this._options.inputErrorSelector);

        if (isValid) {
            this._hiddenError(inputElement);
        } else {
            this._showError(errorElement, inputElement, inputElement.validationMessage);

        }
    }

    // Скрытие ошибки
    _hiddenError = (inputElement) => {
        const inputSectionElement = inputElement.closest(this._options.inputSectionSelector);
        const errorElement = inputSectionElement.querySelector(this._options.inputErrorSelector);
        errorElement.textContent = '';
        inputElement.classList.remove(this._options.classError);
    }
    // Показ ошибки
    _showError = (errorElement, inputElement, mes) => {
        errorElement.textContent = mes;
        inputElement.classList.add(this._options.classError);
    }


    toggleButtonState = () => {
        //Все поля без ошибок - true
        const formIsValid = this._inputs.every((inputElement) => inputElement.validity.valid);
        if (formIsValid) {
            this._enableButton();
        } else {
            this._disableButton();
        }
    }

    _enableButton = () => {
        this._submitElement.removeAttribute('disabled');
        this._submitElement.classList.remove(this._options.disableButtonClass);
    }

    _disableButton = () => {
        this._submitElement.setAttribute('disabled', 'true');
        this._submitElement.classList.add(this._options.disableButtonClass);
    }

    resetValidation() {
        this.toggleButtonState();
        this._inputs.forEach((inputElement) => {
            this._hiddenError(inputElement) //очищаем ошибки
            //this._enableButton(); //включаем кнопку
        });
    }
}
