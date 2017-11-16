import normalize from 'Utils/normalize';
import findIn from 'Utils/findIn';

const activeCompanyCache = (() => {
  // memoize previously viewed children
  const cache = {};
  return (data, keyPath) => {
    const key = keyPath.slice(0);
    // generate unique key for cache lookup
    const needle = key.join('_');
    // short circuit on found entry
    if (cache[needle]) {
      return cache[needle];
    }
    // findIn continues lookup in an object's children property
    // as it loops over the keyPath using it for reference
    cache[needle] = findIn(data[key.shift()], key);
    return cache[needle];
  }
})();

function getActiveCompanies(companies, keyPath) {
  return {
    // activeCompany: keyPath.length > 1
    //   ? activeCompanyCache(companies, keyPath)
    //   : companies[keyPath[0]],
    activeParent: companies[keyPath[0]]
  };
}

export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'COMPANIES_RECEIVED':
      return { 
        ...state,
        companyNames: normalize({
          properties: ['name'],
          id: 'id',
          returnType: 'array'
        }, action.companies),
        companies: action.companies
      };
    case 'UPDATE_ACTIVE_COMPANY':
      return {
        ...state,
        ...getActiveCompanies(state.companies, action.keyPath),
        keyPath: action.keyPath
      };
    default:
      return state;
  }
}
