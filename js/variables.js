// Page elements
const body = document.querySelector('body');
const main = body.querySelector('main');
const tableBody = main.querySelector('.users-list__table-body');
const usersNavigation = main.querySelector('.users-nav');
const usersNavigationContainer = usersNavigation.closest('.container');
const buySellContainer = usersNavigation.querySelector('.tabs--toggle-buy-sell');
const toggleListMapContainer = usersNavigation.querySelector('.tabs--toggle-list-map');
const checkedUsersCheckbox = usersNavigation.querySelector('#checked-users');
const usersList = main.querySelector('.users-list');
const mapContainer = main.querySelector('#map').closest('.container');
const serverErrorContainer = main.querySelector('.message--server-error').closest('.container');
const noAdvertisementsContainer = main.querySelector('.container--lightbackground');

//Modal
const modalBuy = body.querySelector('.modal--buy');
const buyForm = modalBuy.querySelector('.modal-buy');
const buyCloseButton = modalBuy.querySelector('.modal__close-btn');
const buyUsernameWrapper = buyForm.querySelector('.transaction-info__data');
const modalVerifiedIconCopy = buyUsernameWrapper.querySelector('svg').cloneNode(true);
const buyRate = buyForm.querySelector('.transaction-info__item--exchangerate .transaction-info__data');
const buyCashlimit = buyForm.querySelector('.transaction-info__item--cashlimit .transaction-info__data');
const buyPaymentInput = buyForm.querySelector('#payment');
const buyEnrollmentInput = buyForm.querySelector('#enrollment');
const buySelect = buyForm.querySelector('#modal--buy__select');
const buyExchangeAllButton = buyForm.querySelector('.exchange-all-button');
const buyContentContainer = modalBuy.querySelector('.modal__content');
const contractorCardNumberField = buyForm.querySelector('#contractor-card-number');
const buyUserCryptoWalletField = buyForm.querySelector('#user-crypto-wallet');
const buyPasswordField = buyForm.querySelector('#buy-password');
const buyErrorMessage = buyForm.querySelector('.modal__validation-message--error');
const buyErrorMessageText = buyErrorMessage.querySelector('.modal__validation-message--error-text');
const buySuccessMessage = buyForm.querySelector('.modal__validation-message--success');
const buySubmitButton = buyForm.querySelector('.modal__submit');
const buySendingContractorId = buyForm.querySelector('[name="contractorId"]');
const buySendingExchangeRate = buyForm.querySelector('[name="exchangeRate"]');
const buySendingCurrency = buyForm.querySelector('[name="sendingCurrency"]');
const buyReceivingCurrency = buyForm.querySelector('[name="receivingCurrency"]');

const modalSell = document.querySelector('.modal--sell');
const modalSellContentContainer = modalSell.querySelector('.modal__content');
const modalSellForm = modalSell.querySelector('.modal-sell');
const sellSendingContractorId = modalSellForm.querySelector('[name="contractorId"]');
const sellSendingExchangeRate = modalSellForm.querySelector('[name="exchangeRate"]');
const sellSendingCurrency = modalSellForm.querySelector('[name="sendingCurrency"]');
const sellSeceivingCurrency = modalSellForm.querySelector('[name="receivingCurrency"]');
const sellModalUsernameWrapper = modalSellForm.querySelector('.transaction-info__data');
const sellModalRate = modalSellForm.querySelector('.transaction-info__item--exchangerate .transaction-info__data');
const sellModalCashlimit = modalSellForm.querySelector('.transaction-info__item--cashlimit .transaction-info__data');
const sellModalSelect = modalSellForm.querySelector('#modal--sell__select');
const contractorCryptoWallet = modalSellForm.querySelector('#contractor-crypto-wallet');
const modalSellPaymentInput = modalSellForm.querySelector('#sell-payment');
const modalSellEnrollmentInput = modalSellForm.querySelector('#sell-enrollment');
const exchangeAllCrypto = modalSellForm.querySelector('#exchange-all-crypto');
const exchangeAllRub = modalSellForm.querySelector('#exchange-all-rub');
const userCardNumber = modalSellForm.querySelector('#user-card-number');
const modalSellCloseButton = modalSell.querySelector('.modal__close-btn');
const modalSellErrorMessage = modalSellForm.querySelector('.modal__validation-message--error');
const modalSellSuccessMessage = modalSellForm.querySelector('.modal__validation-message--success');
const modalSellSubmitButton = modalSellForm.querySelector('.modal__submit');
const modalSellErrorMessageText = buyErrorMessage.querySelector('.modal__validation-message--error-text');
const modalSellPassword = modalSellForm.querySelector('#sell-password');

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
  buyUsernameWrapper,
  buyCloseButton,
  modalVerifiedIconCopy,
  buyRate,
  buyCashlimit,
  buyPaymentInput,
  buyEnrollmentInput,
  buySelect,
  buyExchangeAllButton,
  buyContentContainer,
  contractorCardNumberField,
  buyUserCryptoWalletField,
  buyForm,
  buyPasswordField,
  buyErrorMessage,
  buySuccessMessage,
  buySubmitButton,
  buySendingContractorId,
  buySendingExchangeRate,
  buySendingCurrency,
  buyReceivingCurrency,
  buyErrorMessageText,
  modalSell,
  modalSellForm,
  sellSendingContractorId,
  sellSendingExchangeRate,
  sellSendingCurrency,
  sellSeceivingCurrency,
  sellModalUsernameWrapper,
  sellModalRate,
  sellModalCashlimit,
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
  modalSellSubmitButton,
  modalSellErrorMessageText,
  modalSellPassword
};
