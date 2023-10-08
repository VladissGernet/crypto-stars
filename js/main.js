import {getContractors} from './load-data.js';
import {
  buySellContainer,
  checkedUsersCheckbox,
  mapContainer,
  toggleListMapContainer,
} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {debounce} from './util.js';
import {COPYRIGHT, filterValues, startCoordinates, TILE_LAYER, ZOOM, changeButtonClassName} from './constants.js';
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
    mapContainer.classList.add('visually-hidden');
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

//Variables
const body = document.querySelector('body');

const modalBuy = document.querySelector('.modal--buy');
const modalUsernameWrapper = modalBuy.querySelector('.transaction-info__data');
const modalVerifiedIconCopy = modalUsernameWrapper.querySelector('svg').cloneNode(true);
const modalRate = modalBuy.querySelector('.transaction-info__item--exchangerate .transaction-info__data');

//Constants
const scrollLockClass = 'scroll-lock';
const modalZIndex = '400'; //Для перекрытия карты.

//После окончания разработки модалки удалить
modalBuy.style.display = 'block';

//main code

const modalCloseButton = modalBuy.querySelector('.modal__close-btn');
modalCloseButton.addEventListener('click', () => {
  body.classList.remove(scrollLockClass);
  modalBuy.style.display = 'none';
})

const main = document.querySelector('main');
main.addEventListener('click', (evt) => {
  const selectedElement = evt.target.closest(`.${changeButtonClassName}`);
  if (selectedElement !== null) {
    const selectedItem = evt.target.closest('.users-list__table-row');
    const nameWrapper = selectedItem.querySelector('.users-list__table-name');
    const name = nameWrapper.querySelector('span').textContent;
    const isUserStatusVerified = nameWrapper.querySelector('svg') !== null;
    const currency = selectedItem.querySelector('.users-list__table-currency').textContent;
    const exchangeRate = selectedItem.querySelector('.users-list__table-exchangerate').textContent;
    const cashLimit = selectedItem.querySelector('.users-list__table-cashlimit').textContent;
    const badgesList = selectedItem.querySelector('.users-list__badges-list');
    const badgesItemsArray = badgesList.querySelectorAll('.users-list__badges-item');
    for (const badgeItem of badgesItemsArray) {
      console.log(badgeItem.textContent)
    }
    evt.preventDefault();
    body.classList.add(scrollLockClass);
    modalBuy.style.zIndex = modalZIndex;

    modalUsernameWrapper.innerHTML = '';
    const modalNameSpan = document.createElement('span');
    modalNameSpan.textContent = name;
    if (isUserStatusVerified) {
      modalUsernameWrapper.appendChild(modalVerifiedIconCopy);
    }
    modalUsernameWrapper.appendChild(modalNameSpan);
    modalRate.textContent = exchangeRate;

    //МАГИЧЕСКИЕ ЗНАЧЕНИЯ!!!
    modalBuy.style.display = 'block';
    // modalBuy.style.display = 'block'; <---- после разработки разблокировать.
  }
});

export {receivedData};
