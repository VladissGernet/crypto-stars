import {getContractors} from './load-data.js';
import {navigationControls, checkedUsersInput} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick} from './navigation-controls.js';
import {debounce} from './util.js';
import {filterValues} from './constants.js';

//Если выбрано "Купить"
const debouncedOnNavigationButtonClick = debounce(onNavigationButtonClick);

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    const checkedUsersInputValues = {
      true: receivedData.filter((element) => element.isVerified === true),
      false: data,
    };
    navigationControls.addEventListener('click', debouncedOnNavigationButtonClick);
    checkedUsersInput.addEventListener('change', () => {
      // добавить debounce
      const activeTabButton = navigationControls.querySelector('.is-active');
      receivedData = checkedUsersInputValues[checkedUsersInput.checked];
      renderTable(receivedData, filterValues[activeTabButton.textContent]);
    });
  });

export {receivedData};
