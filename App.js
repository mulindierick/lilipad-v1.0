import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ContextProvider} from './src/context/Context';
import RootStack from './src/navigation/RootStack';
import {persistor, store} from './src/redux/store';
import {StatusBar} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

const App = () => {
  // useEffect(() => {
  //   AvoidSoftInput.setShouldMimicIOSBehavior(true);
  //   AvoidSoftInput.setEnabled(true);
  // }, []);

  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <ContextProvider>
        <PersistGate persistor={persistor}>
          <MenuProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" />
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
