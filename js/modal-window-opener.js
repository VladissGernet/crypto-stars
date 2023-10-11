import {
  body,
  main,
  modalBuy,
  modalCashlimit,
  modalEnrollmentInput,
  modalPaymentInput,
  modalRate,
  modalUsernameWrapper,
  modalVerifiedIconCopy,
  userCryptoWalletField,
  sendingContractorId,
  sendingExchangeRate,
  sendingCurrency,
  receivingCurrency,
  buySellContainer,
  modalSell
} from './variables.js';
import {changeButtonClassName, filterValues, modalZIndex, scrollLockClass, sellerIdClassName} from './constants.js';
import {onNumberInputKeydownCheckKey, transformCurrencyAmount} from './util.js';
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

const addModalWindowOpener = (contractorsData, serverUserData, userBalances) => {
  userCryptoWalletField.placeholder = serverUserData.wallet.address;
  main.addEventListener('click', (evt) => {
    const selectedElement = evt.target.closest(`.${changeButtonClassName}`);
    if (selectedElement !== null) {
      evt.preventDefault();
      const selectedElementId = evt.target.closest(`.${sellerIdClassName}`).id;
      const selectedData = getSelectedDataId(contractorsData, selectedElementId);
      const {id, userName, isVerified, exchangeRate, minAmount, status, balance, paymentMethods} = selectedData;
      const activeButton = buySellContainer.querySelector('.is-active');
      if (filterValues[activeButton.textContent] === 'seller') {
        sendingContractorId.value = id;
        sendingExchangeRate.value = exchangeRate;
        sendingCurrency.value = 'RUB';
        receivingCurrency.value = 'KEKS';
        const minCurrencyAmount = transformCurrencyAmount(minAmount, exchangeRate, status);
        const maxCurrencyAmount = transformCurrencyAmount(balance.amount, exchangeRate, status);
        body.classList.add(scrollLockClass);
        fillUsernameWrapper(modalUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        modalRate.textContent = `${exchangeRate} ₽`;
        modalCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        clearModalSelectOptions();
        fillPaymentMethods(paymentMethods);
        addModalListeners(selectedData, userBalances);
        modalBuy.style.display = 'block';
      }
      if (filterValues[activeButton.textContent] === 'buyer') {
        modalSell.style.display = 'block';
      }
    }
  });
};

export {addModalWindowOpener};
