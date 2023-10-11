// Page elements
const body = document.querySelector('body');
const main = document.querySelector('main');
const usersNavigation = document.querySelector('.users-nav');
const usersNavigationContainer = usersNavigation.closest('.container');
const buySellContainer = usersNavigation.querySelector('.tabs--toggle-buy-sell');
const toggleListMapContainer = usersNavigation.querySelector('.tabs--toggle-list-map');
const checkedUsersCheckbox = usersNavigation.querySelector('#checked-users');
const usersList = document.querySelector('.users-list');
const mapContainer = document.querySelector('#map').closest('.container');
const serverErrorContainer = document.querySelector('.message--server-error').closest('.container');
const noAdvertisementsContainer = document.querySelector('.container--lightbackground');
const tableBody = document.querySelector('.users-list__table-body');

//Modal
const modalBuy = document.querySelector('.modal--buy');
const modalBuyForm = modalBuy.querySelector('.modal-buy');
const modalCloseButton = modalBuy.querySelector('.modal__close-btn');
const modalUsernameWrapper = modalBuyForm.querySelector('.transaction-info__data');
const modalVerifiedIconCopy = modalUsernameWrapper.querySelector('svg').cloneNode(true);
const modalRate = modalBuyForm.querySelector('.transaction-info__item--exchangerate .transaction-info__data');
const modalCashlimit = modalBuyForm.querySelector('.transaction-info__item--cashlimit .transaction-info__data');
const modalPaymentInput = modalBuyForm.querySelector('#payment');
const modalEnrollmentInput = modalBuyForm.querySelector('#enrollment');
const modalSelect = modalBuyForm.querySelector('#modal--buy__select');
const exchangeAllButton = modalBuyForm.querySelector('.exchange-all-button');
const modalBuyContentContainer = modalBuy.querySelector('.modal__content');
const userCardNumberField = modalBuyForm.querySelector('#user-card-number');
const userCryptoWalletField = modalBuyForm.querySelector('#user-crypto-wallet');
const passwordField = modalBuyForm.querySelector('#password');
const validationErrorMessage = modalBuyForm.querySelector('.modal__validation-message--error');
const validationErrorMessageText = validationErrorMessage.querySelector('.modal__validation-message--error-text');
const validationSuccessMessage = modalBuyForm.querySelector('.modal__validation-message--success');
const modalSubmitButton = modalBuyForm.querySelector('.modal__submit');
const buySendingContractorId = modalBuyForm.querySelector('[name="contractorId"]');
const buySendingExchangeRate = modalBuyForm.querySelector('[name="exchangeRate"]');
const buySendingCurrency = modalBuyForm.querySelector('[name="sendingCurrency"]');
const buyReceivingCurrency = modalBuyForm.querySelector('[name="receivingCurrency"]');

const modalSell = document.querySelector('.modal--sell');
const modalSellForm = modalSell.querySelector('.modal-sell');
const sellSendingContractorId = modalSellForm.querySelector('[name="contractorId"]');
const sellSendingExchangeRate = modalSellForm.querySelector('[name="exchangeRate"]');
const sellSendingCurrency = modalSellForm.querySelector('[name="sendingCurrency"]');
const sellSeceivingCurrency = modalSellForm.querySelector('[name="receivingCurrency"]');
const sellModalUsernameWrapper = modalSellForm.querySelector('.transaction-info__data');
const sellModalRate = modalSellForm.querySelector('.transaction-info__item--exchangerate .transaction-info__data');
const sellModalCashlimit = modalSellForm.querySelector('.transaction-info__item--cashlimit .transaction-info__data');
const modalSellSelect = modalSellForm.querySelector('#modal--sell__select');

//Templates
const userTableRowTemplate = document.querySelector('#user-table-row__template')
  .content
  .querySelector('.users-list__table-row');
const mapBaloonTemplate = document.querySelector('#map-baloon__template')
  .content
  .querySelector('.user-card');

export {
  buySellContainer,
  tableBody,
  userTableRowTemplate,
  checkedUsersCheckbox,
  usersList,
  mapContainer,
  toggleListMapContainer,
  mapBaloonTemplate,
  serverErrorContainer,
  usersNavigationContainer,
  noAdvertisementsContainer,
  body,
  main,
  modalBuy,
  modalUsernameWrapper,
  modalCloseButton,
  modalVerifiedIconCopy,
  modalRate,
  modalCashlimit,
  modalPaymentInput,
  modalEnrollmentInput,
  modalSelect,
  exchangeAllButton,
  modalBuyContentContainer,
  userCardNumberField,
  userCryptoWalletField,
  modalBuyForm,
  passwordField,
  validationErrorMessage,
  validationSuccessMessage,
  modalSubmitButton,
  buySendingContractorId,
  buySendingExchangeRate,
  buySendingCurrency,
  buyReceivingCurrency,
  validationErrorMessageText,
  modalSell,
  modalSellForm,
  sellSendingContractorId,
  sellSendingExchangeRate,
  sellSendingCurrency,
  sellSeceivingCurrency,
  sellModalUsernameWrapper,
  sellModalRate,
  sellModalCashlimit
};
