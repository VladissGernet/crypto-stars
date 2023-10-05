import {getContractors} from './load-data.js';
import {navigationControls} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick} from './navigation-controls.js';
import {debounce} from './util.js';

//Не забудь добавить debounce

//Если выбрано "Купить"
const debouncedOnNavigationButtonClick = debounce(onNavigationButtonClick);

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    navigationControls.addEventListener('click', debouncedOnNavigationButtonClick);
  });

export {receivedData};
