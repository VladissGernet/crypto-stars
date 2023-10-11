import {
  body,
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
  buySubmitButton,
  buyErrorMessageText
} from './variables.js';
import {scrollLockClass, initialModalSelectValue, defaultErrorMessageText} from './constants.js';
import {debounce, isEscapeKey} from './util.js';
import {initPristine} from './init-pristine.js';
import {hideValidationMessage, showValidationMessage} from './validation-message.js';
import {sendData} from './load-data.js';
import {blockSubmitButton, unblockSubmitButton} from './modal-functions.js';

const userCardNumberFieldInitialPlaceholder = contractorCardNumberField.placeholder;
const addModalListeners = (sellerData, userBalances) => {
  const {exchangeRate, balance, paymentMethods, minAmount, status} = sellerData;
  const pristine = initPristine(minAmount, balance.amount, exchangeRate, status, userBalances);
  const onPaymentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      buyEnrollmentInput.value = buyPaymentInput.value / exchangeRate;
    });
    debouncedEnter();
  };
  buyPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
  const onEnrollmentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      buyPaymentInput.value = buyEnrollmentInput.value * exchangeRate;
      buyPaymentInput.value = Number(buyPaymentInput.value).toFixed(2);
    });
    debouncedEnter();
  };
  buyEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
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
    const selectValue = buySelect.value;
    switch (selectValue) {
      case 'Cash in person':
        contractorCardNumberField.placeholder = '';
        break;
      default:
        for (const paymentMethod of paymentMethods) {
          const providerName = paymentMethod.provider;
          if (providerName === selectValue) {
            contractorCardNumberField.placeholder = paymentMethod.accountNumber;
            break;
          }
        }
        break;
    }
  };
  buySelect.addEventListener('change', onModalSelectChange);
  let onCloseModalButtonClick = {};
  let onKeydownCloseModalWindow = {};
  let onOutsideModalWindowClick = {};
  let onModalSubmit = {};
  const closeModalWindow = () => {
    body.classList.remove(scrollLockClass);
    modalBuy.style.display = 'none';
    buyPaymentInput.removeEventListener('input', onPaymentInputEnterNewValue);
    buyEnrollmentInput.removeEventListener('input', onEnrollmentInputEnterNewValue);
    buyExchangeAllButton.removeEventListener('click', onExchangeAllButtonClick);
    document.removeEventListener('keydown', onKeydownCloseModalWindow);
    buyCloseButton.removeEventListener('click', onCloseModalButtonClick);
    modalBuy.removeEventListener('mousedown', onOutsideModalWindowClick);
    buySelect.removeEventListener('change', onModalSelectChange);
    buySelect.selectedIndex = initialModalSelectValue;
    contractorCardNumberField.placeholder = userCardNumberFieldInitialPlaceholder;
    buyEnrollmentInput.value = '';
    buyPaymentInput.value = '';
    pristine.destroy();
    hideValidationMessage(buyErrorMessage);
    hideValidationMessage(buySuccessMessage);
    buyForm.removeEventListener('submit', onModalSubmit);
    buyErrorMessageText.textContent = defaultErrorMessageText;
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
    const outsideErrorContainerClick = event.composedPath().includes(buyContentContainer) === false;
    if (outsideErrorContainerClick) {
      closeModalWindow();
    }
  };
  onModalSubmit = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton(buySubmitButton);
      hideValidationMessage(buyErrorMessage);
      sendData(new FormData(evt.target))
        .then(
          () => {
            showValidationMessage(buySuccessMessage);
            unblockSubmitButton(buySubmitButton);
            closeModalWindow();
          }
        )
        .catch(
          (err) => {
            showValidationMessage(buyErrorMessage);
            buyErrorMessageText.textContent = err.message;
            unblockSubmitButton(buySubmitButton);
          }
        )
        .finally(() => {
        });
    } else {
      showValidationMessage(buyErrorMessage);
    }
  };
  buyForm.addEventListener('submit', onModalSubmit);
  modalBuy.addEventListener('mousedown', onOutsideModalWindowClick);
  document.addEventListener('keydown', onKeydownCloseModalWindow);
  buyCloseButton.addEventListener('click', onCloseModalButtonClick);
};

export {addModalListeners};
