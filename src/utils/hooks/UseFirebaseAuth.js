import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useVerifyOTPMutation} from '../../redux/apis';
import {useDispatch, useSelector} from 'react-redux';
import {setEmail, setSpaces, setUser} from '../../redux/reducers/userSlice';
import useUser from './useUser';
import {setFirstTimeLogin} from '../../redux/reducers/generalSlice';
import SpacesRelatedActivity from './SpacesRelatedActivity';
import auth from '@react-native-firebase/auth';
import {GetFCMToken} from '../pushNotification_Helper';

const UseFirebaseAuth = () => {
  const [verifyOTP] = useVerifyOTPMutation();
  const {uploadImage} = useUser();
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({user: state.userSlice}));

  const firebaseAuth = async (email, otp) => {
    console.log(email, otp);
    try {
      let res = await verifyOTP({email: email, otp: otp});
      console.log({res});
      if (res?.data?.message == 'Success') {
        let authStatus = firebase
          .auth()
          .signInWithCustomToken(res.data.data)
          .then(userCredential => {
            // Signed in
            console.log('HERE', userCredential.user);
            var email = email;
            dispatch(setEmail({email: email}));
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
    const array = [major, classYear, 'Skidmore College'];
    try {
      let url = await uploadImage(image);
      array.map(async item => {
        let res2 = await firestore().collection('spaces').doc(item).get();
        if (res2?._data) {
          res2 = await firestore()
            .collection('spaces')
            .doc(item)
            .set(
              {
                members: firestore.FieldValue.arrayUnion(user?.firebaseUserId),
              },
              {merge: true},
            );
        } else {
          res2 = await firestore()
            .collection('spaces')
            .doc(item)
            .set({
              spaceName: item,
              members: [user?.firebaseUserId],
            });
        }
      });

      let res = await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .update({
          firstName: firstName,
          lastName: lastName,
          major: major,
          classYear: classYear,
          photo: url,
          spaces: ['Skidmore College', classYear, major],
          isVerified: true,
          fullName: firstName + ' ' + lastName,
          groupLastVisit: {
            'Skidmore College': firestore.FieldValue.serverTimestamp(),
            [classYear]: firestore.FieldValue.serverTimestamp(),
            [major]: firestore.FieldValue.serverTimestamp(),
          },
          fcmToken: fcmToken,
        });

      console.log('Added Skidmore College');
      dispatch(
        setUser({
          email: user?.email,
          firstName: firstName,
          lastName: lastName,
          major: major,
          photo: url,
          spaces: ['Skidmore College', classYear, major],
          isVerified: true,
          firebaseUserId: user?.firebaseUserId,
          classYear: classYear,
        }),
      );
      dispatch(setFirstTimeLogin({firstTimeLogin: true}));

      return 'Success';
    } catch (err) {
      console.log({err});
      return 'Error';
    }
  };

  const joinSpaces = async spaceName => {
    try {
      dispatch(
        setSpaces({
          spaces: [...user?.spaces, spaceName],
        }),
      );
      await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .set(
          {
            spaces: firestore.FieldValue.arrayUnion(spaceName),
            groupLastVisit: {
              [spaceName]: firestore.FieldValue.serverTimestamp(),
            },
          },
          {merge: true},
        );
      await firestore()
        .collection('spaces')
        .doc(spaceName)
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
        }),
      );
    }
    // if (res2?._data) {
    //   res2 = await firestore()
    //     .collection('spaces')
    //     .doc(item)
    //     .set(
    //       {
    //         members: firestore.FieldValue.arrayUnion(user?.firebaseUserId),
    //       },
    //       {merge: true},
    //     );
    // } else {
    //   res2 = await firestore()
    //     .collection('spaces')
    //     .doc(item)
    //     .set({
    //       spaceName: item,
    //       members: [user?.firebaseUserId],
    //     });
    // }
  };

  const DeleteUserAccountAndRelatedActivities = async () => {
    try {
      auth().signOut();
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
        }),
      );
      //Delete User Posts
      await firestore()
        .collectionGroup('posts')
        .where('createdBy', '==', user?.firebaseUserId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
      //Delete User Account
      await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .delete();
      console.log('FINALLY COMPLETED');
    } catch (e) {
      console.log({e});
    }
  };

  return {
    firebaseAuth,
    createAccount,
    joinSpaces,
    DeleteUserAccountAndRelatedActivities,
  };
};

export default UseFirebaseAuth;
