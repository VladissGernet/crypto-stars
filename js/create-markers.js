import {pinIcon, verifiedPinIcon, mapPopupTitleFixedWidth} from './constants.js';
import {mapBaloonTemplate} from './variables.js';
import {trimNumber} from './render-table.js';

//Переместить функцию ниже в новый модуль.
const createPopup = (markerData) => {
  const popupElement = mapBaloonTemplate.cloneNode(true);
  const titleWrapper = popupElement.querySelector('.user-card__user-name');
  const title = titleWrapper.querySelector('span');
  const currencyValue = popupElement.querySelector('.user-card__cash-item--currency .user-card__cash-data');
  const rate = popupElement.querySelector('.user-card__cash-item--rate .user-card__cash-data');
  const limit = popupElement.querySelector('.user-card__cash-item--limit .user-card__cash-data');
  const {amount, currency} = markerData.balance;
  titleWrapper.style.width = mapPopupTitleFixedWidth;
  title.textContent = markerData.userName;
  currencyValue.textContent = currency;
  rate.textContent = `${trimNumber(markerData.exchangeRate)} ₽`;
  limit.textContent = `${trimNumber(markerData.minAmount * markerData.exchangeRate)} ₽ – ${trimNumber(amount * markerData.exchangeRate)} ₽`;
   // укоротить функцию выше
  //Исправить платежные системы покупателей в списке
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
