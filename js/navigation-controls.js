import {navigationControls} from './variables.js';
import {renderTable} from './render-table.js';
import {filterValues} from './constants.js';
import {receivedData} from './main.js';

const onNavigationButtonClick = (evt) => {
  const selectedButton = evt.target.closest('.tabs__control');
  if (selectedButton !== null) {
    const isSelectedButtonNotActivated = selectedButton.classList.contains('is-active') === false;
    if (isSelectedButtonNotActivated) {
      renderTable(receivedData, filterValues[selectedButton.textContent]);
      const activeButton = navigationControls.querySelector('.is-active');
      activeButton.classList.remove('is-active');
      selectedButton.classList.add('is-active');
    }
  }
};

export {onNavigationButtonClick};
