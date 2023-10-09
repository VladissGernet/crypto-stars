import {debounce} from './util.js';
import {buySellContainer, checkedUsersCheckbox} from './variables.js';
import {renderTable} from './render-table.js';
import {filterValues} from './constants.js';

const addCheckedUsersInputListener = (contractorsData, convertedData, addedMap, defaultMarkers) => {
  const checkedUsersInputValues = {
    true: convertedData.filter((element) => element.isVerified === true),
    false: contractorsData,
  };
  const onCheckedUsersInputChange = () => {
    const debouncedChange = debounce(() => {
      const activeTabButton = buySellContainer.querySelector('.is-active');
      convertedData = checkedUsersInputValues[checkedUsersCheckbox.checked];
      renderTable(convertedData, filterValues[activeTabButton.textContent]);
      if (checkedUsersCheckbox.checked === true) {
        defaultMarkers.removeFrom(addedMap);
      }
      if (checkedUsersCheckbox.checked === false) {
        defaultMarkers.addTo(addedMap);
      }
    });
    debouncedChange();
  };
  checkedUsersCheckbox.addEventListener('change', onCheckedUsersInputChange);
};

export {addCheckedUsersInputListener};
