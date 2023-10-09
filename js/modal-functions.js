import {modalSelect} from './variables.js';

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
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods
};
