import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  useDeleteUserAccountMutation,
  useVerifyOTPMutation,
} from '../../redux/apis';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmail,
  setFCMToken,
  setSpaces,
  setUser,
} from '../../redux/reducers/userSlice';
import useUser from './useUser';
import {setFirstTimeLogin} from '../../redux/reducers/generalSlice';
import SpacesRelatedActivity from './SpacesRelatedActivity';
import auth from '@react-native-firebase/auth';
import {GetFCMToken} from '../pushNotification_Helper';

const UseFirebaseAuth = () => {
  const [verifyOTP] = useVerifyOTPMutation();
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const {uploadImage} = useUser();
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({user: state.userSlice}));

  const firebaseAuth = async (email, otp) => {
    console.log(email, otp);
    try {
      let res = await verifyOTP({email: email, otp: otp});
      let fcmToken = await GetFCMToken();
      console.log({res});
      if (res?.data?.message == 'Success') {
        let authStatus = firebase
          .auth()
          .signInWithCustomToken(res.data.data)
          .then(userCredential => {
            // Signed in
            var email = email;
            dispatch(setEmail({email: email}));
            dispatch(setFCMToken({PushNotificationToken: fcmToken}));
            firestore().collection('accounts').doc(userCredential.user.uid).set(
              {
                fcmToken: fcmToken,
              },
              {merge: true},
            );
            // ...
            return 'Success';
          })
          .catch(error => {
            alert('Sorry!, Something went wrong');
            return 'Error';
            // ...
          });
        return authStatus;
      }
      return res?.error?.data?.message;
    } catch (err) {
      console.log({err});
      return 'Error';
    }
  };

  //Will optimize later. This is just for testing
  const createAccount = async body => {
    const {email, firstName, lastName, major, classYear, image} = body;
    const fcmToken = await GetFCMToken();

    const collegeData = await firestore()
      .collection('Colleges')
      .doc(user?.college)
      .get();
    const collegeDataItems = collegeData?.data();

    const array = [major, classYear, collegeDataItems.collegeName];
    let spacesId = {};
    try {
      let url = await uploadImage(image);
      await Promise.all(
        array.map(async item => {
          let res2 = await firestore()
            .collection(`Colleges/${user?.college}/spaces`)
            .where('spaceName', '==', item)
            .get();
          console.log({res2});
          if (res2?.docs?.length > 0) {
            spacesId = {
              ...spacesId,
              [item]: res2?.docs[0]._data.spaceId,
            };
            res2 = await firestore()
              .collection(`Colleges/${user?.college}/spaces`)
              .doc(res2?.docs[0]._data.spaceId)
              .set(
                {
                  members: firestore.FieldValue.arrayUnion(
                    user?.firebaseUserId,
                  ),
                },
                {merge: true},
              );
          } else {
            let uid = firestore().collection('spaces').doc();
            res2 = await firestore()
              .collection(`Colleges/${user?.college}/spaces`)
              .doc(uid.id)
              .set({
                spaceName: item,
                members: [user?.firebaseUserId],
                isActive: true,
                admins: [],
                isPrivate: false,
                joinRequests: [],
                category: null,
                spaceId: uid.id,
              });
            spacesId = {
              ...spacesId,
              [item]: uid.id,
            };
          }
        }),
      );

      let res = await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .update({
          firstName: firstName,
          lastName: lastName,
          major: major,
          classYear: classYear,
          photo: url,
          spaces: [collegeDataItems.collegeName, classYear, major],
          spacesId: spacesId,
          isVerified: true,
          fullName: firstName + ' ' + lastName,
          groupLastVisit: {
            [collegeDataItems.collegeName]:
              firestore.FieldValue.serverTimestamp(),
            [classYear]: firestore.FieldValue.serverTimestamp(),
            [major]: firestore.FieldValue.serverTimestamp(),
          },
          fcmToken: fcmToken,
          lastActivitiesChecked: firestore.FieldValue.serverTimestamp(),
        });
      dispatch(
        setUser({
          email: user?.email,
          firstName: firstName,
          lastName: lastName,
          major: major,
          photo: url,
          spaces: [collegeDataItems.collegeName, classYear, major],
          isVerified: true,
          firebaseUserId: user?.firebaseUserId,
          classYear: classYear,
          PushNotificationToken: fcmToken,
          college: user?.college,
          spaceId: spacesId,
        }),
      );
      dispatch(setFirstTimeLogin({firstTimeLogin: true}));
      return 'Success';
    } catch (err) {
      console.log({err});
      return 'Error';
    }
  };

  const joinSpaces = async (spaceName, spaceId) => {
    try {
      dispatch(
        setSpaces({
          spaces: [...user?.spaces, spaceName],
          spaceId: {...user?.spacesId, [spaceName]: spaceId},
        }),
      );
      await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .set(
          {
            spaces: firestore.FieldValue.arrayUnion(spaceName),
            spacesId: {
              ...user?.spacesId,
              [spaceName]: spaceId,
            },
            groupLastVisit: {
              [spaceName]: firestore.FieldValue.serverTimestamp(),
            },
          },
          {merge: true},
        );
      await firestore()
        .collection(`Colleges/${user?.college}/spaces`)
        .doc(spaceId)
        .set(
          {
            members: firestore.FieldValue.arrayUnion(user?.firebaseUserId),
          },
          {merge: true},
        );
      return 'Success';
    } catch (err) {
      console.log({err});
      dispatch(
        setSpaces({
          spaces: [...user?.spaces],
          spaceId: {...user?.spacesId},
        }),
      );
    }
  };

  const DeleteUserAccountAndRelatedActivities = async () => {
    try {
      auth().signOut();
      deleteUserAccount({
        userId: user?.firebaseUserId,
        spaces: user?.spaces,
        spacesId: user?.spaceId,
      });
      dispatch(
        setUser({
          email: null,
          firstName: null,
          lastName: null,
          major: null,
          photo: null,
          spaces: [],
          isVerified: false,
          firebaseUserId: null,
          classYear: null,
          college: null,
          spacesId: null,
        }),
      );
      console.log('FINALLY COMPLETED');
    } catch (e) {
      console.log({e});
    }
  };

  const pushNotificationSwitch = async pushNotificationValue => {
    try {
      const fcmToken = await GetFCMToken();
      if (pushNotificationValue) {
        await firestore()
          .collection('accounts')
          .doc(user?.firebaseUserId)
          .update({
            fcmToken: '',
          });
        dispatch(
          setFCMToken({
            PushNotificationToken: null,
          }),
        );
      } else {
        await firestore()
          .collection('accounts')
          .doc(user?.firebaseUserId)
          .update({
            fcmToken: fcmToken,
          });
        dispatch(
          setFCMToken({
            PushNotificationToken: fcmToken,
          }),
        );
      }
    } catch (e) {
      console.log({e});
    }
  };

  return {
    firebaseAuth,
    createAccount,
    joinSpaces,
    DeleteUserAccountAndRelatedActivities,
    pushNotificationSwitch,
  };
};

export default UseFirebaseAuth;
