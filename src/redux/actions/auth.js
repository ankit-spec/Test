import {setUserData} from '../../utils/utils';
import types from '../types';
import showError from '../../utils/helperFunction';
import { apiPost ,clearUserData} from '../../utils/utils';
import store from '../store';
const { dispatch } = store;

export function login(data) {
  return new Promise((resolve, reject) => {
    apiPost(
      ' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAW0EYAY1rkwn_jBTtkGdGmd-GHdeUWUMc',
      data,
    )
      .then(res => {
        setUserData(res).then(saved => {
          saveUserData(res);
          resolve(res);
        });
      })
      .catch(error => {
        showError('kninni');
        reject(error);
      });
  });
}

const saveUserData = data => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export function logout() {
    dispatch({ type: types.CLEAR_REDUX_STATE });
    clearUserData();
  }
