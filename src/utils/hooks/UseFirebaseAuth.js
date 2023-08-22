import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useVerifyOTPMutation} from '../../redux/apis';

const UseFirebaseAuth = () => {
  const [verifyOTP] = useVerifyOTPMutation();
  const firebaseAuth = async (email, otp) => {
    try {
      let res = await verifyOTP({email: email, otp: otp});
      firebase
        .auth()
        .signInWithCustomToken(res.data.data)
        .then(userCredential => {
          // Signed in
          console.log('HERE', userCredential.user);
          var email = email;
          // ...
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      auth().signOut();
    } catch (err) {
      console.log({err});
    }
  };
  return {
    firebaseAuth,
  };
};

export default UseFirebaseAuth;
