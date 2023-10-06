import {pinIcon, verifiedPinIcon} from './constants.js';
import {mapBaloonTemplate} from './variables.js';

const createPopup = () => {
  const popupElement = mapBaloonTemplate.cloneNode(true);
  return popupElement;
};

const createMarker = (markerCoords, icon, layer) => {
  const {lat, lng} = markerCoords;
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
    .bindPopup(createPopup());
};

const createMarkers = (markersData, defaultMarkers, verifiedMarkers) => {
  markersData.filter((dataElement) => {
    if (dataElement.coords !== undefined) {
      if (dataElement.isVerified) {
        createMarker(dataElement.coords, verifiedPinIcon, verifiedMarkers);
      } else {
        createMarker(dataElement.coords, pinIcon, defaultMarkers);
      }
      return true;
    }
  });
};

export {createMarkers};
