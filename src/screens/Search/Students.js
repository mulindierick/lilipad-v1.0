import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import CustomImage from '../../components/common/CustomImage';
import {TextBig} from '../../components/common/CustomText';

const Students = () => {
  return (
    <>
      <FlatList
        data={[1, 2, 3, 4]}
        style={{paddingTop: hp(2)}}
        renderItem={({item}) => (
          <View style={styles.spaceContainer}>
            <View style={styles.imageContainer}>
              <CustomImage
                resizeMode="cover"
                source={images.dummyProfilePic}
                containerStyle={styles.image}
              />
            </View>
            <TextBig textStyle={styles.Text}>Mustafa Quaid</TextBig>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(50),
            }}>
            {loading ? (
              <ActivityIndicator color={COLORS.blue} size="large" />
            ) : (
              <TextBig color={COLORS.blue}>No Data Found</TextBig>
            )}
          </View>
        )}
        ListFooterComponent={() => <View style={{paddingBottom: hp(15)}} />}
      />
    </>
  );
};

export default Students;

const styles = StyleSheet.create({
  spaceContainer: {
    marginHorizontal: wp(1),
    borderRadius: 15,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: COLORS.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#CCCCCC',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 12,
  },
  spaceContainerHeader: {
    width: wp(70),
    fontSize: wp(5.5),
  },
  peopleLengthText: {
    marginTop: hp(0.2),
    fontFamily: FONTS.Regular,
    fontWeight: '400',
  },
  image: {
    height: hp(7),
    aspectRatio: 1,
    borderRadius: hp(10),
  },
  imageContainer: {height: hp(7), aspectRatio: 1, borderRadius: wp(7)},
  Text: {
    marginLeft: wp(4),
    fontSize: wp(7),
  },
});
