const hideValidationMessage = (message) => {
  message.style.display = 'none';
};

const showValidationMessage = (message) => {
  message.style.display = 'flex';
};

export {hideValidationMessage, showValidationMessage};
