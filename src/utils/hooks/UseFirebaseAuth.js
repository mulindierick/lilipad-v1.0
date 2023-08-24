import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useVerifyOTPMutation} from '../../redux/apis';
import {useSelector} from 'react-redux';

const UseFirebaseAuth = () => {
  const [verifyOTP] = useVerifyOTPMutation();

  const {user} = useSelector(state => state.userSlice);
  console.log({user});
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
    const {email, password, firstName, lastName, major, classYear, image} =
      body;
    try {
      let res = firestore().collection('accounts').doc(email).update({});
    } catch (err) {}
  };

  return {
    firebaseAuth,
  };
};

export default UseFirebaseAuth;
