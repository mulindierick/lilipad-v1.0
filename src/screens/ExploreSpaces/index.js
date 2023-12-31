import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import Header from './Header';
import CustomTextInput from '../../components/common/CustomTextInput';
import {FlatList} from 'react-native';
import {
  TextBig,
  TextBigger,
  TextNormal,
} from '../../components/common/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import CustomImage from '../../components/common/CustomImage';
import {RuleTester} from 'eslint';
import usePost from '../../utils/hooks/usePost';
import {ActivityIndicator} from 'react-native';
import useUser from '../../utils/hooks/useUser';

const ExploreSpaces = () => {
  const {user} = useUser();
  console.log({user});
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [spaceData, setSpaceData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const {fetchAllSpaces} = usePost();

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const res = await fetchAllSpaces();
      setSpaceData(res);
      setFilterData(res);
    } catch (err) {
      console.log({err});
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchSpaces();
    } else {
      let filter = spaceData.filter(item =>
        item?._data?.spaceName.toLowerCase().includes(text.toLowerCase()),
      );
      setFilterData(filter);
    }
  }, [text]);

  return (
    <CustomWrapper>
      <Header />
      <View style={styles.marginTop}>
        <CustomTextInput placeholder="Search" onChange={txt => setText(txt)} />
      </View>
      <View style={styles.marginTop}>
        <TextBig textStyle={styles.AllSpaces}>All Spaces</TextBig>
      </View>
      <FlatList
        data={filterData}
        style={{paddingTop: hp(2)}}
        renderItem={({item}) => (
          <View style={styles.spaceContainer}>
            <View>
              <TextBig
                numberOfLines={1}
                textStyle={styles.spaceContainerHeader}>
                {item?._data?.spaceName}
              </TextBig>
              <TextNormal color={'#696868'} textStyle={styles.peopleLengthText}>
                {item?._data?.members.length || 0} People
              </TextNormal>
            </View>
            <CustomImage
              source={
                user.spaces.includes(item?._data?.spaceName)
                  ? images.alreadyInGroupIcon
                  : images.joinGroupIcon
              }
              height={hp(5)}
              width={wp(8)}
              disabled
            />
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
      />
    </CustomWrapper>
  );
};

export default ExploreSpaces;

const styles = StyleSheet.create({
  AllSpaces: {
    fontWeight: '700',
    fontSize: wp(5.5),
  },
  marginTop: {
    marginTop: hp(2),
  },
  spaceContainer: {
    marginHorizontal: wp(1),
    borderRadius: 15,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: COLORS.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
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
});
