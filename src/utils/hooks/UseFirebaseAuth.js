import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {useVerifyOTPMutation} from '../../redux/apis';

const UseFirebaseAuth = () => {
  const [verifyOTP] = useVerifyOTPMutation();
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
  return {
    firebaseAuth,
  };
};

export default UseFirebaseAuth;
