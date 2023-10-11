import {blockSubmitButton, unblockSubmitButton} from './modal-functions.js';
import {hideValidationMessage, showValidationMessage} from './validation-message.js';
import {sendData} from './load-data.js';

const initSubmit = (evt, pristine, submit, errorMessage, successMessage, errorText, closeModal) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton(submit);
    hideValidationMessage(errorMessage);
    sendData(new FormData(evt.target))
      .then(
        () => {
          showValidationMessage(successMessage);
          unblockSubmitButton(submit);
          closeModal();
        }
      )
      .catch(
        (err) => {
          showValidationMessage(errorMessage);
          errorText.textContent = err.message;
          unblockSubmitButton(submit);
        }
      )
      .finally(() => {
      });
  } else {
    showValidationMessage(errorMessage);
  }
};

export {initSubmit};
