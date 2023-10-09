import {exchangeAllButton, modalEnrollmentInput, modalPaymentInput, modalSelect} from './variables.js';
import {debounce} from './util.js';

const addPaymentInputListener = (rate) => {
  const onPaymentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalEnrollmentInput.value = (modalPaymentInput.value / rate).toFixed(2);
    });
    debouncedEnter();
  };
  modalPaymentInput.addEventListener('input', onPaymentInputEnterNewValue);
};

const addEnrollmentInputListener = (rate) => {
  const onEnrollmentInputEnterNewValue = () => {
    const debouncedEnter = debounce(() => {
      modalPaymentInput.value = Math.floor(modalEnrollmentInput.value * rate);
    });
    debouncedEnter();
  };
  modalEnrollmentInput.addEventListener('input', onEnrollmentInputEnterNewValue);
};

const addExchangeAllButtonListener = (balanceAmount, rate) => {
  const onExchangeAllButtonClick = () => {
    modalEnrollmentInput.value = balanceAmount;
    modalPaymentInput.value = Math.floor(balanceAmount * rate);
  };
  exchangeAllButton.addEventListener('click', onExchangeAllButtonClick);
};

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

export {
  addPaymentInputListener,
  addEnrollmentInputListener,
  addExchangeAllButtonListener,
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods
};
