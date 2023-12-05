import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  BrowseAllSpaceIcon,
  DeletePostSvg,
  EditPostSvg,
  LeaveThisSpaceIcon,
  MuteOffNotificationsIcon,
  MuteOnNotificationsIcon,
  ReportPostSvg,
  ViewMemberSvg,
  ViewMembersIcon,
} from '../../components/common/CustomSvgItems';
import {TextNormal} from '../../components/common/CustomText';
import {COLORS} from '../../utils/constants/theme';
import SpacesRelatedActivity from '../../utils/hooks/SpacesRelatedActivity';
import useUser from '../../utils/hooks/useUser';
import {useDispatch} from 'react-redux';
import {setReportPost} from '../../redux/reducers/generalSlice';

const BottomSheet = ({
  RBSheetRef,
  setSelected,
  selected,
  triggerFromPost = false,
  isThisUserOwnerOfPost = false,
  uid,
  userFirstName,
  postId,
  spaceId,
  DeletePost,
  setEditPostModal,
  horizontalScrollRef,
}) => {
  const {user, general} = useUser();
  const {removeSpace, handleEachSpaceNotifcationStatus} =
    SpacesRelatedActivity();

  const navigation = useNavigation();

  const removeAndUpdateSpaces = async () => {
    try {
      setSelected(user?.collegeName);
      let res = await removeSpace(selected);
      RBSheetRef.current.close();
      // scroll to zero index of scrollView
      horizontalScrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    } catch (err) {
      console.log({err});
    }
  };

  const handleSpaceNotification = async () => {
    try {
      handleEachSpaceNotifcationStatus(selected);
      RBSheetRef.current.close();
    } catch (err) {
      console.log({err});
    }
  };

  const EditModalScreen = () => {
    RBSheetRef.current.close();
    setTimeout(() => {
      setEditPostModal(true);
    }, 250);
  };

  const dispatch = useDispatch();
  const ReportPost = () => {
    console.log({postId});
    dispatch(
      setReportPost(
        general?.reportPost ? [...general?.reportPost, postId] : [postId],
      ),
    );
    RBSheetRef.current.close();
  };

  const viewProfile = () => {
    RBSheetRef.current.close();
    navigation.navigate('DifferentUserProfile', {uid: uid});
  };

  const BrowseAllSpaces = () => {
    RBSheetRef.current.close();
    navigation.navigate('ExploreSpaces');
  };

  if (triggerFromPost && !isThisUserOwnerOfPost) {
    return (
      <RBSheet
        ref={RBSheetRef}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        height={wp(45)}
        customStyles={{
          draggableIcon: {
            width: wp(27),
            backgroundColor: '#BEBEBE',
            height: hp(0.5),
          },
          container: {
            borderTopLeftRadius: wp(9),
            borderTopRightRadius: wp(9),
            borderWidth: 0.1,
            borderColor: '#CCCCCC',
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}>
        <View style={{paddingHorizontal: wp(7), marginTop: wp(3.5)}}>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => viewProfile()}>
            <ViewMemberSvg />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              View {`${userFirstName}'s`} Profile
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => ReportPost()}>
            <ReportPostSvg />
            <TextNormal textStyle={styles.text} color={COLORS.red}>
              Report Post
            </TextNormal>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

  if (triggerFromPost && isThisUserOwnerOfPost) {
    return (
      <RBSheet
        ref={RBSheetRef}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        height={wp(45)}
        customStyles={{
          draggableIcon: {
            width: wp(27),
            backgroundColor: '#BEBEBE',
            height: hp(0.5),
          },
          container: {
            borderTopLeftRadius: wp(9),
            borderTopRightRadius: wp(9),
            borderWidth: 0.1,
            borderColor: '#CCCCCC',
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}>
        <View style={{paddingHorizontal: wp(7), marginTop: wp(3.5)}}>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => EditModalScreen()}>
            <EditPostSvg />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              Edit Post
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer} onPress={DeletePost}>
            <DeletePostSvg />
            <TextNormal textStyle={styles.text} color={COLORS.red}>
              Delete Post
            </TextNormal>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

  if (selected == user?.collegeName) {
    return (
      <RBSheet
        ref={RBSheetRef}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        height={wp(35)}
        customStyles={{
          draggableIcon: {
            width: wp(27),
            backgroundColor: '#BEBEBE',
            height: hp(0.5),
          },
          container: {
            borderTopLeftRadius: wp(9),
            borderTopRightRadius: wp(9),
            borderWidth: 0.1,
            borderColor: '#CCCCCC',
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}>
        <View style={{paddingHorizontal: wp(7), marginTop: wp(3.5)}}>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => handleSpaceNotification()}>
            {user?.notificationStatus[selected] ? (
              <MuteOnNotificationsIcon />
            ) : (
              <MuteOffNotificationsIcon />
            )}
            <TextNormal textStyle={styles.text} color={'#585858'}>
              {user?.notificationStatus[selected]
                ? 'Mute Notifications'
                : 'Unmute Notifications'}
            </TextNormal>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

  if (selected == user?.classYear || selected == user?.major) {
    return (
      <RBSheet
        ref={RBSheetRef}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        height={wp(44)}
        customStyles={{
          draggableIcon: {
            width: wp(27),
            backgroundColor: '#BEBEBE',
            height: hp(0.5),
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            borderWidth: 0.1,
            borderColor: '#CCCCCC',
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}>
        <View style={{paddingHorizontal: wp(7), marginTop: wp(3.5)}}>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              navigation.navigate('ViewMembers', {id: user?.spaceId[selected]});
              RBSheetRef.current.close();
            }}>
            <ViewMembersIcon />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              View Members
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => handleSpaceNotification()}>
            {user?.notificationStatus[selected] ? (
              <MuteOnNotificationsIcon />
            ) : (
              <MuteOffNotificationsIcon />
            )}
            <TextNormal textStyle={styles.text} color={'#585858'}>
              {user?.notificationStatus[selected]
                ? 'Mute Notifications'
                : 'Unmute Notifications'}
            </TextNormal>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }

  return (
    <RBSheet
      ref={RBSheetRef}
      closeOnDragDown={true}
      dragFromTopOnly={true}
      height={wp(58)}
      customStyles={{
        draggableIcon: {
          width: wp(27),
          backgroundColor: '#BEBEBE',
          height: hp(0.5),
        },
        container: {
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
          borderWidth: 0.1,
          borderColor: '#CCCCCC',
        },
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
      }}>
      <View
        style={{
          paddingHorizontal: wp(7),
          marginTop: wp(2),
          marginTop: wp(3.5),
        }}>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => {
            navigation.navigate('ViewMembers', {id: user?.spaceId[selected]});
            RBSheetRef.current.close();
          }}>
          <ViewMembersIcon />
          <TextNormal textStyle={styles.text} color={'#585858'}>
            View Members
          </TextNormal>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => handleSpaceNotification()}>
          {user?.notificationStatus[selected] ? (
            <MuteOnNotificationsIcon />
          ) : (
            <MuteOffNotificationsIcon />
          )}
          <TextNormal textStyle={styles.text} color={'#585858'}>
            {user?.notificationStatus[selected]
              ? 'Mute Notifications'
              : 'Unmute Notifications'}
          </TextNormal>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => removeAndUpdateSpaces()}>
          <LeaveThisSpaceIcon />
          <TextNormal textStyle={styles.text} color={COLORS.red}>
            Leave this Space
          </TextNormal>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  text: {
    marginLeft: wp(5),
    fontSize: wp(5),
    fontWeight: '500',
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: wp(2.5),
  },
});
