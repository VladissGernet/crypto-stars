import {getContractors} from './load-data.js';
import {navigationControls} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick} from './navigation-controls.js';
import {debounce} from './util.js';

//Если выбрано "Купить"
const debouncedOnNavigationButtonClick = debounce(onNavigationButtonClick);
//Не знаю как реализовать показ только проверенных
let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    navigationControls.addEventListener('click', debouncedOnNavigationButtonClick);
  });

export {receivedData};
