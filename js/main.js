import {getContractors} from './load-data.js';
import {buySellContainer, checkedUsersCheckbox, toggleListMapContainer, usersList,
  mapContainer} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick} from './navigation-controls.js';
import {debounce} from './util.js';
import {initMap} from './map.js';
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
        const activeTabButton = buySellContainer.querySelector('.is-active');
        receivedData = checkedUsersInputValues[checkedUsersCheckbox.checked];
        renderTable(receivedData, filterValues[activeTabButton.textContent]);
      });
      debouncedChange();
    };


    buySellContainer.addEventListener('click', onNavigationButtonClick);
    checkedUsersCheckbox.addEventListener('change', onCheckedUsersInputChange);

    toggleListMapContainer.addEventListener('click', (evt) => {
      const selectedButton = evt.target.closest('.tabs__control');
      if (selectedButton !== null) {
        const isSelectedButtonNotActivated = selectedButton.classList.contains('is-active') === false;
        if (isSelectedButtonNotActivated) {
          const debouncedClick = debounce(() => {
            const activeButton = toggleListMapContainer.querySelector('.is-active');
            if (selectedButton.textContent === 'Карта') {
              usersList.classList.add('visually-hidden');
              mapContainer.classList.remove('visually-hidden');
            }
            if (selectedButton.textContent === 'Cписок') {
              usersList.classList.remove('visually-hidden');
              mapContainer.classList.add('visually-hidden');
            }
            activeButton.classList.remove('is-active');
            selectedButton.classList.add('is-active');

          });
          debouncedClick();
        }
      }
    });
    initMap(receivedData);
  });


export {receivedData};
