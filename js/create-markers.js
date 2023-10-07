import {pinIcon, verifiedPinIcon} from './constants.js';
import {createPopup} from './create-popup.js';

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
