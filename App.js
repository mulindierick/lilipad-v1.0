import React, {useEffect} from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ContextProvider} from './src/context/Context';
import RootStack from './src/navigation/RootStack';
import {persistor, store} from './src/redux/store';
import {
  GetFCMToken,
  NotificationListener,
  requestUserPermission,
} from './src/utils/pushNotification_Helper';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  useEffect(() => {
    requestUserPermission();
    GetFCMToken();
    NotificationListener();
  }, []);

  // useEffect(() => {
  //   AvoidSoftInput.setShouldMimicIOSBehavior(true);
  //   AvoidSoftInput.setEnabled(true);
  // }, []);

  return (
    <Provider store={store}>
      <ContextProvider>
        <PersistGate persistor={persistor}>
          <MenuProvider>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </MenuProvider>
          <Toast position="bottom" autoHide={true} />
        </PersistGate>
      </ContextProvider>
    </Provider>
  );
};

export default App;
