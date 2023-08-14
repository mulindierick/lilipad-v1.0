import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, images} from '../../utils/constants/theme';

const Auth = ({navigation}) => {
  return (
    <CustomWrapper>
      <View style={styles.container}>
        <CustomImage
          source={images.bigAppIcon}
          height={hp(30)}
          width={wp(100)}
        />
        <CustomButton
          title="Join"
          bigText
          onPress={() => navigation.navigate('EmailAuth')}
        />
        <TextNormal color={COLORS.grey}>
          A Project By
          <TextNormal italic color={COLORS.grey}>
            {' '}
            Lili
          </TextNormal>
        </TextNormal>
      </View>
    </CustomWrapper>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(13),
    justifyContent: 'space-between',
    marginBottom: hp(13),
  },
});
