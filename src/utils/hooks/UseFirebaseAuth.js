import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useVerifyOTPMutation} from '../../redux/apis';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/reducers/userSlice';
import useUser from './useUser';

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

  const createAccount = async body => {
    const {email, firstName, lastName, major, classYear, image} = body;
    try {
      let url = await uploadImage(image);

      let res = await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .update({
          firstName: firstName,
          lastName: lastName,
          major: major,
          classYear: classYear,
          photo: url,
          spaces: [major],
          isVerified: true,
        });

      let res2 = await firestore().collection('spaces').doc(major).get();
      console.log({res2});
      if (res2?._data) {
        let res2 = await firestore()
          .collection('spaces')
          .doc(major)
          .set(
            {
              members: firestore.FieldValue.arrayUnion(user?.firebaseUserId),
            },
            {merge: true},
          );
      } else {
        let res2 = await firestore()
          .collection('spaces')
          .doc(major)
          .set({
            members: [user?.firebaseUserId],
          });
      }

      dispatch(
        setUser({
          email: user?.email,
          firstName: firstName,
          lastName: lastName,
          major: major,
          photo: url,
          spaces: [major],
          isVerified: true,
        }),
      );
      return 'Success';
    } catch (err) {
      console.log({err});
      return 'Error';
    }
  };

  return {
    firebaseAuth,
    createAccount,
  };
};

export default UseFirebaseAuth;
