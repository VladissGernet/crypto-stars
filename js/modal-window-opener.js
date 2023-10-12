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
  sellExchangeAllCrypto,
  sellExchangeAllRub,
  userCardNumber,
  sellCloseButton,
  sellErrorMessage,
  sellSuccessMessage,
  sellContentContainer,
  sellForm,
  sellSubmitButton,
  sellErrorMessageText,
  buySuccessMessage,
  buyErrorMessage,
  sellPassword,
} from './variables.js';
import {
  classNameOfChangeButton,
  filterValues,
  modalZIndex,
  pristineDefaultConfig,
  scrollLockClass,
  sellerIdClassName,
  filterValueToOpenSellModal
} from './constants.js';
import {
  addSpacesToNumber,
  debounce,
  isEscapeKey,
  onNumberInputKeydownCheckKey,
  transformCurrencyAmount
} from './util.js';
import {
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods,
  showModalWindow,
  initSelectChange,
  fillServerData
} from './modal-functions.js';
import {addSellerModalListeners} from './modal-listeners.js';
import {hideValidationMessage} from './validation-message.js';
import {initSubmit} from './init-submit.js';
import {resetExchangeAllButton, resetForm, resetPaymentListeners, returnInitialView} from './close-modal-window.js';

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
        const pristine = new Pristine(sellForm, pristineDefaultConfig, false);
        const checkSelect = () => sellSelect.selectedIndex;
        pristine.addValidator(sellSelect, checkSelect, 'Выберите платёжную систему.');
        const checkUserRubWallet = () => ((userBalances.KEKS * exchangeRate) >= sellEnrollmentInput.value);
        pristine.addValidator(sellPaymentInput, checkUserRubWallet, 'У вас недостаточно средств.');
        fillServerData(sellSendingContractorId, id, sellSendingExchangeRate, exchangeRate, sellSendingCurrency, 'KEKS', sellReceivingCurrency, 'RUB');
        fillUsernameWrapper(sellUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        selllRate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
        sellCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        clearModalSelectOptions(sellSelect);
        fillPaymentMethods(serverUserData.paymentMethods, sellSelect);
        showModalWindow(modalSell);
        contractorCryptoWallet.placeholder = selectedData.wallet.address;
        const onPaymentInputEnterNewValue = () => {
          const debouncedEnter = debounce(() => {
            sellEnrollmentInput.value = sellPaymentInput.value * exchangeRate;
          });
          debouncedEnter();
        };
        sellPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
        const onEnrollmentInputEnterNewValue = () => {
          const debouncedEnter = debounce(() => {
            sellPaymentInput.value = sellEnrollmentInput.value / exchangeRate;
          });
          debouncedEnter();
        };
        sellEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
        const onModalSellExchangeAllButtonClick = () => {
          if ((userBalances.KEKS * exchangeRate) <= balance.amount) {
            sellPaymentInput.value = userBalances.KEKS;
            sellEnrollmentInput.value = userBalances.KEKS * exchangeRate;
          }
          if ((userBalances.KEKS * exchangeRate) > balance.amount) {
            sellEnrollmentInput.value = balance.amount;
            sellPaymentInput.value = balance.amount / exchangeRate;
          }
        };
        sellExchangeAllCrypto.addEventListener('click', onModalSellExchangeAllButtonClick);
        sellExchangeAllRub.addEventListener('click', onModalSellExchangeAllButtonClick);
        const onModalSelectChange = () => {
          initSelectChange(sellSelect, userCardNumber, serverUserData.paymentMethods);
        };
        sellSelect.addEventListener('change', onModalSelectChange);
        let onCloseModalButtonClick = {};
        let onKeydownCloseModalWindow = {};
        let onOutsideModalWindowClick = {};
        let onModalSubmit = {};
        const closeModalWindow = () => {
          resetPaymentListeners(sellPaymentInput, onPaymentInputEnterNewValue, sellEnrollmentInput, onEnrollmentInputEnterNewValue);
          resetExchangeAllButton(sellExchangeAllCrypto, onModalSellExchangeAllButtonClick);
          returnInitialView(modalSell, onOutsideModalWindowClick, sellErrorMessage, sellSelect, onModalSelectChange);
          resetForm(onKeydownCloseModalWindow, sellCloseButton, onCloseModalButtonClick, sellForm, onModalSubmit, pristine);
          sellExchangeAllRub.removeEventListener('click', onModalSellExchangeAllButtonClick);
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
          const outsideErrorContainerClick = event.composedPath().includes(sellContentContainer) === false;
          if (outsideErrorContainerClick) {
            closeModalWindow();
          }
        };
        onModalSubmit = (event) => {
          initSubmit(event, pristine, sellSubmitButton, sellErrorMessage, sellSuccessMessage, sellErrorMessageText, closeModalWindow);
        };
        sellForm.addEventListener('submit', onModalSubmit);
        modalSell.addEventListener('mousedown', onOutsideModalWindowClick);
        document.addEventListener('keydown', onKeydownCloseModalWindow);
        sellCloseButton.addEventListener('click', onCloseModalButtonClick);
      }
    }
  });
};

export {addModalWindowOpener};
