import {debounce, isEscapeKey, transformCurrencyAmount} from './util.js';
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
  sellPassword,
  sellPaymentInput,
  sellSelect,
  sellSubmitButton,
  sellSuccessMessage,
  userCardNumber
} from './variables.js';
import {initSelectChange} from './modal-functions.js';
import {resetExchangeAllButton, resetForm, resetPaymentListeners, returnInitialView} from './close-modal-window.js';
import {initSubmit} from './init-submit.js';
import {pristineDefaultConfig} from './constants.js';

const addBuyerModal = (buyerData, userBalances, userDataArray) => {
  const {exchangeRate, minAmount, status, balance} = buyerData;
  const newMinAmount = transformCurrencyAmount(minAmount, exchangeRate, status);
  const newMaxAmount = transformCurrencyAmount(balance.amount, exchangeRate, status);
  sellPaymentInput.required = true;
  sellPaymentInput.dataset.pristineRequiredMessage = 'Введите сумму.';
  sellPaymentInput.min = minAmount / exchangeRate;
  sellPaymentInput.dataset.pristineMinMessage = `Минимальная сумма — ${newMinAmount} ₽`;
  sellPaymentInput.max = balance.amount / exchangeRate;
  sellPaymentInput.dataset.pristineMaxMessage = `Максимальная сумма — ${newMaxAmount} ₽`;
  sellPassword.required = true;
  sellPassword.dataset.pristineRequiredMessage = 'Введите пароль.';
  const pristine = new Pristine(sellForm, pristineDefaultConfig, false);
  const checkSelect = () => sellSelect.selectedIndex;
  pristine.addValidator(sellSelect, checkSelect, 'Выберите платёжную систему.');
  const checkUserRubWallet = () => ((userBalances.KEKS * exchangeRate) >= sellEnrollmentInput.value);
  pristine.addValidator(sellPaymentInput, checkUserRubWallet, 'У вас недостаточно средств.');
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
