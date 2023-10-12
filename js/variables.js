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
const userProfile = body.querySelector('.user-profile');
const userCryptoBalance = body.querySelector('#user-crypto-balance');
const userFiatBalance = body.querySelector('#user-fiat-balance');

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

const modalSell = body.querySelector('.modal--sell');
const sellContentContainer = modalSell.querySelector('.modal__content');
const sellForm = modalSell.querySelector('.modal-sell');
const sellSendingContractorId = sellForm.querySelector('[name="contractorId"]');
const sellSendingExchangeRate = sellForm.querySelector('[name="exchangeRate"]');
const sellSendingCurrency = sellForm.querySelector('[name="sendingCurrency"]');
const sellReceivingCurrency = sellForm.querySelector('[name="receivingCurrency"]');
const sellUsernameWrapper = sellForm.querySelector('.transaction-info__data');
const selllRate = sellForm.querySelector('.transaction-info__item--exchangerate .transaction-info__data');
const sellCashlimit = sellForm.querySelector('.transaction-info__item--cashlimit .transaction-info__data');
const sellSelect = sellForm.querySelector('#modal--sell__select');
const contractorCryptoWallet = sellForm.querySelector('#contractor-crypto-wallet');
const sellPaymentInput = sellForm.querySelector('#sell-payment');
const sellEnrollmentInput = sellForm.querySelector('#sell-enrollment');
const sellExchangeAllCrypto = sellForm.querySelector('#exchange-all-crypto');
const sellExchangeAllRub = sellForm.querySelector('#exchange-all-rub');
const userCardNumber = sellForm.querySelector('#user-card-number');
const sellCloseButton = modalSell.querySelector('.modal__close-btn');
const sellErrorMessage = sellForm.querySelector('.modal__validation-message--error');
const sellSuccessMessage = sellForm.querySelector('.modal__validation-message--success');
const sellSubmitButton = sellForm.querySelector('.modal__submit');
const sellErrorMessageText = buyErrorMessage.querySelector('.modal__validation-message--error-text');
const sellPassword = sellForm.querySelector('#sell-password');

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
  sellForm,
  sellSendingContractorId,
  sellSendingExchangeRate,
  sellSendingCurrency,
  sellReceivingCurrency,
  sellUsernameWrapper,
  selllRate,
  sellCashlimit,
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
  sellSubmitButton,
  sellErrorMessageText,
  sellPassword,
  userProfile,
  userCryptoBalance,
  userFiatBalance
};
