import {getContractors, getUserData, showContractorsLoadError} from './load-data.js';
import {buySellContainer, toggleListMapContainer, userProfile, userCryptoBalance, userFiatBalance} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {addModalWindowOpener} from './modal-window-opener.js';
import {initMap} from './map-init.js';
import {getUserBalancesObject} from './get-user-balances-object.js';
import {addSpacesToNumber} from './util.js';

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
        userCryptoBalance.textContent = userBalancesObject['KEKS'];
        userFiatBalance.textContent = addSpacesToNumber(userBalancesObject['RUB']);
        addModalWindowOpener(receivedData, userData, userBalancesObject);
      });
  })
  .catch(() => {
    showContractorsLoadError();
    userProfile.style.display = 'none';
  });

export {receivedData};
