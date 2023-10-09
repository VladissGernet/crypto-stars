import {getContractors} from './load-data.js';
import {
  buySellContainer,
  mapContainer,
  toggleListMapContainer,
} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {COPYRIGHT, startCoordinates, TILE_LAYER, ZOOM,} from './constants.js';
import {createMarkers} from './create-markers.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {addCheckedUsersInputListener} from './checked-users-filter.js';

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    mapContainer.style.display = 'block'; //Необходимо для правильного отображения краты.
    mapContainer.classList.add('visually-hidden');
    const map = L.map('map').setView([startCoordinates.lat, startCoordinates.lng], ZOOM);
    L.tileLayer(TILE_LAYER, {
      attribution: COPYRIGHT
    }).addTo(map);
    const defaultMarkerGroup = L.layerGroup().addTo(map);
    const verifiedMarkerGroup = L.layerGroup().addTo(map);
    createMarkers(receivedData, defaultMarkerGroup, verifiedMarkerGroup);
    addCheckedUsersInputListener(data, receivedData, map, defaultMarkerGroup);
    buySellContainer.addEventListener('click', onNavigationButtonClick);
    toggleListMapContainer.addEventListener('click', onToggleListMapContainerClick);
    addModalWindowOpener(receivedData);
  });

export {receivedData};
