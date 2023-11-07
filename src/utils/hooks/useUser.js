import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useVerifyOTPMutation} from '../../redux/apis';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {setProfilePhoto, setUser} from '../../redux/reducers/userSlice';
import storage from '@react-native-firebase/storage';
import {setFirstTimeLogin} from '../../redux/reducers/generalSlice';

const useUser = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({user: state.userSlice}), shallowEqual);
  const {general} = useSelector(
    state => ({general: state.generalSlice}),
    shallowEqual,
  );

  const setFirstTimeLoginStatus = value => {
    dispatch(setFirstTimeLogin({firstTimeLogin: value}));
  };

  const uploadImage = async (uri, postId = '') => {
    console.log('uploadStarting', user?.firebaseUserId);
    console.log({postId});

    const ext = uri.split('.').pop();
    let ref = null;
    if (postId) {
      ref = storage().ref(
        `/postPhotos/${user?.firebaseUserId}_${postId}.${ext}`,
      );
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

  const updateProfilePhoto = async uri => {
    const url = await uploadImage(uri);
    dispatch(setProfilePhoto({photo: url}));
    if (url) {
      await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .update({
          photo: url,
        });
      dispatch(setUser({...user, photo: url}));
    }
  };

  const getCollegeDomains = async () => {
    try {
      const res = await firestore()
        .collection('Colleges')
        .where('isActive', '==', true)
        .get();
      const data = res.docs.map(doc => ({
        domain: doc.data().collegeEmailDomainExtension,
        collegeId: doc.data().collegeId,
      }));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    user,
    general,
    uploadImage,
    setFirstTimeLoginStatus,
    updateProfilePhoto,
    getCollegeDomains,
  };
};

export default useUser;
