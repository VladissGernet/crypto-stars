import {
  buyExchangeAllButton,
  modalBuy,
  buyContentContainer,
  buyForm,
  buyCloseButton,
  buyEnrollmentInput,
  buyPaymentInput,
  buySelect,
  contractorCardNumberField,
  buyErrorMessage,
  buySuccessMessage,
  buyErrorMessageText,
  buySubmitButton
} from './variables.js';
import {debounce, isEscapeKey} from './util.js';
import {initPristine} from './init-pristine.js';
import {initSubmit} from './init-submit.js';
import {resetPaymentListeners, returnInitialView, resetForm, resetExchangeAllButton} from './close-modal-window.js';
import {initSelectChange} from './modal-functions.js';

const userCardNumberFieldInitialPlaceholder = contractorCardNumberField.placeholder;
const addSellerModalListeners = (sellerData, userBalances) => {
  const {exchangeRate, balance, paymentMethods, minAmount, status} = sellerData;
  const pristine = initPristine(minAmount, balance.amount, exchangeRate, status, userBalances);
  const onPaymentEnterValue = () => {
    const debouncedEnter = debounce(() => {
      buyEnrollmentInput.value = buyPaymentInput.value / exchangeRate;
    });
    debouncedEnter();
  };
  buyPaymentInput.addEventListener('input', onPaymentEnterValue);
  const onEnrollmentEnterValue = () => {
    const debouncedEnter = debounce(() => {
      buyPaymentInput.value = buyEnrollmentInput.value * exchangeRate;
      buyPaymentInput.value = Number(buyPaymentInput.value).toFixed(2);
    });
    debouncedEnter();
  };
  buyEnrollmentInput.addEventListener('input', onEnrollmentEnterValue);
  const onExchangeAllButtonClick = () => {
    if (userBalances.RUB <= (balance.amount * exchangeRate)) {
      buyEnrollmentInput.value = userBalances.RUB / exchangeRate;
      buyPaymentInput.value = userBalances.RUB;
    }
    if (userBalances.RUB > (balance.amount * exchangeRate)) {
      buyEnrollmentInput.value = balance.amount;
      buyPaymentInput.value = balance.amount * exchangeRate;
    }
  };
  buyExchangeAllButton.addEventListener('click', onExchangeAllButtonClick);
  const onModalSelectChange = () => {
    initSelectChange(buySelect, contractorCardNumberField, paymentMethods);
  };
  buySelect.addEventListener('change', onModalSelectChange);
  let onCloseModalButtonClick = {};
  let onKeydownCloseModalWindow = {};
  let onOutsideWindowClick = {};
  let onModalSubmit = {};
  const closeModalWindow = () => {
    resetPaymentListeners(buyPaymentInput, onPaymentEnterValue, buyEnrollmentInput, onEnrollmentEnterValue);
    resetExchangeAllButton(buyExchangeAllButton, onExchangeAllButtonClick);
    returnInitialView(modalBuy, onOutsideWindowClick, buyErrorMessageText, buySelect, onModalSelectChange);
    resetForm(onKeydownCloseModalWindow, buyCloseButton, onCloseModalButtonClick, buyForm, onModalSubmit, pristine);
    contractorCardNumberField.placeholder = userCardNumberFieldInitialPlaceholder;
  };
  onKeydownCloseModalWindow = (event) => {
    if (isEscapeKey(event)) {
      closeModalWindow();
    }
  };
  onCloseModalButtonClick = () => {
    closeModalWindow();
  };
  onOutsideWindowClick = (event) => {
    const outsideErrorContainerClick = event.composedPath().includes(buyContentContainer) === false;
    if (outsideErrorContainerClick) {
      closeModalWindow();
    }
  };
  onModalSubmit = (evt) => {
    initSubmit(evt, pristine, buySubmitButton, buyErrorMessage, buySuccessMessage, buyErrorMessageText, closeModalWindow);
  };
  buyForm.addEventListener('submit', onModalSubmit);
  modalBuy.addEventListener('mousedown', onOutsideWindowClick);
  document.addEventListener('keydown', onKeydownCloseModalWindow);
  buyCloseButton.addEventListener('click', onCloseModalButtonClick);
};

export {addSellerModalListeners};
