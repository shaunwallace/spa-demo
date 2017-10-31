export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'COMPANIES_RECEIVED':
      return { 
        ...state,
        companyNames: Object.keys(action.companies),
        companies: action.companies
      };
    default:
      return state;
  }
}