// Page elements
const usersNavigation = document.querySelector('.users-nav');
const navigationControls = usersNavigation.querySelector('.tabs__controls');

const tableBody = document.querySelector('.users-list__table-body');

//Templates
const userTableRowTemplate = document.querySelector('#user-table-row__template')
  .content
  .querySelector('.users-list__table-row');

export {
  navigationControls,
  tableBody,
  userTableRowTemplate,
};
