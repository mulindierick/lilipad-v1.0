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
    return `just now`;
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

export const getAgoTimeFullString = timestamp => {
  const now = new Date();
  const ago = new Date(timestamp * 1000);

  const agoInSeconds = Math.floor((now - ago) / 1000);
  if (agoInSeconds <= 60) {
    return `just now`;
  } else if (agoInSeconds <= 3600) {
    return `${Math.floor(agoInSeconds / 60)} ${
      Math.floor(agoInSeconds / 60) > 1 ? 'minutes' : 'minute'
    } ago`;
  } else if (agoInSeconds <= 86400) {
    return `${Math.floor(agoInSeconds / 3600)} ${
      Math.floor(agoInSeconds / 3600) > 1 ? 'hours' : 'hour'
    } ago`;
  } else if (agoInSeconds <= 604800) {
    return `${Math.floor(agoInSeconds / 86400)} ${
      Math.floor(agoInSeconds / 86400) > 1 ? 'days' : 'day'
    } ago`;
  } else if (agoInSeconds <= 2628000) {
    return `${Math.floor(agoInSeconds / 604800)} ${
      Math.floor(agoInSeconds / 604800) > 1 ? 'weeks' : 'week'
    } ago`;
  } else if (agoInSeconds <= 31536000) {
    return `${Math.floor(agoInSeconds / 2628000)} ${
      Math.floor(agoInSeconds / 2628000) > 1 ? 'months' : 'month'
    } ago`;
  } else if (agoInSeconds > 31536000) {
    return `${Math.floor(agoInSeconds / 31536000)} ${
      Math.floor(agoInSeconds / 31536000) > 1 ? 'years' : 'year'
    } ago`;
  } else {
    return 'just now';
  }
};

export const formatDate = inputDate => {
  const parts = inputDate.split('-');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const inputDateTime = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timeDiff = today - inputDateTime;
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  if (daysDiff === 0) {
    return 'Today';
  } else if (daysDiff === 1) {
    return 'Yesterday';
  } else if (daysDiff < 7) {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return dayNames[inputDateTime.getDay()];
  } else if (today.getFullYear() === inputDateTime.getFullYear()) {
    const options = {day: 'numeric', month: 'short'};
    return inputDateTime.toLocaleDateString('en-US', options);
  } else {
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return inputDateTime.toLocaleDateString('en-US', options);
  }
};
