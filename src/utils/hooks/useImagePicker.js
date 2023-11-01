import {useState} from 'react';
import {Alert, Linking} from 'react-native';
import {Image, Video} from 'react-native-compressor';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const useImagePicker = () => {
  const [localImageUriArray, setLocalImageUriArray] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);

  const [loading, setLoading] = useState(false);

  const accessGallery = async (
    cropperCircleOverlay = true,
    mediaType = 'any',
  ) => {
    let config = {
      forceJpg: true,
      // includeBase64: true,
      cropping: cropperCircleOverlay,
      multiple: false,
      maxFiles: 1,
      mediaType: mediaType,
      cropperCircleOverlay: cropperCircleOverlay,
    };

    try {
      var maxFileSizeInBytes = 50 * 1048576; // 50MB in bytes
      let res = await ImagePicker.openPicker(config);
      console.log({res});
      if (res.size > maxFileSizeInBytes) {
        Alert.alert(
          'File Size Exceeded',
          'Please select a file with size less than 50MB',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
        );
        return;
      }
      console.log({res});
      res = [res];
      res = res.map(it => ({
        data: it.data,
        height: it.height,
        width: it.width,
        filename: it.filename,
        mime: it.mime,
        path: it.path,
        image: it.path,
        success: false,
        error: false,
      }));
      let compressedImage = await compressSingleImage(res);
      setLocalImageUriArray(compressedImage);
    } catch (err) {
      console.log(err.message);
      if (err?.message?.includes('permission')) {
        Toast.show({
          type: 'error',
          text1: 'Gallery Permision Not Given',
        });
        setTimeout(() => {
          Linking.openSettings();
        }, 2000);
      } else if (err.message === 'User cancelled image selection') {
        // Handle the case where the user cancels image selection
        // setLoading(false)
      }
    }
  };

  const accessCamera = async (
    cropperCircleOverlay = true,
    mediaType = 'any',
  ) => {
    let config = {
      forceJpg: true,
      // includeBase64: true,
      cropping: cropperCircleOverlay,
      maxFiles: 1,
      mediaType: mediaType,
      cropperCircleOverlay: cropperCircleOverlay,
    };

    try {
      let res = await ImagePicker.openCamera(config);
      if (res.mime.includes('video')) {
        setVideoLoader(true);
      }
      var maxFileSizeInBytes = 50 * 1048576; // 50MB in bytes
      if (res.size > maxFileSizeInBytes) {
        Alert.alert(
          'File Size Exceeded',
          'Please select a file with size less than 50MB',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
        );
        setVideoLoader(false);
        return;
      }

      let resArray = [res];
      resArray = resArray.map(it => ({
        data: it.data,
        height: it.height,
        width: it.width,
        filename: it.filename,
        mime: it.mime,
        path: it.path,
        image: it.path,
        success: false,
        error: false,
      }));

      let compressedImage = await compressImageSize(resArray[0]);
      setLocalImageUriArray([compressedImage]);
      setVideoLoader(false);
    } catch (error) {
      console.log(error.message);
      if (error?.message?.includes('permission')) {
        Toast.show({
          type: 'error',
          text1: 'Camera Permision Not Given',
        });
        setTimeout(() => {
          Linking.openSettings();
        }, 1500);
      } else if (error.message == 'User cancelled image selection') {
        // Handle the case where the user cancels image selection
        // setLoading(false)
      }
    }
  };

  const compressSingleImage = async imageUrls => {
    const compressedImages = [];

    await Promise.all(
      imageUrls.map(async imageUrl => {
        const compressedImage = await compressImageSize(imageUrl);
        compressedImages.push(compressedImage);
      }),
    );
    console.log({compressedImages});
    return compressedImages;
  };

  const compressImageSize = async (image, imageBuffer = false) => {
    try {
      const {path, uri, mime} = image;
      console.log({image});
      let result = null;
      if (mime.includes('video')) {
        result = await Video.compress(path || uri, {
          quality: 0.8,
          compressionMethod: 'auto',
        });
      } else {
        result = await Image.compress(path || uri, {
          quality: 0.8,
          compressionMethod: 'auto',
        });
      }

      let data = {
        ...image,
        path: result,
      };
      // return {};
      return data;
    } catch (error) {
      console.log('ERROR COMPRESSING', error);
      return {
        error: true,
        message: error?.message,
      };
    }
  };

  return {
    accessGallery,
    accessCamera,
    setLocalImageUriArray,
    localImageUriArray,
    loading,
    setImageModal,
    imageModal,
    videoLoader,
  };
};

export default useImagePicker;
