import {SubmitButtonText} from './constants.js';

const getSelectedDataId = (data, elementId) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === elementId) {
      return data[i];
    }
  }
};
const clearModalSelectOptions = (select) => {
  const modalOptions = select.querySelectorAll('option');
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
const fillPaymentMethods = (methodsArray, select) => {
  if (methodsArray !== undefined) {
    methodsArray.forEach((payment) => {
      const newOption = document.createElement('option');
      newOption.textContent = payment.provider;
      select.appendChild(newOption);
    });
  }
};
const showModalWindow = (modal) => {
  modal.style.display = 'block';
};
const blockSubmitButton = (submitButton) => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};
const unblockSubmitButton = (submitButton) => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

export {
  getSelectedDataId,
  clearModalSelectOptions,
  fillUsernameWrapper,
  fillPaymentMethods,
  showModalWindow,
  blockSubmitButton,
  unblockSubmitButton
};
