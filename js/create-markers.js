import {pinIcon, verifiedPinIcon, mapPopupTitleFixedWidth} from './constants.js';
import {mapBaloonTemplate} from './variables.js';

const createPopup = (markerData) => {
  const popupElement = mapBaloonTemplate.cloneNode(true);
  const titleWrapper = popupElement.querySelector('.user-card__user-name');
  const title = titleWrapper.querySelector('span');
  titleWrapper.style.width = mapPopupTitleFixedWidth;
  title.textContent = markerData.userName;
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

const createMarkers = (markersData, defaultMarkers, verifiedMarkers) => {
  markersData.filter((dataElement) => {
    if (dataElement.coords !== undefined) {
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
