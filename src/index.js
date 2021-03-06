import React, {Component} from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import Routes from './Navigation/Routes';
import store from './redux/store';



export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
        <FlashMessage position="top" />
      </Provider>
    );
  }
}
