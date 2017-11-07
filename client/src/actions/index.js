import get from 'Utils/get';
import config from 'Config/apis';
import historyController from 'Controllers/history';

export function initialize() {
  return async dispatch => {
    // hook into the global onpopstate event to handle
    // forward/back actions
    historyController.onPopState(() => {
      dispatch({
        type: 'UPDATE_ACTIVE_COMPANY',
        keyPath: historyController.formPath(window.location.pathname)
      })
    });
    
    // since we simply get a dump of the entire dataset upfront
    // then fetch that data and store it
    const companies = await get(config.companies);
    
    dispatch({
      type: 'COMPANIES_RECEIVED',
      companies
    });
  };
}

export function getSelectedCompany(id) {
  return createAction({'path': id}, '', `/${id}`);
}

export function getSelectedChild(id) {
  return createAction({'path': id});
}

export function createAction(...args) {
  return dispatch =>
  dispatch({
    type: 'UPDATE_ACTIVE_COMPANY',
    ...historyController.pushState(...args)
  });
}