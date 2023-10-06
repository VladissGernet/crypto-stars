import {pinIcon, verifiedPinIcon} from './constants.js';

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
    .addTo(layer);
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
