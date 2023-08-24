import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const showToast = (type: string, message: string) => {
  try {
    Toast.show({
      type: type || 'info',
      text1: message,
    });
  } catch (error) {
    console.log('SHOW TOAST ERROR', error);
  }
};
