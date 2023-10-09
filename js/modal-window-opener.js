import {
  body,
  main,
  modalBuy,
  modalCashlimit,
  modalEnrollmentInput,
  modalMinAmountError,
  modalPaymentInput,
  modalRate,
  modalUsernameWrapper,
  modalVerifiedIconCopy
} from './variables.js';
import {changeButtonClassName, modalZIndex, scrollLockClass} from './constants.js';
import {transformCurrencyAmount, trimNumber} from './render-table.js';
import {onNumberInputKeydownCheckKey} from './util.js';
import {
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods
} from './modal-functions.js';
import {addModalListeners} from './modal-listeners.js';

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
      addModalListeners(exchangeRate, balance.amount);
      modalBuy.style.display = 'block';
    }
  });
};

export {addModalWindowOpener};
