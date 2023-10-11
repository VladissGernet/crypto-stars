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
  buyErrorMessageText,
  buySubmitButton
} from './variables.js';
import {scrollLockClass, initialModalSelectValue, defaultErrorMessageText} from './constants.js';
import {debounce, isEscapeKey} from './util.js';
import {initPristine} from './init-pristine.js';
import {hideValidationMessage} from './validation-message.js';
import {initSubmit} from './init-submit.js';
import {resetPaymentListeners} from './close-modal-window.js';

const userCardNumberFieldInitialPlaceholder = contractorCardNumberField.placeholder;
const addModalListeners = (sellerData, userBalances) => {
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
  const resetForm = (modal, closeButton, select, form, errorText, onSelectChange, onFormSubmit) => {
    body.classList.remove(scrollLockClass);
    modal.style.display = 'none';
    modal.removeEventListener('mousedown', onOutsideModalWindowClick);
    hideValidationMessage(buyErrorMessage);
    hideValidationMessage(buySuccessMessage);
    errorText.textContent = defaultErrorMessageText;
    pristine.destroy();
    document.removeEventListener('keydown', onKeydownCloseModalWindow);
    closeButton.removeEventListener('click', onCloseModalButtonClick);
    select.removeEventListener('change', onSelectChange);
    select.selectedIndex = initialModalSelectValue;
    form.removeEventListener('submit', onFormSubmit);
  };
  const closeModalWindow = () => {
    resetPaymentListeners(buyPaymentInput, onPaymentEnterValue, buyEnrollmentInput, onEnrollmentEnterValue, buyExchangeAllButton, onExchangeAllButtonClick);
    resetForm(modalBuy, buyCloseButton, buySelect, buyForm, buyErrorMessageText, onModalSelectChange, onModalSubmit);
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
  onOutsideModalWindowClick = (event) => {
    const outsideErrorContainerClick = event.composedPath().includes(buyContentContainer) === false;
    if (outsideErrorContainerClick) {
      closeModalWindow();
    }
  };
  onModalSubmit = (evt) => {
    initSubmit(evt, pristine, buySubmitButton, buyErrorMessage, buySuccessMessage, buyErrorMessageText, closeModalWindow);
  };
  buyForm.addEventListener('submit', onModalSubmit);
  modalBuy.addEventListener('mousedown', onOutsideModalWindowClick);
  document.addEventListener('keydown', onKeydownCloseModalWindow);
  buyCloseButton.addEventListener('click', onCloseModalButtonClick);
};

export {addModalListeners};
