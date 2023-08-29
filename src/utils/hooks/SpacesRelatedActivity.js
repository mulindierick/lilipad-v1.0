import firestore from '@react-native-firebase/firestore';
import useUser from './useUser';

const SpacesRelatedActivity = () => {
  const {user} = useUser();
  const removeSpace = async spaceName => {
    const array = [spaceName, user?.firebaseUserId];
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
