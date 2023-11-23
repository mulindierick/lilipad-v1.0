import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetInfo = () => {
  const [internetStatus, setInternetStatus] = useState(null);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const online = state.isConnected && state.isInternetReachable;

      setInternetStatus(online);
    });

    return () => removeNetInfoSubscription();
  }, []);

  return {
    internetStatus,
  };
};
