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
  buySendingContractorId,
  buySendingExchangeRate,
  buySendingCurrency,
  buyReceivingCurrency,
  buySellContainer,
  modalSell,
  toggleListMapContainer,
  sellSendingContractorId,
  sellSendingExchangeRate,
  sellSendingCurrency,
  sellSeceivingCurrency,
  sellModalUsernameWrapper,
  sellModalRate,
} from './variables.js';
import {changeButtonClassName, filterValues, modalZIndex, scrollLockClass, sellerIdClassName, valueToOpenSellModal} from './constants.js';
import {addSpacesToNumber, onNumberInputKeydownCheckKey, transformCurrencyAmount} from './util.js';
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
// modalSell.style.display = 'block';

const addModalWindowOpener = (contractorsData, serverUserData, userBalances) => {
  userCryptoWalletField.placeholder = serverUserData.wallet.address;
  main.addEventListener('click', (evt) => {
    const selectedElement = evt.target.closest(`.${changeButtonClassName}`);
    if (selectedElement !== null) {
      evt.preventDefault();
      const selectedElementId = evt.target.closest(`.${sellerIdClassName}`).id;
      const selectedData = getSelectedDataId(contractorsData, selectedElementId);
      const {id, userName, isVerified, exchangeRate, minAmount, status, balance, paymentMethods} = selectedData;
      const minCurrencyAmount = transformCurrencyAmount(minAmount, exchangeRate, status);
      const maxCurrencyAmount = transformCurrencyAmount(balance.amount, exchangeRate, status);
      const activeButton = buySellContainer.querySelector('.is-active');
      body.classList.add(scrollLockClass);
      if (filterValues[activeButton.textContent] === 'seller') {
        buySendingContractorId.value = id;
        buySendingExchangeRate.value = exchangeRate;
        buySendingCurrency.value = 'RUB';
        buyReceivingCurrency.value = 'KEKS';
        fillUsernameWrapper(modalUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        modalRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
        modalCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        clearModalSelectOptions();
        fillPaymentMethods(paymentMethods);
        addModalListeners(selectedData, userBalances);
        modalBuy.style.display = 'block';
      }
      const activeMapToggle = toggleListMapContainer.querySelector('.is-active');
      if (filterValues[activeButton.textContent] === 'buyer' && activeMapToggle.textContent === valueToOpenSellModal) {
        modalSell.style.display = 'block';
        sellSendingContractorId.value = id;
        sellSendingExchangeRate.value = exchangeRate;
        sellSendingCurrency.value = 'KEKS';
        sellSeceivingCurrency.value = 'RUB';
        fillUsernameWrapper(sellModalUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        sellModalRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
      }
    }
  });
};

export {addModalWindowOpener};
