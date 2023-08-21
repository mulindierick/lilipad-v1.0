import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {showMessage} from 'react-native-flash-message';
import PushNotification from 'react-native-push-notification';
import {COLORS} from './constants/theme';

// Request user permission for push notifications
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return true;
  }
}

// Retrieve FCM token and store it in AsyncStorage
export async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log('old token', fcmtoken);

  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();

      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
        console.log('new token1', fcmtoken);
      }
    } catch (error) {
      console.log('error in fcm token', error);
    }
  }
}

// Set up the notification channel
const channelSetup = () => {
  PushNotification.getChannels(function (channel_ids) {
    console.log('channels', channel_ids);
    if (!channel_ids.includes('channel-1')) {
      PushNotification.createChannel(
        {
          channelId: 'channel-1',
          channelName: 'Members Activities',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }
  });
};

// Send local push notification
const sendLocalPushNotification = (title, message, data) => {
  try {
    PushNotification.localNotification({
      channelId: 'channel-1',
      autoCancel: true,
      bigText: message,
      title: title,
      data: data,
      message: 'Click to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
    });
  } catch (error) {
    console.log('push error', error);
  }
};

// Initialize notification listener
export const NotificationListener = color => {
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    sendLocalPushNotification(
      remoteMessage.notification?.title,
      remoteMessage.notification?.body,
      remoteMessage.data,
    );

    if (remoteMessage.data?.route) {
      console.log('Remote message contains route:', remoteMessage.data.route);
    }

    showMessage({
      message: remoteMessage.notification.title,
      description: remoteMessage.notification.body,
      type: 'default',
      // backgroundColor: color.primary,
      color: COLORS.white,
      duration: 4000,
    });
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('onNotificationOpenedApp OPEN');
    console.log('onNotificationOpenedApp', JSON.stringify(remoteMessage));
    console.log('remotemessage', remoteMessage.data.route);
    sendLocalPushNotification();
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('remotemessage killed', remoteMessage.data?.route);
        console.log(
          'Notification caused app to open from quit state:',
          JSON.stringify(remoteMessage),
        );
      }
    });

  // Call channel setup during the initialization of your application
  channelSetup();
};
