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
  sellModalCashlimit,
  modalSelect,
  sellModalSelect,
  contractorCryptoWallet,
  modalSellPaymentInput,
  modalSellEnrollmentInput
} from './variables.js';
import {changeButtonClassName, filterValues, modalZIndex, scrollLockClass, sellerIdClassName, valueToOpenSellModal} from './constants.js';
import {addSpacesToNumber, debounce, onNumberInputKeydownCheckKey, transformCurrencyAmount} from './util.js';
import {
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods,
  showModalWindow
} from './modal-functions.js';
import {addModalListeners} from './modal-listeners.js';

modalBuy.style.zIndex = modalZIndex;
modalPaymentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
modalEnrollmentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);

const addModalWindowOpener = (contractorsData, serverUserData, userBalances) => {
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
        clearModalSelectOptions(modalSelect);
        fillPaymentMethods(paymentMethods, modalSelect);
        showModalWindow(modalBuy);
        userCryptoWalletField.placeholder = serverUserData.wallet.address;
        addModalListeners(selectedData, userBalances);
      }
      const activeMapToggle = toggleListMapContainer.querySelector('.is-active');
      if (filterValues[activeButton.textContent] === 'buyer' && activeMapToggle.textContent === valueToOpenSellModal) {
        sellSendingContractorId.value = id;
        sellSendingExchangeRate.value = exchangeRate;
        sellSendingCurrency.value = 'KEKS';
        sellSeceivingCurrency.value = 'RUB';
        fillUsernameWrapper(sellModalUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        sellModalRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
        sellModalCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        clearModalSelectOptions(sellModalSelect);
        fillPaymentMethods(serverUserData.paymentMethods, sellModalSelect);
        showModalWindow(modalSell);
        contractorCryptoWallet.placeholder = selectedData.wallet.address;
        const onPaymentInputEnterNewValue = () => {
          const debouncedEnter = debounce(() => {
            modalSellEnrollmentInput.value = modalSellPaymentInput.value * exchangeRate;
          });
          debouncedEnter();
        };
        modalSellPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
        const onEnrollmentInputEnterNewValue = () => {
          const debouncedEnter = debounce(() => {
            modalSellPaymentInput.value = modalSellEnrollmentInput.value / exchangeRate;
          });
          debouncedEnter();
        };
        modalSellEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
      }
    }
  });
};

export {addModalWindowOpener};
