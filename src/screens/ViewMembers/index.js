import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import ViewMembersHeader from './ViewMembersHeader';
import SpacesRelatedActivity from '../../utils/hooks/SpacesRelatedActivity';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomTextInput from '../../components/common/CustomTextInput';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import CustomImage from '../../components/common/CustomImage';
import {TextBig, TextNormal} from '../../components/common/CustomText';

const ViewMembers = ({route}) => {
  const key = route.params.id;
  const [data, setData] = useState([]);
  const {fetchMembers} = SpacesRelatedActivity();

  const fetchMembersData = async () => {
    try {
      let res = await fetchMembers(key);
      console.log('HEREE=>>', {res});
      setData(res);
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    fetchMembersData();
  }, []);

  return (
    <CustomWrapper containerStyle={{paddingHorizontal: 0}}>
      <ViewMembersHeader />
      <View style={styles.marginTop}>
        <CustomTextInput
          placeholder="Search"
          onChange={txt => setText(txt)}
          containerStyle={styles.searchContainer}
          placeholderTextColor="#B0B0B0"
        />
      </View>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[
                styles.spaceContainer,
                index != 0 && {
                  borderTopWidth: 0.2,
                  borderTopColor: '#CCCCCC',
                },
              ]}
              activeOpacity={1}
              onPress={() => handleNavigation()}>
              <View style={[styles.imageContainer]}>
                <CustomImage
                  resizeMode="cover"
                  source={
                    item?.photo
                      ? {
                          uri: item.photo,
                        }
                      : images.dummyProfilePic
                  }
                  containerStyle={styles.image}
                />
              </View>
              <View style={{alignItems: 'flex-start', marginLeft: wp(4)}}>
                <TextBig textStyle={styles.Text}>{item?.fullName}</TextBig>
                <TextNormal color={'#595959'}>
                  {item?.classYear + ' | ' + item?.major}
                </TextNormal>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </CustomWrapper>
  );
};

export default ViewMembers;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#E4E4E4',
    borderRadius: wp(4),
  },
  marginTop: {
    marginVertical: hp(3),
    marginHorizontal: wp(4),
  },

  //hERE

  spaceContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
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
  imageContainer: {
    height: hp(7),
    aspectRatio: 1,
    borderRadius: wp(7),
  },
  Text: {
    fontSize: wp(7),
  },
});
