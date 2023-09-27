import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useImagePicker from '../../utils/hooks/useImagePicker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {images} from '../../utils/constants/theme';
import CustomImagePickerModal from '../../components/common/CustomImagePickerModal';
import {
  TextBig,
  TextBigger,
  TextNormal,
} from '../../components/common/CustomText';
import useUser from '../../utils/hooks/useUser';

const ListHeaderItem = ({user}) => {
  const {
    accessCamera,
    accessGallery,
    localImageUriArray,
    setLocalImageUriArray,
  } = useImagePicker();
  const [imageModal, setImageModal] = useState(false);

  const cameraHandler = () => {
    setImageModal(false);
    setTimeout(() => {
      accessCamera();
    }, 500);
  };

  const galleryHandler = () => {
    setImageModal(false);
    setTimeout(() => {
      accessGallery();
    }, 500);
  };

  const {updateProfilePhoto} = useUser();
  const updatePhoto = async () => {
    const res = await updateProfilePhoto(localImageUriArray[0]?.image);
    setLocalImageUriArray([]);
  };

  useEffect(() => {
    if (localImageUriArray.length > 0) {
      updateProfilePhoto(localImageUriArray[0]?.image);
    }
  }, [localImageUriArray.length]);

  return (
    <View>
      <View style={styles.imageContainer}>
        <CustomImage
          source={{
            uri:
              localImageUriArray.length > 0
                ? localImageUriArray[0]?.image
                : user?.photo,
          }}
          containerStyle={styles.innerImageContainer}
          resizeMode="cover"
        />
        <CustomImage
          source={images.cameraIcon}
          resizeMode="cover"
          containerStyle={styles.iconContainer}
          height={hp(4.5)}
          width={hp(4.5)}
          onPressImage={() => setImageModal(true)}
        />
      </View>
      <CustomImagePickerModal
        showModal={imageModal}
        onPressCamera={cameraHandler}
        onPressGallery={galleryHandler}
        onBackButtonPress={() => setImageModal(false)}
        onBackdropPress={() => setImageModal(false)}
      />
      <View style={styles.userDetail}>
        <TextBigger textStyle={{fontSize: wp(7)}}>
          {user?.firstName + ' ' + user?.lastName}
        </TextBigger>
        <TextBig
          textStyle={[styles.classInformation, {marginTop: hp(1.3)}]}
          color={'rgba(21, 19, 19, 0.69)'}>
          {user?.classYear}
        </TextBig>
        <TextBig
          textStyle={styles.classInformation}
          color={'rgba(21, 19, 19, 0.69)'}>
          {user?.major}
        </TextBig>
      </View>
      <TextNormal textStyle={styles.postsTitle}>
        {user?.firstName + `'s` + ' Posts'}
      </TextNormal>
    </View>
  );
};

export default ListHeaderItem;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: hp(2),
    height: hp(20),
    aspectRatio: 1,
    borderRadius: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 12,
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: 25,
    bottom: 0,
    borderRadius: 100,
    zIndex: 1000,
  },
  innerImageContainer: {
    height: hp(13),
    aspectRatio: 1,
    borderRadius: hp(10),
  },
  userDetail: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  classInformation: {
    fontSize: wp(4.5),
    fontWeight: '500',
  },
  postsTitle: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginTop: hp(2),
    marginBottom: hp(1),
  },
});
