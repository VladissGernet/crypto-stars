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
  userCardNumberField,
  validationErrorMessage,
  validationSuccessMessage,
  modalSubmitButton
} from './variables.js';
import {scrollLockClass, initialModalSelectValue, SubmitButtonText} from './constants.js';
import {debounce, isEscapeKey, addPointToNumber} from './util.js';
import {initPristine} from './init-pristine.js';
import {hideValidationMessage, showValidationMessage} from './validation-message.js';
import {sendData} from './load-data.js';

const blockSubmitButton = () => {
  modalSubmitButton.disabled = true;
  modalSubmitButton.textContent = SubmitButtonText.SENDING;
};
const unblockSubmitButton = () => {
  modalSubmitButton.disabled = false;
  modalSubmitButton.textContent = SubmitButtonText.IDLE;
};

const userCardNumberFieldInitialPlaceholder = userCardNumberField.placeholder;
const addModalListeners = (sellerData, userBalances) => {
  const {exchangeRate, balance, paymentMethods, minAmount, status} = sellerData;
  const pristine = initPristine(minAmount, balance.amount, exchangeRate, status, userBalances);
  const onPaymentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalEnrollmentInput.value = modalPaymentInput.value / exchangeRate;
    });
    debouncedEnter();
  };
  modalPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
  const onEnrollmentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalPaymentInput.value = addPointToNumber(modalEnrollmentInput.value * exchangeRate);
      modalPaymentInput.value = Number(modalPaymentInput.value).toFixed(2);
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
  let onModalSubmit = {};
  const closeModalWindow = () => {
    body.classList.remove(scrollLockClass);
    modalBuy.style.display = 'none';
    modalPaymentInput.removeEventListener('input', onPaymentInputEnterNewValue);
    modalEnrollmentInput.removeEventListener('input', onEnrollmentInputEnterNewValue);
    exchangeAllButton.removeEventListener('click', onExchangeAllButtonClick);
    document.removeEventListener('keydown', onKeydownCloseModalWindow);
    modalCloseButton.removeEventListener('click', onCloseModalButtonClick);
    modalBuy.removeEventListener('mousedown', onOutsideModalWindowClick);
    modalSelect.removeEventListener('change', onModalSelectChange);
    modalSelect.selectedIndex = initialModalSelectValue;
    userCardNumberField.placeholder = userCardNumberFieldInitialPlaceholder;
    modalEnrollmentInput.value = '';
    modalPaymentInput.value = '';
    pristine.destroy();
    hideValidationMessage(validationErrorMessage);
    hideValidationMessage(validationSuccessMessage);
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
  onModalSubmit = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      hideValidationMessage(validationErrorMessage);
      sendData(new FormData(evt.target))
        .then(
          () => {
            showValidationMessage(validationSuccessMessage);
          }
        )
        .catch(
          (err) => {
            console.log(err.message);
          }
        )
        .finally(() => {
          console.log('final');
          unblockSubmitButton();
          // closeModalWindow();
        });
    } else {
      showValidationMessage(validationErrorMessage);
    }
  };
  modalBuyForm.addEventListener('submit', onModalSubmit);
  modalBuy.addEventListener('mousedown', onOutsideModalWindowClick);
  document.addEventListener('keydown', onKeydownCloseModalWindow);
  modalCloseButton.addEventListener('click', onCloseModalButtonClick);
};

export {addModalListeners};
