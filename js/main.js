import {getContractors} from './load-data.js';
import {
  buySellContainer,
  checkedUsersCheckbox,
  mapContainer,
  toggleListMapContainer,
  body,
  main,
  modalBuy,
  modalUsernameWrapper,
  modalCloseButton,
  modalVerifiedIconCopy,
  modalRate,
  modalCashlimit,
  modalPaymentInput,
  modalEnrollmentInput,
  modalMinAmountError,
  modalSelect,
  // exchangeAllButton
} from './variables.js';
import {renderTable} from './render-table.js';
import {onNavigationButtonClick, onToggleListMapContainerClick} from './navigation-controls.js';
import {debounce, onNumberInputKeydownCheckKey} from './util.js';
import {COPYRIGHT, filterValues, startCoordinates, TILE_LAYER, ZOOM, changeButtonClassName, scrollLockClass, modalZIndex} from './constants.js';
import {createMarkers} from './create-markers.js';

//Переместить в другой модуль ======================================================================================
import {transformCurrencyAmount, trimNumber} from './render-table.js';
const getSelectedDataId = (data, elementId) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === elementId) {
      return data[i];
    }
  }
};

const clearModalSelectOptions = () => {
  const modalOptions = modalSelect.querySelectorAll('.modal__select-wrapper option');
  modalOptions.forEach((option) => {
    const isModalOptionNotDisabled = option.disabled === false;
    if (isModalOptionNotDisabled) {
      option.remove();
    }
  });
};

const fillUsernameWrapper = (wrapper, name, verifiedStatus, icon) => {
  wrapper.innerHTML = '';
  const modalNameSpan = document.createElement('span');
  modalNameSpan.textContent = name;
  if (verifiedStatus) {
    wrapper.appendChild(icon);
  }
  wrapper.appendChild(modalNameSpan);
};

const fillPaymentMethods = (methodsArray) => {
  if (methodsArray !== undefined) {
    methodsArray.forEach((payment) => {
      const newOption = document.createElement('option');
      newOption.textContent = payment.provider;
      modalSelect.appendChild(newOption);
    });
  }
};

// ===========================================================================================================

let receivedData = [];
getContractors().
  then((data) => {
    receivedData = data.slice();
    renderTable(data);
    const checkedUsersInputValues = {
      true: receivedData.filter((element) => element.isVerified === true),
      false: data,
    };
    mapContainer.style.display = 'block'; //Необходимо для правильного отображения краты.
    mapContainer.classList.add('visually-hidden');
    const map = L.map('map').setView([startCoordinates.lat, startCoordinates.lng], ZOOM);
    L.tileLayer(TILE_LAYER, {
      attribution: COPYRIGHT
    }).addTo(map);
    const defaultMarkerGroup = L.layerGroup().addTo(map);
    const verifiedMarkerGroup = L.layerGroup().addTo(map);
    createMarkers(receivedData, defaultMarkerGroup, verifiedMarkerGroup);
    const onCheckedUsersInputChange = () => {
      const debouncedChange = debounce(() => {
        const activeTabButton = buySellContainer.querySelector('.is-active');
        receivedData = checkedUsersInputValues[checkedUsersCheckbox.checked];
        renderTable(receivedData, filterValues[activeTabButton.textContent]);
        if (checkedUsersCheckbox.checked === true) {
          defaultMarkerGroup.removeFrom(map);
        }
        if (checkedUsersCheckbox.checked === false) {
          defaultMarkerGroup.addTo(map);
        }
      });
      debouncedChange();
    };
    buySellContainer.addEventListener('click', onNavigationButtonClick);
    checkedUsersCheckbox.addEventListener('change', onCheckedUsersInputChange);
    toggleListMapContainer.addEventListener('click', onToggleListMapContainerClick);

    //modal ===========================================================================================================
    modalPaymentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);
    modalEnrollmentInput.addEventListener('keydown', onNumberInputKeydownCheckKey);

    //После окончания разработки модалки удалить
    // modalBuy.style.display = 'block';

    //main code
    modalBuy.style.zIndex = modalZIndex;

    main.addEventListener('click', (evt) => {
      const selectedElement = evt.target.closest(`.${changeButtonClassName}`);
      if (selectedElement !== null) {
        evt.preventDefault();
        const selectedElementId = evt.target.closest('.users-list__table-row').id;
        const selectedData = getSelectedDataId(receivedData, selectedElementId);
        const {userName, isVerified, exchangeRate, minAmount, status, balance, paymentMethods} = selectedData;
        const minCurrencyAmount = transformCurrencyAmount(minAmount, exchangeRate, status);
        const maxCurrencyAmount = transformCurrencyAmount(balance.amount, exchangeRate, status);
        body.classList.add(scrollLockClass);
        fillUsernameWrapper(modalUsernameWrapper, userName, isVerified, modalVerifiedIconCopy);
        modalRate.textContent = `${trimNumber(exchangeRate)} ₽`;
        modalCashlimit.textContent = `${minCurrencyAmount} ₽ - ${maxCurrencyAmount} ₽`;
        modalMinAmountError.textContent = `Минимальная сумма — ${minCurrencyAmount} ₽`;
        clearModalSelectOptions();
        fillPaymentMethods(paymentMethods);
        const onPaymentInputEnterNewValue = () => {
          const debouncedEnter = debounce(() => {
            modalEnrollmentInput.value = (modalPaymentInput.value / exchangeRate).toFixed(2);
          });
          debouncedEnter();
        };
        const onEnrollmentInputEnterNewValue = () => {
          const debouncedEnter = debounce(() => {
            modalPaymentInput.value = Math.floor(modalEnrollmentInput.value * exchangeRate);
          });
          debouncedEnter();
        };
        modalPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
        modalEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);

        const onCloseModalButtonClick = () => {
          body.classList.remove(scrollLockClass);
          modalBuy.style.display = 'none';
          modalCloseButton.removeEventListener('click', onCloseModalButtonClick);
          modalPaymentInput.removeEventListener('input', onPaymentInputEnterNewValue);
          modalEnrollmentInput.removeEventListener('input', onEnrollmentInputEnterNewValue);
        };
        modalCloseButton.addEventListener('click', onCloseModalButtonClick);
        modalBuy.style.display = 'block';
      }
    });
  });

export {receivedData};
