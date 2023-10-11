import {getContractors, getUserData, showContractorsLoadError} from './load-data.js';
import {buySellContainer, toggleListMapContainer} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {initMap} from './map-init.js';
import {getUserBalancesObject} from './get-user-balances-object.js';

let receivedData = [];
getContractors()
  .then((data) => {
    receivedData = data.slice();
    renderTable(data);
    initMap(data, receivedData);
    buySellContainer.addEventListener('click', onNavigationButtonClick);
    toggleListMapContainer.addEventListener('click', onToggleListMapContainerClick);
    getUserData()
      .then((userData) => {
        const userBalancesObject = getUserBalancesObject(userData);
        addModalWindowOpener(receivedData, userData, userBalancesObject);
      });
  })
  .catch(() => {
    showContractorsLoadError();
  });

export {receivedData};
//проверить весь код на наличие возможного рефакторинга и лишнего кода
//пройтись по каждому пункту тех задания и протестировать проект
//Вернуть значение пароля на изначальное
//Добавить проверку на кнопку продать все, чтобы не больше было чем у пользователя в кошельке
