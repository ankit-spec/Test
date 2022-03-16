import axios from 'axios';
import store from '../redux/store';
import types from '../redux/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {dispatch, getState} = store;

export async function getHeaders() {
  let userData = await AsyncStorage.getItem('userData');
  if (userData) {
    userData = JSON.parse(userData);
    // console.log("GET_HEADER", userData.access_token)
    // console.log("GET_HEADER", `${userData.access_token}`)
    return {
      authorization: `Bearer ${userData.access_token}`, 
    };
  }
  return {};
}

export function setUserData(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('userData').then(data => {
      resolve(JSON.parse(data));
    });
  });
}

export function setProfileData(data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem('profileData', data);
}

export async function getProfileData() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('profileData').then(data => {
      resolve(JSON.parse(data));
    });
  });
}

export function setItem(key, data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key).then(data => {
      resolve(JSON.parse(data));
    });
  });
}

export function removeItem(key) {
  return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
  return AsyncStorage.clear();
}

export async function clearUserData() {
  return AsyncStorage.removeItem('userData');
}

export async function apiReq(
  endPoint,
  data,
  method,
  headers,
  requestOptions = {},
) {
  return new Promise(async (res, rej) => {
    const getTokenHeader = await getHeaders();
    headers = {
      ...getTokenHeader,
      ...headers,
    };

    if (method === 'get' || method === 'delete') {
      data = {
        ...requestOptions,
        ...data,
        headers,
      };
    }

    axios[method](endPoint, data, {headers})
      .then(result => {
        const {data} = result;

        if (data.status === false) {
          return rej(data);
        }

        return res(data);
      })
      .catch(error => {
        console.log(error);
        console.log(error && error.response, 'the error respne');
        if (error && error.response && error.response.status === 401) {
          clearUserData();

          dispatch({
            type: types.CLEAR_REDUX_STATE,
            payload: {},
          });

          // dispatch({
          // 	type: types.NO_INTERNET,
          // 	payload: { internetConnection: true },
          // });
        }
        if (error && error.response && error.response.data) {
          if (!error.response.data.message) {
            return rej({
              ...error.response.data,
              message: error.response.data.message || 'Network Error',
            });
          }
          return rej(error.response.data);
        } else {
          return rej({message: 'Network Error', msg: 'Network Error'});
        }
        return rej(error);
      });
  });
}

export function apiPost(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
  return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
  return apiReq(endPoint, data, 'put', headers);
}
