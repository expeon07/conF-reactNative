import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
// import { PersistGate } from 'redux-persist/es/integration';
import { PersistGate } from 'redux-persist/integration/react'
import { Loading } from './components/LoadingComponent';

import { AsyncStorage } from 'react-native';
 const config = {
        key: 'root',
        debug: true,
        storage: AsyncStorage
    };


const {persistor, store} = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />}
          persistor={persistor} >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
