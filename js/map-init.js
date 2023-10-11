import {mapContainer} from './variables.js';
import {COPYRIGHT, startCoordinates, TILE_LAYER, ZOOM} from './constants.js';
import {createMarkers} from './create-markers.js';
import {addCheckedUsersInputListener} from './checked-users-filter.js';

const initMap = (contractorsData, convertedData) => {
  mapContainer.style.display = 'block'; //Необходимо для правильного отображения краты.
  mapContainer.classList.add('visually-hidden');
  const map = L.map('map').setView([startCoordinates.lat, startCoordinates.lng], ZOOM);
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
  const defaultMarkerGroup = L.layerGroup().addTo(map);
  const verifiedMarkerGroup = L.layerGroup().addTo(map);
  createMarkers(convertedData, defaultMarkerGroup, verifiedMarkerGroup);
  addCheckedUsersInputListener(contractorsData, convertedData, map, defaultMarkerGroup);
};

export {initMap};
