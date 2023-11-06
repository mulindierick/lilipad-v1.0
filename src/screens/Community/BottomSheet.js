import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextNormal} from '../../components/common/CustomText';
import {
  BrowseAllSpaceIcon,
  DeletePostSvg,
  EditPostSvg,
  LeaveThisSpaceIcon,
  MuteOnNotificationsIcon,
  ReportPostSvg,
  ViewMemberSvg,
  ViewMembersIcon,
} from '../../components/common/CustomSvgItems';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';
import SpacesRelatedActivity from '../../utils/hooks/SpacesRelatedActivity';
import {useNavigation} from '@react-navigation/native';

const BottomSheet = ({
  RBSheetRef,
  setSelected,
  selected,
  triggerFromPost = false,
  isThisUserOwnerOfPost = false,
  uid,
  userFirstName,
}) => {
  const {user} = useUser();
  const {removeSpace} = SpacesRelatedActivity();

  const navigation = useNavigation();

  const removeAndUpdateSpaces = async () => {
    try {
      setSelected(user?.collegeName);
      let res = await removeSpace(selected);
      RBSheetRef.current.close();
    } catch (err) {
      console.log({err});
    }
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
          <TouchableOpacity style={styles.innerContainer}>
            <ViewMemberSvg />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              View {`${userFirstName}'s`} Profile
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
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
          <TouchableOpacity style={styles.innerContainer}>
            <EditPostSvg />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              Edit Post
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
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
          <TouchableOpacity style={styles.innerContainer}>
            <MuteOnNotificationsIcon />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              Unmute Notifications
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
            <BrowseAllSpaceIcon />
            <TextNormal textStyle={styles.text} color={COLORS.blue}>
              Browse All Spaces
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
        height={wp(54)}
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
          <TouchableOpacity style={styles.innerContainer}>
            <ViewMembersIcon />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              View Members
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
            <MuteOnNotificationsIcon />
            <TextNormal textStyle={styles.text} color={'#585858'}>
              Unmute Notifications
            </TextNormal>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
            <BrowseAllSpaceIcon />
            <TextNormal textStyle={styles.text} color={COLORS.blue}>
              Browse All Spaces
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
      height={wp(68)}
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
        <TouchableOpacity style={styles.innerContainer}>
          <MuteOnNotificationsIcon />
          <TextNormal textStyle={styles.text} color={'#585858'}>
            Unmute Notifications
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
        <TouchableOpacity style={styles.innerContainer}>
          <BrowseAllSpaceIcon />
          <TextNormal textStyle={styles.text} color={COLORS.blue}>
            Browse All Spaces
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
