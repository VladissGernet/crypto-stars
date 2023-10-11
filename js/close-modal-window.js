const resetPaymentListeners = (paymentInput, onPaymentInput, enrollmentInput, onEnrollmentInput, exchangeAll, onExchangeAllClick) => {
  paymentInput.removeEventListener('input', onPaymentInput);
  enrollmentInput.removeEventListener('input', onEnrollmentInput);
  paymentInput.value = '';
  enrollmentInput.value = '';
  exchangeAll.removeEventListener('click', onExchangeAllClick);
};

export {resetPaymentListeners};
