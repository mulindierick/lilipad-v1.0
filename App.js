import React from 'react';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootStack from './src/navigation/RootStack';
import {persistor, store} from './src/redux/store';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs(true);
  // useEffect(() => {
  //   requestUserPermission();
  //   GetFCMToken();
  //   NotificationListener();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootStack />
        <Toast position="bottom" autoHide={true} />
      </PersistGate>
    </Provider>
  );
};

export default App;
