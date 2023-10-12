import {hideValidationMessage} from './validation-message.js';
import {
  buyCashlimit,
  buyErrorMessage,
  buyRate,
  buyReceivingCurrency,
  buySelect,
  buySendingContractorId,
  buySendingCurrency,
  buySendingExchangeRate,
  buySuccessMessage,
  buyUserCryptoWalletField,
  buyUsernameWrapper,
  modalBuy,
  modalVerifiedIconCopy
} from './variables.js';
import {
  clearModalSelectOptions,
  fillPaymentMethods,
  fillServerData,
  fillUsernameWrapper,
  showModalWindow
} from './modal-functions.js';
import {addSpacesToNumber} from './util.js';
import {addSellerModalListeners} from './seller-modal.js';

const openSellModal = (dataId, rate, name, status, min, max, paymentArray, serverData, chosenData, userValues) => {
  hideValidationMessage(buySuccessMessage);
  hideValidationMessage(buyErrorMessage);
  fillServerData(buySendingContractorId, dataId, buySendingExchangeRate, rate, buySendingCurrency, 'RUB', buyReceivingCurrency, 'KEKS');
  fillUsernameWrapper(buyUsernameWrapper, name, status, modalVerifiedIconCopy);
  buyRate.textContent = `${addSpacesToNumber(rate)} ₽`;
  buyCashlimit.textContent = `${min} ₽ - ${max} ₽`;
  clearModalSelectOptions(buySelect);
  fillPaymentMethods(paymentArray, buySelect);
  showModalWindow(modalBuy);
  buyUserCryptoWalletField.placeholder = serverData.wallet.address;
  addSellerModalListeners(chosenData, userValues);
};

export {openSellModal};
