import {buySellContainer, mapContainer, toggleListMapContainer, usersList} from './variables.js';
import {renderTable} from './render-table.js';
import {filterValues} from './constants.js';
import {receivedData} from './main.js';
import {debounce} from './util.js';

const onNavigationButtonClick = (evt) => {
  const selectedButton = evt.target.closest('.tabs__control');
  if (selectedButton !== null) {
    const isSelectedButtonNotActivated = selectedButton.classList.contains('is-active') === false;
    if (isSelectedButtonNotActivated) {
      const debouncedClick = debounce(() => {
        renderTable(receivedData, filterValues[selectedButton.textContent]);
        const activeButton = buySellContainer.querySelector('.is-active');
        activeButton.classList.remove('is-active');
        selectedButton.classList.add('is-active');
      });
      debouncedClick();
    }
  }
};

const onToggleListMapContainerClick = (evt) => {
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
};

export {onNavigationButtonClick, onToggleListMapContainerClick};
