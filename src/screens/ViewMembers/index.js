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
import useUser from '../../utils/hooks/useUser';
import {useNavigation} from '@react-navigation/native';
import CustomLoader from '../../components/common/CustomLoader';

const ViewMembers = ({route}) => {
  const key = route.params.id;
  const {user} = useUser();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(true);
  const {fetchMembers} = SpacesRelatedActivity();
  const navigation = useNavigation();

  const handleNavigation = data => {
    if (data?.firebaseUserId == user?.firebaseUserId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DifferentUserProfile', {uid: data?.firebaseUserId});
    }
  };

  const fetchMembersData = async () => {
    setLoader(true);
    try {
      let res = await fetchMembers(key);
      console.log('HEREE=>>', {res});
      setData(res);
      setFilteredData(res);
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
  };

  const filteredDataFunction = () => {
    let filtered = data.filter(item =>
      item.fullName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchMembersData();
  }, []);

  useEffect(() => {
    if (text == '') {
      setFilteredData(data);
    } else {
      filteredDataFunction();
    }
  }, [text]);

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
        data={filteredData}
        ListFooterComponent={() => <View style={{paddingBottom: hp(15)}} />}
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
              key={item?.firebaseUserId}
              onPress={() => handleNavigation(item)}>
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
        refreshing={loader}
        onRefresh={() => fetchMembersData()}
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