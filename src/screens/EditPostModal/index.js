import React, {useState} from 'react';
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
import CustomModal from '../../components/common/CustomModal';
import usePost from '../../utils/hooks/usePost';
import useImagePicker from '../../utils/hooks/useImagePicker';
import AddPostHeader from '../../components/forSpecificUse/AddPostHeader';
import CustomVideo from '../../components/common/CustomVideo';
import CustomIcon from '../../components/common/CustomIcon';
import CustomImage from '../../components/common/CustomImage';
import {COLORS, images} from '../../utils/constants/theme';
import {MenuProvider} from 'react-native-popup-menu';
import AddPostMenu from '../Community/AddPostMenu';
import AddPostTextInput from '../../components/forSpecificUse/AddPostTextInput';
import {useFocusEffect} from '@react-navigation/native';

const EditPostModal = ({
  isVisible,
  onBackButtonPress,
  onBackDropPress,
  spaceName,
  afterEditingPost,
  data,
}) => {
  const spaceId = data?.spaceId;
  const postId = data?.postId;
  const [text, setText] = useState(data?.text);
  const [image, setImage] = useState(data?.postPhoto);
  const [video, setVideo] = useState(data?.postVideo);
  const [loader, setLoader] = useState(false);
  const {EditPost} = usePost();
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

  const EditPostOnFirebase = async () => {
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
      const res = await EditPost(spaceId, data, postId, image, video);
      afterEditingPost();
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
    }, 150);
  };

  // Store the initial state when the component mounts
  const initialData = {
    text: data?.text,
    image: data?.postPhoto,
    video: data?.postVideo,
  };

  // Track if the data has been modified
  const isDataModified =
    (text.trim() !== '' && text !== initialData.text) ||
    (localImageUriArray.length > 0 && text.trim() === '') ||
    (localImageUriArray.length > 0 && image !== initialData.image) ||
    (localImageUriArray.length > 0 && video !== initialData.video) ||
    (image === null && initialData.image !== null) ||
    (video === null && initialData.video !== null) ||
    (localImageUriArray.length > 0 && !initialData.image && !initialData.video);

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
              onPressShare={loader ? null : () => EditPostOnFirebase(spaceName)}
              disabled={!isDataModified}
              title="Edit"
            />
            <AddPostTextInput
              setText={setText}
              text={text}
              placeholderIncludes={spaceName}
            />

            {/* Uploaded Post Content*/}
            {image ? (
              <View>
                <TouchableOpacity
                  style={styles.removeIconContainer}
                  activeOpacity={1}
                  onPress={() => setImage(null)}>
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
                      uri: image,
                    }}
                    height={hp(25)}
                    width={wp(86)}
                    resizeMode="cover"
                    containerStyle={styles.imageContainer}
                    removeIcon
                    onPressRemoveIcon={() => setImage(null)}
                  />
                </View>
              </View>
            ) : video ? (
              <View>
                <TouchableOpacity
                  style={styles.removeIconContainer}
                  activeOpacity={1}
                  onPress={() => setVideo(null)}>
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
                    uri={video || null}
                    containerStyle={[
                      styles.imageContainer,
                      {height: hp(25), width: wp(86)},
                    ]}
                  />
                </View>
              </View>
            ) : null}

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

export default EditPostModal;

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
