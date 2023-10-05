const tableBody = document.querySelector('.users-list__table-body');

//Templates
const userTableRowTemplate = document.querySelector('#user-table-row__template')
  .content
  .querySelector('.users-list__table-row');

export {
  tableBody,
  userTableRowTemplate,
};
