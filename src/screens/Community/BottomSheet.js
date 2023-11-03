import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextNormal} from '../../components/common/CustomText';
import {
  BrowseAllSpaceIcon,
  LeaveThisSpaceIcon,
  MuteOnNotificationsIcon,
  ViewMembersIcon,
} from '../../components/common/CustomSvgItems';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';

const BottomSheet = ({RBSheetRef, selectedSpaceName}) => {
  const {user} = useUser();
  const removeAndUpdateSpaces = async () => {
    try {
      setSelected('Skidmore College');
      let res = await removeSpace(item, user?.spaces);
    } catch (err) {
      console.log({err});
    }
  };
  return (
    <RBSheet
      ref={RBSheetRef}
      closeOnDragDown={true}
      dragFromTopOnly={true}
      height={hp(32)}
      customStyles={{
        draggableIcon: {
          width: wp(27),
          backgroundColor: '#BEBEBE',
          height: hp(0.5),
        },
        container: {
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
        },
      }}>
      <View style={{paddingHorizontal: wp(7)}}>
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
    marginVertical: hp(1.5),
  },
});
