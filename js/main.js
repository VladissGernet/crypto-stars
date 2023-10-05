import {getContractors} from './load-data.js';
import {navigationControls, checkedUsersInput} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick} from './navigation-controls.js';
import {debounce} from './util.js';
import {filterValues} from './constants.js';

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
  });


//MAP

//Temporary values
const usersList = document.querySelector('.users-list');
const mapContainer = document.querySelector('#map').closest('.container');
usersList.style.display = 'none';
mapContainer.style.display = 'block';

//Constants
const ZOOM = 13;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const startCoordinates = {
  lat: 59.92749,
  lng: 30.31127,
};
const iconConfig = {
  default: {
    url: './img/pin.svg',
    width: 36,
    height: 46,
    anchorX: 18,
    anchorY: 46,
  },
  verified: {
    url: './img/pin-verified.svg',
    width: 36,
    height: 46,
    anchorX: 18,
    anchorY: 46,
  }
};
const pinIcon = L.icon({
  iconUrl: iconConfig.default.url,
  iconSize: [iconConfig.default.width, iconConfig.default.height],
  iconAnchor: [iconConfig.default.anchorX, iconConfig.default.anchorY],
});
const verifiedPinIcon = L.icon({
  iconUrl: iconConfig.verified.url,
  iconSize: [iconConfig.verified.width, iconConfig.verified.height],
  iconAnchor: [iconConfig.verified.anchorX, iconConfig.verified.anchorY],
});
//Main code


const map = L.map('map').setView([startCoordinates.lat, startCoordinates.lng], ZOOM);

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

export {receivedData};
