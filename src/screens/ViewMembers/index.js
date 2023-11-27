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
import {useRef} from 'react';

const ViewMembers = ({route}) => {
  const key = route.params.id;
  const {user} = useUser();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(true);
  const {fetchMembers} = SpacesRelatedActivity();
  const navigation = useNavigation();
  const flatListRef = useRef();

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

  const [upperBorderFlag, setUpperBorderFlag] = useState(false);
  const onScroll = e => {
    const y = e.nativeEvent.contentOffset.y;
    if (y <= 0) {
      // At the top of the FlatList
      setUpperBorderFlag(false);
    } else {
      setUpperBorderFlag(true);
    }
  };

  const scrollTopTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  return (
    <CustomWrapper containerStyle={{paddingHorizontal: 0}}>
      <ViewMembersHeader scrollToTop={scrollTopTop} />
      <View style={styles.marginTop}>
        <CustomTextInput
          placeholder="search"
          onChange={txt => setText(txt)}
          containerStyle={styles.searchContainer}
          placeholderTextColor="#B0B0B0"
          textInputStyle={{fontWeight: '400', fontSize: wp(4)}}
        />
      </View>
      <View
        style={
          upperBorderFlag
            ? styles.borderStrokeVisible
            : styles.borderStrokeNotVisible
        }
      />
      <FlatList
        data={filteredData}
        ref={flatListRef}
        ListFooterComponent={() => <View style={{paddingBottom: hp(15)}} />}
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.spaceContainer, index == 0 && {borderTopWidth: 0}]}
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
                <TextNormal
                  color={'#595959'}
                  textStyle={{fontSize: wp(3.6), paddingRight: wp(10)}}
                  numberOfLines={1}>
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
    height: 0,
    paddingVertical: wp(7),
    // height: wp(14),
  },
  marginTop: {
    marginVertical: hp(3),
    paddingHorizontal: wp(4),
  },
  borderStrokeVisible: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#CCCCCC',
  },
  borderStrokeNotVisible: {
    borderBottomWidth: 0.8,
    borderBottomColor: 'transparent',
  },

  //hERE

  spaceContainer: {
    paddingLeft: wp(6),
    paddingRight: wp(9),
    paddingVertical: hp(0.99),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.2,
    borderTopColor: '#CCCCCC',
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
    height: wp(13.8),
    aspectRatio: 1,
    borderRadius: wp(7),
  },
  Text: {
    fontSize: wp(5.8),
  },
});
