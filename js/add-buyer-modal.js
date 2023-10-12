import {debounce, isEscapeKey} from './util.js';
import {
  modalSell,
  sellCloseButton,
  sellContentContainer,
  sellEnrollmentInput,
  sellErrorMessage,
  sellErrorMessageText,
  sellExchangeAllCrypto,
  sellExchangeAllRub,
  sellForm,
  sellPaymentInput,
  sellSelect,
  sellSubmitButton,
  sellSuccessMessage,
  userCardNumber
} from './variables.js';
import {initSelectChange} from './modal-functions.js';
import {resetExchangeAllButton, resetForm, resetPaymentListeners, returnInitialView} from './close-modal-window.js';
import {initSubmit} from './init-submit.js';
import {initBuyerPristine} from './pristine-validation.js';

const addBuyerModal = (buyerData, userBalances, userDataArray) => {
  const {exchangeRate, minAmount, status, balance} = buyerData;
  const pristine = initBuyerPristine(minAmount, balance.amount, exchangeRate, status, userBalances);
  const onPaymentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      sellEnrollmentInput.value = sellPaymentInput.value * exchangeRate;
    });
    debouncedEnter();
  };
  sellPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
  const onEnrollmentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      sellPaymentInput.value = sellEnrollmentInput.value / exchangeRate;
    });
    debouncedEnter();
  };
  sellEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
  const onModalSellExchangeAllButtonClick = () => {
    if ((userBalances.KEKS * exchangeRate) <= balance.amount) {
      sellPaymentInput.value = userBalances.KEKS;
      sellEnrollmentInput.value = userBalances.KEKS * exchangeRate;
    }
    if ((userBalances.KEKS * exchangeRate) > balance.amount) {
      sellEnrollmentInput.value = balance.amount;
      sellPaymentInput.value = balance.amount / exchangeRate;
    }
  };
  sellExchangeAllCrypto.addEventListener('click', onModalSellExchangeAllButtonClick);
  sellExchangeAllRub.addEventListener('click', onModalSellExchangeAllButtonClick);
  const onModalSelectChange = () => {
    initSelectChange(sellSelect, userCardNumber, userDataArray);
  };
  sellSelect.addEventListener('change', onModalSelectChange);
  let onCloseModalButtonClick = {};
  let onKeydownCloseModalWindow = {};
  let onOutsideModalWindowClick = {};
  let onModalSubmit = {};
  const closeModalWindow = () => {
    resetPaymentListeners(sellPaymentInput, onPaymentInputEnterNewValue, sellEnrollmentInput, onEnrollmentInputEnterNewValue);
    resetExchangeAllButton(sellExchangeAllCrypto, onModalSellExchangeAllButtonClick);
    returnInitialView(modalSell, onOutsideModalWindowClick, sellErrorMessage, sellSelect, onModalSelectChange);
    resetForm(onKeydownCloseModalWindow, sellCloseButton, onCloseModalButtonClick, sellForm, onModalSubmit, pristine);
    sellExchangeAllRub.removeEventListener('click', onModalSellExchangeAllButtonClick);
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
    const outsideErrorContainerClick = event.composedPath().includes(sellContentContainer) === false;
    if (outsideErrorContainerClick) {
      closeModalWindow();
    }
  };
  onModalSubmit = (event) => {
    initSubmit(event, pristine, sellSubmitButton, sellErrorMessage, sellSuccessMessage, sellErrorMessageText, closeModalWindow);
  };
  sellForm.addEventListener('submit', onModalSubmit);
  modalSell.addEventListener('mousedown', onOutsideModalWindowClick);
  document.addEventListener('keydown', onKeydownCloseModalWindow);
  sellCloseButton.addEventListener('click', onCloseModalButtonClick);
};

export {addBuyerModal};
