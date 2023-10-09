import {
  body,
  exchangeAllButton,
  main,
  modalBuy,
  modalBuyContentContainer,
  modalCashlimit,
  modalCloseButton,
  modalEnrollmentInput,
  modalMinAmountError,
  modalPaymentInput,
  modalRate,
  modalUsernameWrapper,
  modalVerifiedIconCopy
} from './variables.js';
import {changeButtonClassName, modalZIndex, scrollLockClass} from './constants.js';
import {transformCurrencyAmount, trimNumber} from './render-table.js';
import {debounce, isEscapeKey, onNumberInputKeydownCheckKey} from './util.js';
import {
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods
} from './modal-functions.js';

modalBuy.style.zIndex = modalZIndex;
modalPaymentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
modalEnrollmentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);

// let userData = {};
// getUserData()
//   .then((data) => {
//     userData = data;
//   });

const addModalWindowOpener = (contractorsData) => {
  main.addEventListener('click', (evt) => {
    const selectedElement = evt.target.closest(`.${changeButtonClassName}`);
    if (selectedElement !== null) {
      evt.preventDefault();
      const selectedElementId = evt.target.closest('.users-list__table-row').id;
      const selectedData = getSelectedDataId(contractorsData, selectedElementId);
      const {userName, isVerified, exchangeRate, minAmount, status, balance, paymentMethods} = selectedData;
      const minCurrencyAmount = transformCurrencyAmount(minAmount, exchangeRate, status);
      const maxCurrencyAmount = transformCurrencyAmount(balance.amount, exchangeRate, status);
      body.classList.add(scrollLockClass);
      fillUsernameWrapper(modalUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
      modalRate.textContent = `${trimNumber(exchangeRate)} ₽`;
      modalCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
      modalMinAmountError.textContent = `Минимальная сумма — ${minCurrencyAmount} ₽`;
      clearModalSelectOptions();
      fillPaymentMethods(paymentMethods);
      const onPaymentInputEnterNewValue = () => {
        const debouncedEnter = debounce(() => {
          modalEnrollmentInput.value = (modalPaymentInput.value / exchangeRate).toFixed(2);
        });
        debouncedEnter();
      };
      const onEnrollmentInputEnterNewValue = () => {
        const debouncedEnter = debounce(() => {
          modalPaymentInput.value = Math.floor(modalEnrollmentInput.value * exchangeRate);
        });
        debouncedEnter();
      };
      const onExchangeAllButtonClick = () => {
        modalEnrollmentInput.value = balance.amount;
        modalPaymentInput.value = Math.floor(balance.amount * exchangeRate);
      };
      modalPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
      modalEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
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
      modalBuy.style.display = 'block';
    }
  });
};

export {addModalWindowOpener};
