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

export const getAgoTime = timestamp => {
  const now = new Date();
  const ago = new Date(timestamp * 1000);

  const agoInSeconds = Math.floor((now - ago) / 1000);

  if (agoInSeconds <= 60) {
    return `${agoInSeconds}s ago`;
  } else if (agoInSeconds <= 3600) {
    return `${Math.floor(agoInSeconds / 60)} m ago`;
  } else if (agoInSeconds <= 86400) {
    return `${Math.floor(agoInSeconds / 3600)} h ago`;
  } else if (agoInSeconds <= 604800) {
    return `${Math.floor(agoInSeconds / 86400)} d ago`;
  } else if (agoInSeconds <= 2628000) {
    return `${Math.floor(agoInSeconds / 604800)} w ago`;
  } else if (agoInSeconds <= 31536000) {
    return `${Math.floor(agoInSeconds / 2628000)} M ago`;
  } else {
    return `${Math.floor(agoInSeconds / 31536000)} y ago`;
  }
};
