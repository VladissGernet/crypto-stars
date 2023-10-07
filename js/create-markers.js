import {pinIcon, verifiedPinIcon, mapPopupTitleFixedWidth} from './constants.js';
import {mapBaloonTemplate} from './variables.js';
import {trimNumber} from './render-table.js';

//Переместить функцию ниже в новый модуль.
const createPopup = (markerData) => {
  const popupElement = mapBaloonTemplate.cloneNode(true);
  const titleWrapper = popupElement.querySelector('.user-card__user-name');
  const title = titleWrapper.querySelector('span');
  const verifiedIcon = titleWrapper.querySelector('svg');
  const currencyValue = popupElement.querySelector('.user-card__cash-item--currency .user-card__cash-data');
  const rate = popupElement.querySelector('.user-card__cash-item--rate .user-card__cash-data');
  const limit = popupElement.querySelector('.user-card__cash-item--limit .user-card__cash-data');
  const badgesList = popupElement.querySelector('.user-card__badges-list');
  const badge = badgesList.querySelector('.badge');
  const {amount, currency} = markerData.balance;
  titleWrapper.style.width = mapPopupTitleFixedWidth;
  title.textContent = markerData.userName;
  currencyValue.textContent = currency;
  rate.textContent = `${trimNumber(markerData.exchangeRate)} ₽`;
  const getMinAmount = () => trimNumber(markerData.minAmount * markerData.exchangeRate);
  const getMaxAmount = () => trimNumber(amount * markerData.exchangeRate);
  limit.textContent = `${getMinAmount()} ₽ – ${getMaxAmount()} ₽`;
  const isSellerNotVerified = markerData.isVerified === false;
  if (isSellerNotVerified) {
    verifiedIcon.remove();
  }

  const badgesListFragment = document.createDocumentFragment();
  markerData.paymentMethods.forEach((paymentMethod) => {
    const newBadge = badge.cloneNode();
    newBadge.textContent = paymentMethod.provider;
    badgesListFragment.appendChild(newBadge);
  });
  badgesList.innerHTML = '';
  badgesList.appendChild(badgesListFragment);

  //Остановился здесь
  return popupElement;
};

const createMarker = (markerData, icon, layer) => {
  const {lat, lng} = markerData.coords;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: icon
    },
  );
  marker
    .addTo(layer)
    .bindPopup(createPopup(markerData));
};

const checkCashInPerson = (array) => {
  if (array !== undefined) {
    return array.some((arrayItem) => arrayItem.provider === 'Cash in person');
  }
};

const createMarkers = (markersData, defaultMarkers, verifiedMarkers) => {
  markersData.filter((dataElement) => {
    if (checkCashInPerson(dataElement.paymentMethods)) {
      if (dataElement.isVerified) {
        createMarker(dataElement, verifiedPinIcon, verifiedMarkers);
      } else {
        createMarker(dataElement, pinIcon, defaultMarkers);
      }
      return true;
    }
  });
};

export {createMarkers};
