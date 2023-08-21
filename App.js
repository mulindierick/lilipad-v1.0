import React, {useEffect} from 'react';
import RootStack from './src/navigation/RootStack';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {
  GetFCMToken,
  NotificationListener,
  requestUserPermission,
} from './src/utils/pushNotification_Helper';

const App = () => {
  // useEffect(() => {
  //   requestUserPermission();
  //   GetFCMToken();
  //   NotificationListener();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
