import {
  body,
  main,
  modalBuy,
  buyCashlimit,
  buyEnrollmentInput,
  buyPaymentInput,
  buyRate,
  buyUsernameWrapper,
  modalVerifiedIconCopy,
  buyUserCryptoWalletField,
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
  sellReceivingCurrency,
  sellUsernameWrapper,
  selllRate,
  sellCashlimit,
  buySelect,
  sellSelect,
  contractorCryptoWallet,
  sellPaymentInput,
  sellEnrollmentInput,
  sellErrorMessage,
  sellSuccessMessage,
  buySuccessMessage,
  buyErrorMessage,
  sellPassword,
} from './variables.js';
import {
  classNameOfChangeButton,
  filterValues,
  modalZIndex,
  scrollLockClass,
  sellerIdClassName,
  filterValueToOpenSellModal
} from './constants.js';
import {
  addSpacesToNumber,
  onNumberInputKeydownCheckKey,
  transformCurrencyAmount
} from './util.js';
import {
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods,
  showModalWindow,
  fillServerData
} from './modal-functions.js';
import {addSellerModalListeners} from './modal-listeners.js';
import {hideValidationMessage} from './validation-message.js';
import {addBuyerListeners} from './add-buyer-listeners.js';

modalBuy.style.zIndex = modalZIndex;
buyPaymentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
buyEnrollmentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
sellPaymentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
sellEnrollmentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);

const addModalWindowOpener = (contractorsData, serverUserData, userBalances) => {
  main.addEventListener('click', (evt) => {
    const selectedElement = evt.target.closest(`.${classNameOfChangeButton}`);
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
        hideValidationMessage(buySuccessMessage);
        hideValidationMessage(buyErrorMessage);
        fillServerData(buySendingContractorId, id, buySendingExchangeRate, exchangeRate, buySendingCurrency, 'RUB', buyReceivingCurrency, 'KEKS');
        fillUsernameWrapper(buyUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        buyRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
        buyCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        clearModalSelectOptions(buySelect);
        fillPaymentMethods(paymentMethods, buySelect);
        showModalWindow(modalBuy);
        buyUserCryptoWalletField.placeholder = serverUserData.wallet.address;
        addSellerModalListeners(selectedData, userBalances);
      }
      const activeMapToggle = toggleListMapContainer.querySelector('.is-active');
      if (filterValues[activeButton.textContent] === 'buyer' && activeMapToggle.textContent === filterValueToOpenSellModal) {
        hideValidationMessage(sellSuccessMessage);
        hideValidationMessage(sellErrorMessage);
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
        fillServerData(sellSendingContractorId, id, sellSendingExchangeRate, exchangeRate, sellSendingCurrency, 'KEKS', sellReceivingCurrency, 'RUB');
        fillUsernameWrapper(sellUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        selllRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
        sellCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        clearModalSelectOptions(sellSelect);
        fillPaymentMethods(serverUserData.paymentMethods, sellSelect);
        showModalWindow(modalSell);
        contractorCryptoWallet.placeholder = selectedData.wallet.address;
        addBuyerListeners(selectedData, userBalances, serverUserData.paymentMethods);
      }
    }
  });
};

export {addModalWindowOpener};
