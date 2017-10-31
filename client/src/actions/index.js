import get from 'Utils/get';
import config from 'Config/apis';

export function initialize() {
  return async dispatch => {
    // since we simply get a dump of the entire dataset upfront
    // then fetch that data and store it
    const companies = await get(config.companies);
    
    dispatch({
      type: 'COMPANIES_RECEIVED',
      companies
    });
  };
}