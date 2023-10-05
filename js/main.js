import {getContractors} from './load-data.js';
import {navigationControls} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick} from './navigation-controls.js';

//Не забудь добавить debounce

//Если выбрано "Купить"

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    navigationControls.addEventListener('click', onNavigationButtonClick);
  });

export {receivedData};
