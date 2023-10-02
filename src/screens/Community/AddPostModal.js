import React, {useState} from 'react';
import {
  Keyboard,
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
import AddPostHeader from '../../components/forSpecificUse/AddPostHeader';
import AddPostTextInput from '../../components/forSpecificUse/AddPostTextInput';
import {COLORS, images} from '../../utils/constants/theme';
import useImagePicker from '../../utils/hooks/useImagePicker';
import usePost from '../../utils/hooks/usePost';
import Video from 'react-native-video';
import {database} from 'firebase-functions/v1/firestore';
import CustomVideo from '../../components/common/CustomVideo';

const AddPostModal = ({
  isVisible,
  onBackButtonPress,
  onBackDropPress,
  spaceName,
}) => {
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const {sharePost} = usePost();
  const {
    accessCamera,
    accessGallery,
    localImageUriArray,
    setLocalImageUriArray,
  } = useImagePicker();

  const cameraHandler = () => {
    accessCamera(false);
  };

  const galleryHandler = () => {
    accessGallery(false);
  };

  const addPostOnFirebase = async spaceName => {
    onBackDropPress();
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
      const res = await sharePost(spaceName, data);
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
    onBackDropPress();
    setText('');
    setLocalImageUriArray([]);
  };

  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={() => handleClosureOfModal()}
      onBackdropPress={() => handleClosureOfModal()}>
      {/* <BlurView style={styles.BlurView} blurType="extraDark" blurAmount={2.5}> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <AddPostHeader
            onIconPress={() => handleClosureOfModal()}
            onPressShare={() => addPostOnFirebase(spaceName)}
            disabled={!localImageUriArray.length > 0 && !text.trim()}
          />
          <AddPostTextInput setText={setText} text={text} />
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
                  uri={localImageUriArray[0].path}
                  containerStyle={[
                    styles.imageContainer,
                    {height: hp(25), width: wp(86)},
                  ]}
                />
                {/* <CustomImage
                    source={{
                      uri: localImageUriArray[0]?.path,
                    }}
                    height={hp(25)}
                    width={wp(86)}
                    resizeMode="cover"
                    containerStyle={styles.imageContainer}
                    removeIcon
                    onPressRemoveIcon={() => setLocalImageUriArray([])}
                  /> */}
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
          <View style={styles.footer}>
            <CustomImage
              source={images.image}
              resizeMode="cover"
              height={hp(4.7)}
              width={wp(10.5)}
              containerStyle={{marginRight: wp(10)}}
              onPressImage={() => galleryHandler()}
            />

            <CustomImage
              source={images.camera}
              resizeMode="cover"
              height={hp(4.5)}
              width={wp(11)}
              containerStyle={{marginRight: wp(7)}}
              onPressImage={() => cameraHandler()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* </BlurView> */}
    </CustomModal>
  );
};

export default AddPostModal;

const styles = StyleSheet.create({
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
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    bottom: hp(8),
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
