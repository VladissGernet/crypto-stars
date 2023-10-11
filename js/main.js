import {getContractors, getUserData, showContractorsLoadError} from './load-data.js';
import {buySellContainer, toggleListMapContainer} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {initMap} from './map-init.js';
import {getUserBalances} from './get-user-balances.js';

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
        const mochUserData = {
          "userName": "Андрей",
          "balances": [
            {
              "currency": "RUB",
              "amount":  10000
            },
            {
              "currency": "KEKS",
              "amount": 351
            }
          ],
          "wallet": {
            "currency": "KEKS",
            "address": "o6j428495spjy20pwwer0elobwz8lvwksk2ffwxd"
          },
          "paymentMethods": [
            {
              "currency": "RUB",
              "provider": "Sberbank",
              "accountNumber": "0000 0000 0000 5691"
            },
            {
              "currency": "RUB",
              "provider": "QIWI",
              "accountNumber": "0000 0000 0000 4880"
            }
          ]
        };
        const userBalancesObject = getUserBalances(mochUserData);
        addModalWindowOpener(receivedData, mochUserData, userBalancesObject);
      });
  //проверить что отправляется на сервер
  //проверить весь код на наличие возможного рефакторинга и лишнего кода
  //пройтись по каждому пункту тех задания и протестировать проект
    //Вернуть значение пароля на изначальное
    //Добавить проверку на кнопку продать все, чтобы не больше было чем у пользователя в кошельке
  })
  .catch(() => {
    showContractorsLoadError();
  });

export {receivedData};
