import {getContractors, getUserData} from './load-data.js';
import {buySellContainer, toggleListMapContainer} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {initMap} from './map-init.js';
import {getUserBalances} from './get-user-balances.js';

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    initMap(data, receivedData);
    buySellContainer.addEventListener('click', onNavigationButtonClick);
    toggleListMapContainer.addEventListener('click', onToggleListMapContainerClick);
    getUserData()
      .then((userData) => {
        const userBalancesObject = getUserBalances(userData);
        addModalWindowOpener(receivedData, userData, userBalancesObject);
      });
  // добавить валидацию
  //проверить что отправляется на сервер
  //проверить весь код на наличие возможного рефакторинга и лишнего кода
  //пройтись по каждому пункту тех задания и протестировать проект
  });

export {receivedData};
