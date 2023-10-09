import api from '../../services';
import {
  LOADING_START,
  LOADING_END,
  SET_AUTH_TOKEN,
  LOGOUT,
  CONTACTS,
  SET_CONTACT_DETAILS,
  REMOVE_CONTACT,
} from './type';

export const setAuthToken = (token) => {
  return { type: SET_AUTH_TOKEN, token };
};

export const logout = () => {
  return { type: LOGOUT };
};

const loadingStart = () => {
  return { type: LOADING_START };
};

const loadingEnd = () => {
  return { type: LOADING_END };
};

const setContactDetails = (data) => {
  return { type: SET_CONTACT_DETAILS, data };
};

const removeContact = (id) => {
  return { type: REMOVE_CONTACT, id };
};

export const loginRequest = (credentials) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const response = await api.post('/api/v1/login', credentials);
    const token = response.data.token;
    localStorage.setItem('authToken', token);
    dispatch(setAuthToken(token));
    dispatch(loadingEnd());
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    dispatch(loadingEnd());
    return false;
  }
};

export const registerRequest = (data) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    await api.post('/api/v1/register', data);
    dispatch(loadingEnd());
  } catch (error) {
    console.error(error);
    dispatch(loadingEnd());
  }
};

export const contactsRequest = () => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const token = localStorage.getItem('authToken');
    const response = await api.get('/api/v1/contacts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: CONTACTS, data: response.data });
    dispatch(loadingEnd());
  } catch (error) {
    console.log(error);
    dispatch(loadingEnd());
  }
};

export const contactDetailsRequest = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await api.get(`/api/v1/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setContactDetails(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteContactRequest = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    await api.delete(`/api/v1/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeContact(id));
  } catch (error) {
    console.log(error);
  }
};
