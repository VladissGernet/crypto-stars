import {COPYRIGHT, pinIcon, startCoordinates, TILE_LAYER, verifiedPinIcon, ZOOM} from './constants.js';
import {createMarker} from './map-marker-creator.js';
import {checkedUsersCheckbox, mapContainer} from './variables.js';

const initMap = (serverData) => {
  mapContainer.style.display = 'block';
  mapContainer.classList.add('visually-hidden');
  const map = L.map('map').setView([startCoordinates.lat, startCoordinates.lng], ZOOM);
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
  const defaultMarkerGroup = L.layerGroup().addTo(map);
  const verifiedMarkerGroup = L.layerGroup().addTo(map);
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

  checkedUsersCheckbox.addEventListener('change', () => {
    if (checkedUsersCheckbox.checked === true) {
      defaultMarkerGroup.removeFrom(map);
    }
    if (checkedUsersCheckbox.checked === false) {
      defaultMarkerGroup.addTo(map);
    }
  });

  createMarkers(serverData, defaultMarkerGroup, verifiedMarkerGroup);
};
export {initMap};
