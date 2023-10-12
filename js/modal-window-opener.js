import {
  body,
  main,
  modalBuy,
  modalVerifiedIconCopy,
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
  sellSelect,
  contractorCryptoWallet,
  sellErrorMessage,
  sellSuccessMessage,
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
import {hideValidationMessage} from './validation-message.js';
import {addBuyerModal} from './buyer-modal.js';
import {openSellModal} from './open-sell-modal.js';

const addModalWindowOpener = (contractorsData, serverUserData, userBalances) => {
  main.addEventListener('click', (evt) => {
    const selectedElement = evt.target.closest(`.${classNameOfChangeButton}`);
    if (selectedElement !== null) {
      modalBuy.style.zIndex = modalZIndex;
      evt.preventDefault();
      const selectedElementId = evt.target.closest(`.${sellerIdClassName}`).id;
      const selectedData = getSelectedDataId(contractorsData, selectedElementId);
      const {id, userName, isVerified, exchangeRate, minAmount, status, balance, paymentMethods} = selectedData;
      const minCurrencyAmount = transformCurrencyAmount(minAmount, exchangeRate, status);
      const maxCurrencyAmount = transformCurrencyAmount(balance.amount, exchangeRate, status);
      const activeButton = buySellContainer.querySelector('.is-active');
      body.classList.add(scrollLockClass);
      const activeMapToggle = toggleListMapContainer.querySelector('.is-active');
      if (activeMapToggle.textContent === 'Карта' && activeButton.textContent === 'Продать') {
        openSellModal(id, exchangeRate, userName, isVerified, minCurrencyAmount, maxCurrencyAmount, paymentMethods, serverUserData, selectedData, userBalances);
      }
      if (filterValues[activeButton.textContent] === 'seller') {
        openSellModal(id, exchangeRate, userName, isVerified, minCurrencyAmount, maxCurrencyAmount, paymentMethods, serverUserData, selectedData, userBalances);
      }
      if (filterValues[activeButton.textContent] === 'buyer' && activeMapToggle.textContent === filterValueToOpenSellModal) {
        hideValidationMessage(sellSuccessMessage);
        hideValidationMessage(sellErrorMessage);
        fillServerData(sellSendingContractorId, id, sellSendingExchangeRate, exchangeRate, sellSendingCurrency, 'KEKS', sellReceivingCurrency, 'RUB');
        fillUsernameWrapper(sellUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        selllRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
        sellCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        clearModalSelectOptions(sellSelect);
        fillPaymentMethods(serverUserData.paymentMethods, sellSelect);
        showModalWindow(modalSell);
        contractorCryptoWallet.placeholder = selectedData.wallet.address;
        addBuyerModal(selectedData, userBalances, serverUserData.paymentMethods);
      }
    }
  });
};

export {addModalWindowOpener};
