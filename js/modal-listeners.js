import {
  body,
  exchangeAllButton,
  modalBuy, modalBuyContentContainer,
  modalCloseButton,
  modalEnrollmentInput,
  modalPaymentInput
} from './variables.js';
import {scrollLockClass} from './constants.js';
import {debounce, isEscapeKey} from './util.js';

const addModalListeners = (rate, balanceAmount) => {
  const onPaymentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalEnrollmentInput.value = (modalPaymentInput.value / rate).toFixed(2);
    });
    debouncedEnter();
  };
  modalPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
  const onEnrollmentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalPaymentInput.value = Math.floor(modalEnrollmentInput.value * rate);
    });
    debouncedEnter();
  };
  modalEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
  const onExchangeAllButtonClick = () => {
    modalEnrollmentInput.value = balanceAmount;
    modalPaymentInput.value = Math.floor(balanceAmount * rate);
  };
  exchangeAllButton.addEventListener('click', onExchangeAllButtonClick);
  let onCloseModalButtonClick = {};
  let onKeydownCloseModalWindow = {};
  let onOutsideModalWindowClick = {};
  const closeModalWindow = () => {
    body.classList.remove(scrollLockClass);
    modalBuy.style.display = 'none';
    modalPaymentInput.removeEventListener('input', onPaymentInputEnterNewValue);
    modalEnrollmentInput.removeEventListener('input', onEnrollmentInputEnterNewValue);
    exchangeAllButton.removeEventListener('click', onExchangeAllButtonClick);
    document.removeEventListener('keydown', onKeydownCloseModalWindow);
    modalCloseButton.removeEventListener('click', onCloseModalButtonClick);
    modalBuy.removeEventListener('click', onOutsideModalWindowClick);
    modalEnrollmentInput.value = '';
    modalPaymentInput.value = '';
  };
  onKeydownCloseModalWindow = (event) => {
    if (isEscapeKey(event)) {
      closeModalWindow();
    }
  };
  onCloseModalButtonClick = () => {
    closeModalWindow();
  };
  onOutsideModalWindowClick = (event) => {
    const outsideErrorContainerClick = event.composedPath().includes(modalBuyContentContainer) === false;
    if (outsideErrorContainerClick) {
      closeModalWindow();
    }
  };
  modalBuy.addEventListener('click', onOutsideModalWindowClick);
  document.addEventListener('keydown', onKeydownCloseModalWindow);
  modalCloseButton.addEventListener('click', onCloseModalButtonClick);
};

export {addModalListeners};
