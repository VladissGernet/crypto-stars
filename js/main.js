import {getContractors} from './load-data.js';
import {
  buySellContainer,
  checkedUsersCheckbox, mapContainer,
  toggleListMapContainer, usersList,
} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {debounce} from './util.js';
import {COPYRIGHT, filterValues, startCoordinates, TILE_LAYER, ZOOM} from './constants.js';
import {createMarkers} from './create-markers.js';

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    const checkedUsersInputValues = {
      true: receivedData.filter((element) => element.isVerified === true),
      false: data,
    };
    mapContainer.style.display = 'block'; //Необходимо для правильного отображения краты.
    // mapContainer.classList.add('visually-hidden');
    const map = L.map('map').setView([startCoordinates.lat, startCoordinates.lng], ZOOM);
    L.tileLayer(TILE_LAYER, {
      attribution: COPYRIGHT
    }).addTo(map);
    const defaultMarkerGroup = L.layerGroup().addTo(map);
    const verifiedMarkerGroup = L.layerGroup().addTo(map);
    createMarkers(receivedData, defaultMarkerGroup, verifiedMarkerGroup);
    const onCheckedUsersInputChange = () => {
      const debouncedChange = debounce(() => {
        const activeTabButton = buySellContainer.querySelector('.is-active');
        receivedData = checkedUsersInputValues[checkedUsersCheckbox.checked];
        renderTable(receivedData, filterValues[activeTabButton.textContent]);
        if (checkedUsersCheckbox.checked === true) {
          defaultMarkerGroup.removeFrom(map);
        }
        if (checkedUsersCheckbox.checked === false) {
          defaultMarkerGroup.addTo(map);
        }
      });
      debouncedChange();
    };
    buySellContainer.addEventListener('click', onNavigationButtonClick);
    checkedUsersCheckbox.addEventListener('change', onCheckedUsersInputChange);
    toggleListMapContainer.addEventListener('click', onToggleListMapContainerClick);
  });

// временное
// расскоментировать mapContainer.classList.add('visually-hidden');
usersList.classList.add('visually-hidden');

export {receivedData};
