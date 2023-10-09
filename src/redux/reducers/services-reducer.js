import {
  LOADING_START,
  LOADING_END,
  SET_AUTH_TOKEN,
  LOGOUT,
  CONTACTS,
  REMOVE_CONTACT,
  SET_CONTACT_DETAILS,
} from '../actions/type';

const defaultState = {
  isLoading: false,
  contactDetails: null,
  authToken: localStorage.getItem('authToken') || null,
};

const serviceReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_END:
      return {
        ...state,
        isLoading: false,
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.token,
      };
    case LOGOUT:
      localStorage.removeItem('authToken');
      return {
        ...state,
        authToken: null,
      };
    case CONTACTS:
      return {
        ...state,
        contacts: action.data,
      };
    case SET_CONTACT_DETAILS:
      return {
        ...state,
        contactDetails: action.data,
      };

    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.id),
      };
    default:
      return state;
  }
};

export default serviceReducer;
