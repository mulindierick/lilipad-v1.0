import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';
import CustomImage from '../../components/common/CustomImage';
import CustomModal from '../../components/common/CustomModal';
import CustomVideo from '../../components/common/CustomVideo';
import AddPostHeader from '../../components/forSpecificUse/AddPostHeader';
import AddPostTextInput from '../../components/forSpecificUse/AddPostTextInput';
import {COLORS, images} from '../../utils/constants/theme';
import useImagePicker from '../../utils/hooks/useImagePicker';
import usePost from '../../utils/hooks/usePost';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import ReactNativeModal from 'react-native-modal';
import {TextNormal} from '../../components/common/CustomText';
import {UseKeyboardVisible} from 'react-native-popup-menu/src/helpers';
import AddPostMenu from './AddPostMenu';
import DeviceInfo from 'react-native-device-info';

const AddPostModal = ({
  isVisible,
  onBackButtonPress,
  onBackDropPress,
  spaceName,
  afterAddingPost,
  spaceId,
}) => {
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const {sharePost} = usePost();
  const {
    accessCamera,
    accessGallery,
    localImageUriArray,
    setLocalImageUriArray,
    videoLoader,
  } = useImagePicker();

  const cameraPhotoHandler = () => {
    accessCamera(false, 'photo');
  };

  const cameraVideoHandler = () => {
    accessCamera(false, 'video');
  };

  const galleryHandler = () => {
    accessGallery(false, 'any');
  };

  const addPostOnFirebase = async spaceName => {
    Keyboard.dismiss();
    setTimeout(() => {
      onBackDropPress();
    }, 150);
    setLoader(true);
    let data = {};

    if (localImageUriArray.length > 0) {
      if (localImageUriArray[0]?.mime.includes('video')) {
        data = {
          text: text.trim(),
          video: localImageUriArray[0]?.path,
        };
      } else {
        data = {
          text: text.trim(),
          image:
            localImageUriArray.length > 0 ? localImageUriArray[0]?.path : null,
        };
      }
    } else {
      data = {
        text: text.trim(),
      };
    }

    try {
      const res = await sharePost(spaceName, data, spaceId);
      afterAddingPost();
      setText('');
      setLocalImageUriArray([]);
      // showToast('success', 'Post Shared Successfully!');
    } catch (error) {
      // showToast('error', 'Something Went Wrong, Please Try Again!');
      console.log({error});
    }
    setLoader(false);
  };

  const handleClosureOfModal = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      onBackDropPress();
      setText('');
      setLocalImageUriArray([]);
    }, 150);
  };

  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={() => handleClosureOfModal()}
      onBackdropPress={() => handleClosureOfModal()}>
      <MenuProvider skipInstanceCheck style={styles.modalContainer}>
        {/* <BlurView style={styles.BlurView} blurType="extraDark" blurAmount={2.5}> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <AddPostHeader
              onIconPress={() => handleClosureOfModal()}
              onPressShare={loader ? null : () => addPostOnFirebase(spaceName)}
              disabled={!localImageUriArray.length > 0 && !text.trim()}
            />
            <AddPostTextInput setText={setText} text={text} />
            {videoLoader && (
              <View>
                <TouchableOpacity
                  style={styles.removeIconContainer}
                  activeOpacity={1}
                  onPress={() => setLocalImageUriArray([])}>
                  <CustomIcon
                    type="ionicons"
                    icon="close"
                    size={wp(6)}
                    color={'#B0B0B0'}
                    disabled
                  />
                </TouchableOpacity>
                <View style={styles.ShadowImageContainer}>
                  <CustomVideo
                    uri={null}
                    containerStyle={[
                      styles.imageContainer,
                      {height: hp(25), width: wp(86)},
                    ]}
                  />
                </View>
              </View>
            )}
            {!localImageUriArray.length >
            0 ? null : localImageUriArray[0]?.mime.includes('video') ? (
              <View>
                <TouchableOpacity
                  style={styles.removeIconContainer}
                  activeOpacity={1}
                  onPress={() => setLocalImageUriArray([])}>
                  <CustomIcon
                    type="ionicons"
                    icon="close"
                    size={wp(6)}
                    color={'#B0B0B0'}
                    disabled
                  />
                </TouchableOpacity>
                <View style={styles.ShadowImageContainer}>
                  <CustomVideo
                    uri={localImageUriArray[0].path || null}
                    containerStyle={[
                      styles.imageContainer,
                      {height: hp(25), width: wp(86)},
                    ]}
                  />
                </View>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.removeIconContainer}
                  activeOpacity={1}
                  onPress={() => setLocalImageUriArray([])}>
                  <CustomIcon
                    type="ionicons"
                    icon="close"
                    size={wp(6)}
                    color={'#B0B0B0'}
                    disabled
                  />
                </TouchableOpacity>
                <View style={styles.ShadowImageContainer}>
                  <CustomImage
                    source={{
                      uri: localImageUriArray[0]?.path,
                    }}
                    height={hp(25)}
                    width={wp(86)}
                    resizeMode="cover"
                    containerStyle={styles.imageContainer}
                    removeIcon
                    onPressRemoveIcon={() => setLocalImageUriArray([])}
                  />
                </View>
              </View>
            )}
            <KeyboardAvoidingView
              style={styles.footer}
              behavior="padding"
              keyboardVerticalOffset={Platform.select({
                ios: () => hp(10),
                android: () => 0,
              })()}>
              <CustomImage
                source={images.image}
                resizeMode="contain"
                height={hp(4.7)}
                width={wp(10.5)}
                containerStyle={{marginRight: wp(7)}}
                onPressImage={() => galleryHandler()}
              />
              <AddPostMenu
                cameraPhotoHandler={cameraPhotoHandler}
                cameraVideoHandler={cameraVideoHandler}
              />
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
        {/* </BlurView> */}
      </MenuProvider>
    </CustomModal>
  );
};

export default AddPostModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
  container: {
    backgroundColor: COLORS.white,
    height: hp(92),
    width: wp(100),
    paddingHorizontal: wp(5),
    borderTopLeftRadius: wp(7),
    borderTopRightRadius: wp(7),
  },
  imageContainer: {
    backgroundColor: COLORS.backgroundColor,
    marginTop: hp(1),
    borderRadius: 6,
  },
  ShadowImageContainer: {
    marginTop: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 12,
  },
  footer: {
    // backgroundColor: COLORS.blue,
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp(8),
    right: 0,
  },
  removeIconContainer: {
    position: 'absolute',
    right: -4,
    top: 0,
    backgroundColor: COLORS.backgroundColor,
    height: wp(8),
    aspectRatio: 1,
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: '#B0B0B0',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
