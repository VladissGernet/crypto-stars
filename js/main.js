import {getContractors} from './load-data.js';
import {buySellContainer, toggleListMapContainer} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {initMap} from './map-init.js';

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    initMap(data, receivedData);
    buySellContainer.addEventListener('click', onNavigationButtonClick);
    toggleListMapContainer.addEventListener('click', onToggleListMapContainerClick);
    addModalWindowOpener(receivedData);
  //Нужно добавить данные пользователя от сервера на модалку.
  // добавить валидацию
  //проверить что отправляется на сервер
  //проверить весь код на наличие возможного рефакторинга и лишнего кода
  //пройтись по каждому пункту тех задания и протестировать проект
  });

export {receivedData};
