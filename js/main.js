import {getContractors} from './load-data.js';
import {navigationControls, checkedUsersInput} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick} from './navigation-controls.js';
import {debounce} from './util.js';
import {createMarker} from './map-marker-creator.js';
import {
  filterValues,
  ZOOM,
  TILE_LAYER,
  COPYRIGHT,
  startCoordinates,
  pinIcon,
  verifiedPinIcon
} from './constants.js';

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    const checkedUsersInputValues = {
      true: receivedData.filter((element) => element.isVerified === true),
      false: data,
    };
    const onCheckedUsersInputChange = () => {
      const debouncedChange = debounce(() => {
        const activeTabButton = navigationControls.querySelector('.is-active');
        receivedData = checkedUsersInputValues[checkedUsersInput.checked];
        renderTable(receivedData, filterValues[activeTabButton.textContent]);
      });
      debouncedChange();
    };
    navigationControls.addEventListener('click', onNavigationButtonClick);
    checkedUsersInput.addEventListener('change', onCheckedUsersInputChange);


    //MAP

    //Temporary values
    const usersList = document.querySelector('.users-list');
    const mapContainer = document.querySelector('#map').closest('.container');
    usersList.style.display = 'none';
    mapContainer.style.display = 'block';

    //Main code
    const initMap = () => {
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

      createMarkers(receivedData, defaultMarkerGroup, verifiedMarkerGroup);
    };

    initMap();
  });


export {receivedData};
