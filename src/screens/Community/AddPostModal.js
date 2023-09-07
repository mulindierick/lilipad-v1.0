import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
import {showToast} from '../../utils/constants/helper';
import {set} from 'react-hook-form';

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
    setLoader(true);
    try {
      const res = await sharePost(spaceName, {
        text: text,
        image:
          localImageUriArray.length > 0 ? localImageUriArray[0]?.image : null,
      });
      onBackDropPress();
      setText('');
      setLocalImageUriArray([]);
      showToast('success', 'Post Shared Successfully!');
    } catch (error) {
      showToast('error', 'Something Went Wrong, Please Try Again!');
    }
    setLoader(false);
  };

  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackDropPress}>
      <View style={styles.container}>
        <AddPostHeader
          onIconPress={onBackButtonPress}
          onPressShare={() => addPostOnFirebase(spaceName)}
        />
        <AddPostTextInput setText={setText} text={text} />
        {localImageUriArray.length > 0 ? (
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
                  uri: localImageUriArray[0]?.image,
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
        ) : null}
        <View style={styles.footer}>
          <CustomImage
            source={images.image}
            resizeMode="cover"
            height={hp(4)}
            width={wp(8.9)}
            containerStyle={{marginRight: wp(7)}}
            onPressImage={() => galleryHandler()}
          />

          <CustomImage
            source={images.camera}
            resizeMode="cover"
            height={hp(4)}
            width={wp(8.9)}
            onPressImage={() => cameraHandler()}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default AddPostModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    height: hp(92),
    width: wp(100),
    paddingHorizontal: wp(5),
    borderTopLeftRadius: wp(7),
    borderTopRightRadius: wp(7),
  },
  imageContainer: {
    backgroundColor: COLORS.backgroundColor,
    marginTop: hp(1),
    borderRadius: 10,
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
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 12,
  },
  footer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    bottom: hp(10),
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
