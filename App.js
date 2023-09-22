import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ContextProvider} from './src/context/Context';
import RootStack from './src/navigation/RootStack';
import {persistor, store} from './src/redux/store';
const App = () => {
  // useEffect(() => {
  //   requestUserPermission();
  //   GetFCMToken();
  //   NotificationListener();
  // }, []);

  // useEffect(() => {
  //   AvoidSoftInput.setShouldMimicIOSBehavior(true);
  //   AvoidSoftInput.setEnabled(true);
  // }, []);

  return (
    <Provider store={store}>
      <ContextProvider>
        <PersistGate persistor={persistor}>
          <MenuProvider>
            <RootStack />
          </MenuProvider>
          <Toast position="bottom" autoHide={true} />
        </PersistGate>
      </ContextProvider>
    </Provider>
  );
};

export default App;
