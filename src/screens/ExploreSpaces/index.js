import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import usePost from '../../utils/hooks/usePost';
import useUser from '../../utils/hooks/useUser';
import Header from './Header';

const ExploreSpaces = () => {
  const {user} = useUser();
  const {joinSpaces} = UseFirebaseAuth();
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

  const AddSpaces = async spaceName => {
    try {
      const res = await joinSpaces(spaceName);
      if (res === 'Success') {
        const changeData = filterData.map(item =>
          item?._data?.spaceName === spaceName
            ? {
                ...item,
                _data: {
                  ...item._data,
                  members: [...item._data.members, user?.firebaseUserId],
                },
              }
            : item,
        );
        setFilterData(changeData);
      }
      console.log({res});
    } catch (err) {
      console.log({err});
    }
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
        <CustomTextInput
          placeholder="Search"
          onChange={txt => setText(txt)}
          containerStyle={styles.searchContainer}
          placeholderTextColor="#575757"
        />
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
              disabled={user.spaces.includes(item?._data?.spaceName)}
              onPressImage={() => AddSpaces(item?._data?.spaceName)}
              height={hp(5)}
              width={wp(8)}
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
        ListFooterComponent={() => <View style={{paddingBottom: hp(15)}} />}
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
  searchContainer: {
    backgroundColor: '#E4E4E4',
  },
});
