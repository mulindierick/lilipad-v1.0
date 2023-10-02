import {useState} from 'react';
import {Linking} from 'react-native';
import {Image, Video} from 'react-native-compressor';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const useImagePicker = () => {
  const [localImageUriArray, setLocalImageUriArray] = useState([]);
  const [imageModal, setImageModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const accessGallery = async (cropperCircleOverlay = true) => {
    let config = {
      forceJpg: true,
      // includeBase64: true,
      cropping: cropperCircleOverlay,
      multiple: false,
      maxFiles: 1,
      mediaType: 'any',
      cropperCircleOverlay: cropperCircleOverlay,
    };

    try {
      let res = await ImagePicker.openPicker(config);
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

  const accessCamera = async (cropperCircleOverlay = true) => {
    let config = {
      forceJpg: true,
      // includeBase64: true,
      cropping: cropperCircleOverlay,
      multiple: true,
      maxFiles: 1,
      mediaType: 'any',
      cropperCircleOverlay: cropperCircleOverlay,
    };

    try {
      let res = await ImagePicker.openCamera(config);
      let resArray = [res];
      console.log('CAmera RESSSS', resArray);
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
  };
};

export default useImagePicker;
