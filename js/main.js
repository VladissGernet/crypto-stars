import {getContractors, getUserData, showContractorsLoadError} from './load-data.js';
import {buySellContainer, toggleListMapContainer, validationSuccessMessage, validationErrorMessage} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {initMap} from './map-init.js';
import {getUserBalances} from './get-user-balances.js';
import {hideValidationMessage} from './validation-message.js';

let receivedData = [];
getContractors()
  .then((data) => {
    receivedData = data.slice();
    renderTable(data);
    initMap(data, receivedData);
    buySellContainer.addEventListener('click', onNavigationButtonClick);
    toggleListMapContainer.addEventListener('click', onToggleListMapContainerClick);
    hideValidationMessage(validationSuccessMessage);
    hideValidationMessage(validationErrorMessage);
    getUserData()
      .then((userData) => {
        const userBalancesObject = getUserBalances(userData);
        addModalWindowOpener(receivedData, userData, userBalancesObject);
      });
  //проверить что отправляется на сервер
  //проверить весь код на наличие возможного рефакторинга и лишнего кода
  //пройтись по каждому пункту тех задания и протестировать проект
    //опять баг с переключением на проверенных пользвателей
  })
  .catch(() => {
    showContractorsLoadError();
  });

export {receivedData};
