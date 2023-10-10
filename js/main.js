import {getContractors, getUserData} from './load-data.js';
import {buySellContainer, toggleListMapContainer, modalBuyForm, modalSubmitButton} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {initMap} from './map-init.js';
import {pristineDefaultConfig} from './constants.js';

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
        addModalWindowOpener(receivedData, userData);
        const pristine = new Pristine(modalBuyForm, pristineDefaultConfig);
        //Заменить click на submit
        modalSubmitButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          const isValid = pristine.validate();
          console.log(isValid);
        });
      });

  // добавить валидацию
  //проверить что отправляется на сервер
  //проверить весь код на наличие возможного рефакторинга и лишнего кода
  //пройтись по каждому пункту тех задания и протестировать проект
  });

export {receivedData};
