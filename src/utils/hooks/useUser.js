import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useVerifyOTPMutation} from '../../redux/apis';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/reducers/userSlice';
import storage from '@react-native-firebase/storage';

const useUser = () => {
  const {user} = useSelector(state => ({user: state.userSlice}), shallowEqual);

  const uploadImage = async (uri, postId = '') => {
    console.log('uploadStarting', user?.firebaseUserId);

    const ext = uri.split('.').pop();
    let ref = null;
    if (postId) {
      ref = storage().ref(`/postPhotos/${user?.firebaseUserId_postId}.${ext}`);
    } else {
      ref = storage().ref(`/profilePhotos/${user?.firebaseUserId}.${ext}`);
    }
    const task = ref.putFile(uri);

    return await task
      .then(async () => {
        const url = await ref.getDownloadURL();

        return url;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };

  return {
    user,
    uploadImage,
  };
};

export default useUser;
