import {
  body,
  exchangeAllButton,
  modalBuy,
  modalBuyContentContainer,
  modalBuyForm,
  modalCloseButton,
  modalEnrollmentInput,
  modalPaymentInput,
  modalSelect,
  userCardNumberField
} from './variables.js';
import {scrollLockClass, initialModalSelectValue} from './constants.js';
import {debounce, isEscapeKey} from './util.js';
import {initPristine} from './init-pristine.js';

const userCardNumberFieldInitialPlaceholder = userCardNumberField.placeholder;
const addModalListeners = (sellerData) => {
  const {exchangeRate, balance, paymentMethods, minAmount, status} = sellerData;
  const pristine = initPristine(minAmount, balance.amount, exchangeRate, status);
  const onModalSubmit = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    console.log(isValid);
  };
  modalBuyForm.addEventListener('submit', onModalSubmit);
  const onPaymentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalEnrollmentInput.value = (modalPaymentInput.value / exchangeRate).toFixed(2);
    });
    debouncedEnter();
  };
  modalPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
  const onEnrollmentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalPaymentInput.value = Math.floor(modalEnrollmentInput.value * exchangeRate);
    });
    debouncedEnter();
  };
  modalEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
  const onExchangeAllButtonClick = () => {
    modalEnrollmentInput.value = balance.amount;
    modalPaymentInput.value = Math.floor(balance.amount * exchangeRate);
  };
  exchangeAllButton.addEventListener('click', onExchangeAllButtonClick);
  const onModalSelectChange = () => {
    const selectValue = modalSelect.value;
    switch (selectValue) {
      case 'Cash in person':
        userCardNumberField.placeholder = '';
        break;
      default:
        for (const paymentMethod of paymentMethods) {
          const providerName = paymentMethod.provider;
          if (providerName === selectValue) {
            userCardNumberField.placeholder = paymentMethod.accountNumber;
            break;
          }
        }
        break;
    }
  };
  modalSelect.addEventListener('change', onModalSelectChange);
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
    modalSelect.removeEventListener('change', onModalSelectChange);
    modalSelect.selectedIndex = initialModalSelectValue;
    userCardNumberField.placeholder = userCardNumberFieldInitialPlaceholder;
    modalEnrollmentInput.value = '';
    modalPaymentInput.value = '';
    pristine.destroy();
    modalBuyForm.removeEventListener('submit', onModalSubmit);
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
