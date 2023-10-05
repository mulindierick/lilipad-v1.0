import {Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import CustomImage from '../../components/common/CustomImage';
import CustomIcon from '../../components/common/CustomIcon';
import {TextNormal} from '../../components/common/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, images} from '../../utils/constants/theme';
import DeviceInfo from 'react-native-device-info';

const AddPostMenu = ({cameraPhotoHandler, cameraVideoHandler}) => {
  // to check whether the keyboard is visible or not
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Menu renderer={renderers.NotAnimatedContextMenu}>
      <MenuTrigger
        customStyles={{
          triggerTouchable: {
            underlayColor: 'rgba(0, 0, 0, 0)',
          },
        }}>
        <CustomImage
          source={images.camera}
          resizeMode="contain"
          height={hp(4.5)}
          width={wp(11)}
          containerStyle={{marginRight: wp(7)}}
          // onPressImage={() => cameraHandler()}
          disabled
        />
      </MenuTrigger>
      <MenuOptions
        optionsContainerStyle={[
          styles.filterPopMenu,
          !DeviceInfo.hasNotch() && {marginTop: hp(-14)},
          isKeyboardVisible && {marginTop: hp(-12.5)},
          isKeyboardVisible && !DeviceInfo.hasNotch() && {marginTop: hp(-14)},
        ]}>
        <MenuOption
          onSelect={() => cameraPhotoHandler()}
          children={
            <View style={styles.menuOptionChildren}>
              <CustomIcon
                type="material-icons"
                icon="add-a-photo"
                size={hp(3)}
                color={COLORS.blue}
                disabled
              />
              <TextNormal textStyle={[styles.filterPopMenuText]}>
                Photo
              </TextNormal>
            </View>
          }
          customStyles={{
            optionTouchable: {
              underlayColor: 'rgba(0, 0, 0, 0)',
            },
          }}
        />
        <MenuOption
          onSelect={() => cameraVideoHandler()}
          children={
            <View style={styles.menuOptionChildren}>
              <CustomIcon
                type="materialCommunityIcons"
                icon="video-vintage"
                size={hp(3)}
                color={COLORS.blue}
                disabled
              />
              <TextNormal textStyle={[styles.filterPopMenuText]}>
                Video
              </TextNormal>
            </View>
          }
          customStyles={{
            optionTouchable: {
              underlayColor: 'rgba(0, 0, 0, 0)',
            },
          }}
        />
      </MenuOptions>
    </Menu>
  );
};

export default AddPostMenu;

const styles = StyleSheet.create({
  filterPopMenu: {
    marginTop: hp(-10),
    width: wp(35),
    borderRadius: 5,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    paddingVertical: hp(0.4),
    borderRadius: 12,
    shadowColor: '#000000',
    borderWidth: 0.1,
    borderColor: '#CCCCCC',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  filterPopMenuText: {
    fontSize: wp(3.8),
    fontWeight: 'bold',
    marginLeft: wp(2),
    color: COLORS.blue,
  },
  menuOptionChildren: {
    paddingHorizontal: wp(3),
    width: wp(33),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
