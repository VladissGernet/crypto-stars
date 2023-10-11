import {blockSubmitButton, unblockSubmitButton} from './modal-functions.js';
import {hideValidationMessage, showValidationMessage} from './validation-message.js';
import {sendData} from './load-data.js';

const initSubmit = (e, prist, submit, errorMessage, successMessage, errorText, closeModal) => {
  e.preventDefault();
  const isValid = prist.validate();
  if (isValid) {
    blockSubmitButton(submit);
    hideValidationMessage(errorMessage);
    sendData(new FormData(e.target))
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
