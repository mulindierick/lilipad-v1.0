import firestore from '@react-native-firebase/firestore';
import useUser from './useUser';
import {useDispatch, useSelector} from 'react-redux';
import {setSpaces, setUser} from '../../redux/reducers/userSlice';

const SpacesRelatedActivity = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({user: state.userSlice}));
  const removeSpace = async spaceName => {
    const array = [spaceName, user?.firebaseUserId];
    const filterData = user?.spaces.filter(item => item != spaceName);
    dispatch(setSpaces({spaces: filterData}));
    try {
      array.map(async item => {
        if (item == spaceName) {
          let res = await firestore()
            .collection('spaces')
            .doc(item)
            .set(
              {
                members: firestore.FieldValue.arrayRemove(user?.firebaseUserId),
              },
              {merge: true},
            );
        } else {
          let res = await firestore()
            .collection('accounts')
            .doc(item)
            .set(
              {
                spaces: firestore.FieldValue.arrayRemove(spaceName),
              },
              {merge: true},
            );
        }
      });
    } catch (err) {
      console.log({err});
    }
  };

  return {
    removeSpace,
  };
};

export default SpacesRelatedActivity;
