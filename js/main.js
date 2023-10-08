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

//Переместить в другой модуль
const getSelectedDataId = (data, elementId) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === elementId) {
      return data[i];
    }
  }
};

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

    //modal

    //Variables
    const body = document.querySelector('body');
    const main = document.querySelector('main');

    const modalBuy = document.querySelector('.modal--buy');
    const modalCloseButton = modalBuy.querySelector('.modal__close-btn');
    const modalUsernameWrapper = modalBuy.querySelector('.transaction-info__data');
    const modalVerifiedIconCopy = modalUsernameWrapper.querySelector('svg').cloneNode(true);
    const modalRate = modalBuy.querySelector('.transaction-info__item--exchangerate .transaction-info__data');

    //После окончания разработки модалки удалить
    // modalBuy.style.display = 'block';

    //Constants
    const scrollLockClass = 'scroll-lock';
    const modalZIndex = '400'; //Для перекрытия карты.

    //main code
    modalBuy.style.zIndex = modalZIndex;

    modalCloseButton.addEventListener('click', () => {
      body.classList.remove(scrollLockClass);
      modalBuy.style.display = 'none';
    });


    main.addEventListener('click', (evt) => {
      const selectedElement = evt.target.closest(`.${changeButtonClassName}`);
      if (selectedElement !== null) {
        const selectedElementId = evt.target.closest('.users-list__table-row').id;
        const selectedData = getSelectedDataId(receivedData, selectedElementId);
        const {userName, isVerified} = selectedData;
        evt.preventDefault();
        body.classList.add(scrollLockClass);

        console.log(selectedData)

        modalUsernameWrapper.innerHTML = '';
        const modalNameSpan = document.createElement('span');
        modalNameSpan.textContent = userName;
        if (isVerified) {
          modalUsernameWrapper.appendChild(modalVerifiedIconCopy);
        }
        modalUsernameWrapper.appendChild(modalNameSpan);


        //МАГИЧЕСКИЕ ЗНАЧЕНИЯ!!!
        modalBuy.style.display = 'block';
        // modalBuy.style.display = 'block'; <---- после разработки разблокировать.
      }
    });
  });

export {receivedData};
