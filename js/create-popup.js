import {mapBaloonTemplate} from './variables.js';
import {mapPopupTitleWidth, classNameOfChangeButton, sellerIdClassName} from './constants.js';
import {addSpacesToNumber} from './util.js';

const createPopup = (markerData) => {
  const {id, balance, userName, exchangeRate, minAmount, isVerified, paymentMethods} = markerData;
  const popupElement = mapBaloonTemplate.cloneNode(true);
  const titleWrapper = popupElement.querySelector('.user-card__user-name');
  const title = titleWrapper.querySelector('span');
  const verifiedIcon = titleWrapper.querySelector('svg');
  const currencyValue = popupElement.querySelector('.user-card__cash-item--currency .user-card__cash-data');
  const rate = popupElement.querySelector('.user-card__cash-item--rate .user-card__cash-data');
  const limit = popupElement.querySelector('.user-card__cash-item--limit .user-card__cash-data');
  const badgesList = popupElement.querySelector('.user-card__badges-list');
  const popupButton = popupElement.querySelector('button');
  popupElement.classList.add(sellerIdClassName);
  popupElement.id = id;
  popupButton.classList.add(classNameOfChangeButton);
  const badge = badgesList.querySelector('.badge');
  const {amount, currency} = balance;
  titleWrapper.style.width = mapPopupTitleWidth;
  title.textContent = userName;
  currencyValue.textContent = currency;
  rate.textContent = `${addSpacesToNumber(exchangeRate)} ₽`;
  const getMinAmount = () => addSpacesToNumber(minAmount * exchangeRate);
  const getMaxAmount = () => addSpacesToNumber(amount * exchangeRate);
  limit.textContent = `${getMinAmount()} ₽ – ${getMaxAmount()} ₽`;
  const isSellerNotVerified = isVerified === false;
  if (isSellerNotVerified) {
    verifiedIcon.remove();
  }
  const badgesListFragment = document.createDocumentFragment();
  paymentMethods.forEach((paymentMethod) => {
    const newBadge = badge.cloneNode();
    newBadge.textContent = paymentMethod.provider;
    badgesListFragment.appendChild(newBadge);
  });
  badgesList.innerHTML = '';
  badgesList.appendChild(badgesListFragment);
  return popupElement;
};

export {createPopup};
