import firestore from '@react-native-firebase/firestore';
import useUser from './useUser';
import {useDispatch, useSelector} from 'react-redux';
import {setSpaces, setUser} from '../../redux/reducers/userSlice';
import {merge} from 'lodash';

const SpacesRelatedActivity = () => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => ({user: state.userSlice}));

  const removeSpace = async spaceName => {
    let spaceIds = user?.spaceId;
    const array = [spaceIds[spaceName], user?.firebaseUserId];
    let {[spaceName]: removedSpace, ...removeAndUpdatedSpaceIds} = spaceIds;
    let {[spaceName]: removedSpace1, ...removeAndUpdatedNotificationStaus} =
      user?.notificationStatus;
    const filterData = user?.spaces.filter(item => item != spaceName);
    dispatch(
      setSpaces({
        spaces: filterData,
        spaceId: removeAndUpdatedSpaceIds,
        notificationStatus: removeAndUpdatedNotificationStaus,
      }),
    );
    try {
      array.map(async item => {
        if (item == spaceIds[spaceName]) {
          let res = await firestore()
            .collection(`Colleges/${user?.college}/spaces`)
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
                groupLastVisit: {
                  [spaceName]: firestore.FieldValue.delete(),
                },
                spacesId: {
                  [spaceName]: firestore.FieldValue.delete(),
                },
                notificationStatus: {
                  [spaceName]: firestore.FieldValue.delete(),
                },
              },
              {merge: true},
            );
        }
      });
    } catch (err) {
      console.log({err});
    }
  };

  const updateLastSpaceVisitTime = async spaceName => {
    try {
      let res = await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .set(
          {
            groupLastVisit: {
              [spaceName]: firestore.FieldValue.serverTimestamp(),
            },
          },
          {merge: true},
        );
    } catch (e) {
      console.log('UPDATELASTSPACEVISITTIME ', {e});
    }
  };

  const fetchMembers = async spaceId => {
    try {
      let res = await firestore()
        .collection(`Colleges/${user?.college}/spaces`)
        .doc(spaceId)
        .get();

      const membersData = await Promise.all(
        res?.data()?.members.map(async item => {
          console.log({item});
          let res = await firestore().collection('accounts').doc(item).get();
          return res?.data();
        }),
      );
      return membersData;
    } catch (err) {
      console.log({err});
    }
  };

  const handleEachSpaceNotifcationStatus = async spaceName => {
    try {
      console.log({spaceName});
      console.log({user});
      const newData = {
        ...user?.notificationStatus,
        [spaceName]: !user?.notificationStatus[spaceName],
      };

      let res = await firestore()
        .collection('accounts')
        .doc(user?.firebaseUserId)
        .set(
          {
            notificationStatus: newData,
          },
          {merge: true},
        );
      dispatch(
        setSpaces({
          spaces: [...user?.spaces],
          spaceId: {...user?.spaceId},
          notificationStatus: {
            ...newData,
          },
        }),
      );
    } catch (e) {
      console.log({e});
    }
  };

  return {
    removeSpace,
    updateLastSpaceVisitTime,
    fetchMembers,
    handleEachSpaceNotifcationStatus,
  };
};

export default SpacesRelatedActivity;
