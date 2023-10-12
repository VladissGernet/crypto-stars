import {body, buyErrorMessage, buySuccessMessage} from './variables.js';
import {defaultErrorMessageText, initialModalSelectValue, scrollLockClass} from './constants.js';
import {hideValidationMessage} from './validation-message.js';

const resetPaymentListeners = (paymentInput, onPaymentInput, enrollmentInput, onEnrollmentInput, exchangeAll, onExchangeAllClick) => {
  paymentInput.removeEventListener('input', onPaymentInput);
  enrollmentInput.removeEventListener('input', onEnrollmentInput);
  paymentInput.value = '';
  enrollmentInput.value = '';
  exchangeAll.removeEventListener('click', onExchangeAllClick);
};
const returnInitialView = (modal, onOutsideModalWindowClick, errorText, select, onSelectChange) => {
  body.classList.remove(scrollLockClass);
  modal.style.display = 'none';
  modal.removeEventListener('mousedown', onOutsideModalWindowClick);
  errorText.textContent = defaultErrorMessageText;
  select.selectedIndex = initialModalSelectValue;
  select.removeEventListener('change', onSelectChange);
  select.selectedIndex = initialModalSelectValue;
  hideValidationMessage(buyErrorMessage);
  hideValidationMessage(buySuccessMessage);
};
const resetForm = (onKeydownCloseModalWindow, closeButton, onCloseButtonClick, form, onFormSubmit, pristineConstructor) => {
  document.removeEventListener('keydown', onKeydownCloseModalWindow);
  closeButton.removeEventListener('click', onCloseButtonClick);
  form.removeEventListener('submit', onFormSubmit);
  pristineConstructor.destroy();
};

export {resetPaymentListeners, returnInitialView, resetForm};
