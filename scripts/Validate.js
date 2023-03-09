// Скрытие ошибки
const hiddenError = (errorElement) => {

    errorElement.textContent = '';
  }
  // Показ ошибки
  const showError = (errorElement, mes) => {
  
    errorElement.textContent = mes;
  }
  
  const toggleInputState = (InputElement, options) => {
    const isValid = InputElement.validity.valid;
    const inputSectionElement = InputElement.closest(options.inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(options.inputErrorSelector);
    if (isValid){
      hiddenError(errorElement);
    } else {
      showError(errorElement, InputElement.validationMessage);
    }
  }
  
  const enableButton = (submitElement, disableButtonClass) => {
    submitElement.removeAttribute('disabled');
    submitElement.classList.remove(disableButtonClass);
  }
  
  const disableButton = (submitElement, disableButtonClass) => {
    submitElement.setAttribute('disabled', 'true');
    submitElement.classList.add(disableButtonClass);
  }
  
  const toggleButtonState = (inputs, submitElement, disableButtonClass) =>{
    //Все поля без ошибок - true
    const formIsValid = inputs.every((InputElement) => InputElement.validity.valid);
    if (formIsValid){
      enableButton(submitElement, disableButtonClass);
     } else {
      disableButton(submitElement, disableButtonClass);
     }
    }


  
  const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
    inputs.forEach(InputElement =>{
      InputElement.addEventListener('input', () =>{
        toggleInputState(InputElement, options);
        toggleButtonState(inputs, submitElement, options.disableButtonClass);
        });
    });
  };
  
  
  const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault(); 
          });

      setEventListeners(form, options);
    });
  };