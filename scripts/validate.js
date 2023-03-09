// Скрытие ошибки
const hiddenError = (errorElement, inputElement, options) => {
    errorElement.textContent = '';
    inputElement.classList.remove(options.classError);
  }
  // Показ ошибки
  const showError = (errorElement, inputElement, mes, options) => {
    errorElement.textContent = mes;
    inputElement.classList.add(options.classError);
  }
  
  const toggleInputState = (inputElement, options) => {
    const isValid = inputElement.validity.valid;
    const inputSectionElement = inputElement.closest(options.inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(options.inputErrorSelector);
    if (isValid){
      hiddenError(errorElement, inputElement, options);
    } else {
      showError(errorElement, inputElement, inputElement.validationMessage, options);
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
    const formIsValid = inputs.every((inputElement) => inputElement.validity.valid);
    if (formIsValid){
      enableButton(submitElement, disableButtonClass);
     } else {
      disableButton(submitElement, disableButtonClass);
     }
    }


  
  const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
    inputs.forEach(inputElement =>{
      inputElement.addEventListener('input', () =>{
        toggleInputState(inputElement, options);
        toggleButtonState(inputs, submitElement, options.disableButtonClass);
        });
    });
  };
  
  
  const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach(form => {
      setEventListeners(form, options);
    });
  };