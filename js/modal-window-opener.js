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
  modalSellEnrollmentInput,
  exchangeAllCrypto,
  exchangeAllRub,
  userCardNumber,
  modalSellCloseButton,
  modalSellErrorMessage,
  modalSellSuccessMessage,
  modalSellContentContainer,
  modalSellForm,
  modalSellSubmitButton,
  modalSellErrorMessageText, validationSuccessMessage, validationErrorMessage
} from './variables.js';
import {
  changeButtonClassName, defaultErrorMessageText,
  filterValues,
  initialModalSelectValue,
  modalZIndex,
  scrollLockClass,
  sellerIdClassName,
  valueToOpenSellModal
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
  showModalWindow, blockSubmitButton, unblockSubmitButton
} from './modal-functions.js';
import {addModalListeners} from './modal-listeners.js';
import {hideValidationMessage, showValidationMessage} from './validation-message.js';
import {sendData} from './load-data.js';
import {initPristine} from './init-pristine.js';

modalBuy.style.zIndex = modalZIndex;
modalPaymentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
modalEnrollmentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
modalSellPaymentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
modalSellEnrollmentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);

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
        hideValidationMessage(validationSuccessMessage);
        hideValidationMessage(validationErrorMessage);
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
        hideValidationMessage(modalSellSuccessMessage);
        hideValidationMessage(modalSellErrorMessage);
        const pristine = initPristine(minAmount, balance.amount, exchangeRate, status, userBalances);
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
        const onModalSellExchangeAllButtonClick = () => {
          if (userBalances.RUB <= (balance.amount)) {
            modalSellEnrollmentInput.value = userBalances.RUB;
            modalSellPaymentInput.value = userBalances.RUB / exchangeRate;
          }
          if (userBalances.RUB > (balance.amount)) {
            modalSellEnrollmentInput.value = balance.amount;
            modalSellPaymentInput.value = balance.amount / exchangeRate;
          }
        };
        exchangeAllCrypto.addEventListener('click', onModalSellExchangeAllButtonClick);
        exchangeAllRub.addEventListener('click', onModalSellExchangeAllButtonClick);
        const onModalSelectChange = () => {
          const selectValue = sellModalSelect.value;
          switch (selectValue) {
            case 'Cash in person':
              userCardNumber.placeholder = '';
              break;
            default:
              for (const paymentMethod of serverUserData.paymentMethods) {
                const providerName = paymentMethod.provider;
                if (providerName === selectValue) {
                  userCardNumber.placeholder = paymentMethod.accountNumber;
                  break;
                }
              }
              break;
          }
        };
        sellModalSelect.addEventListener('change', onModalSelectChange);
        let onCloseModalButtonClick = {};
        let onKeydownCloseModalWindow = {};
        let onOutsideModalWindowClick = {};
        let onModalSubmit = {};
        const closeModalWindow = () => {
          body.classList.remove(scrollLockClass);
          modalSell.style.display = 'none';
          modalSellPaymentInput.removeEventListener('input', onPaymentInputEnterNewValue);
          modalSellEnrollmentInput.removeEventListener('input', onEnrollmentInputEnterNewValue);
          exchangeAllCrypto.removeEventListener('click', onModalSellExchangeAllButtonClick);
          exchangeAllRub.removeEventListener('click', onModalSellExchangeAllButtonClick);
          document.removeEventListener('keydown', onKeydownCloseModalWindow);
          modalSellCloseButton.removeEventListener('click', onCloseModalButtonClick);
          modalSell.removeEventListener('mousedown', onOutsideModalWindowClick);
          sellModalSelect.removeEventListener('change', onModalSelectChange);
          sellModalSelect.selectedIndex = initialModalSelectValue;
          modalSellPaymentInput.value = '';
          modalSellEnrollmentInput.value = '';
          // pristine.destroy();
          hideValidationMessage(modalSellErrorMessage);
          hideValidationMessage(modalSellSuccessMessage);
          modalSellForm.removeEventListener('submit', onModalSubmit);
          modalSellErrorMessage.textContent = defaultErrorMessageText;
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
          const outsideErrorContainerClick = event.composedPath().includes(modalSellContentContainer) === false;
          if (outsideErrorContainerClick) {
            closeModalWindow();
          }
        };
        onModalSubmit = (event) => {
          event.preventDefault();
          const isValid = pristine.validate();
          if (isValid) {
            blockSubmitButton(modalSellSubmitButton);
            hideValidationMessage(modalSellErrorMessage);
            sendData(new FormData(event.target))
              .then(
                () => {
                  showValidationMessage(modalSellSuccessMessage);
                  unblockSubmitButton(modalSellSubmitButton);
                  closeModalWindow();
                }
              )
              .catch(
                (err) => {
                  showValidationMessage(modalSellErrorMessage);
                  modalSellErrorMessageText.textContent = err.message;
                  unblockSubmitButton(modalSellSubmitButton);
                }
              )
              .finally(() => {
              });
          } else {
            showValidationMessage(modalSellErrorMessage);
          }
        };
        modalSellForm.addEventListener('submit', onModalSubmit);
        modalSell.addEventListener('mousedown', onOutsideModalWindowClick);
        document.addEventListener('keydown', onKeydownCloseModalWindow);
        modalSellCloseButton.addEventListener('click', onCloseModalButtonClick);
      }
    }
  });
};

export {addModalWindowOpener};
