import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from './CustomIcon';
import {TextNormal} from './CustomText';
import {COLORS} from '../../utils/constants/theme';

const CustomImagePickerModal = ({
  showModal,
  setShowModal,
  onBackButtonPress,
  onBackdropPress,
  onPressCamera,
  onPressGallery,
}) => {
  return (
    <Modal
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      style={styles.modalContainer}
      isVisible={showModal}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPressCamera}
          style={{alignItems: 'center'}}>
          <CustomIcon
            type="ionicons"
            icon="camera-outline"
            size={hp(5)}
            color={COLORS.blue}
            disabled
          />
          <TextNormal bold color={COLORS.blue} disabled>
            Camera
          </TextNormal>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressGallery}
          style={{alignItems: 'center'}}>
          <CustomIcon
            type="ionicons"
            icon="image-outline"
            size={hp(5)}
            disabled
            color={COLORS.blue}
          />
          <TextNormal bold color={COLORS.blue} disabled>
            Gallery
          </TextNormal>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomImagePickerModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: hp(1),
    margin: 0,
    paddingHorizontal: wp(3),
    // justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: COLORS.backgroundColor,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp(2),
  },
});
