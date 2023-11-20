import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useUser from '../../utils/hooks/useUser';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomImage from '../../components/common/CustomImage';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import usePost from '../../utils/hooks/usePost';
import SpacesItem from '../../components/common/SpacesItem';

const Spaces = ({searchText, setY}) => {
  const {user} = useUser();
  const {joinSpaces} = UseFirebaseAuth();
  const {fetchAllSpaces} = usePost();

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [spaceData, setSpaceData] = useState([]);
  const [filterData, setFilterData] = useState([]);

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

  const fetchSpacesAgain = async () => {
    setRefreshing(true);
    try {
      const res = await fetchAllSpaces();
      setSpaceData(res);
      setFilterData(res);
    } catch (err) {
      console.log({err});
    }
    setRefreshing(false);
  };

  const AddSpaces = async (spaceName, spaceId) => {
    try {
      const res = await joinSpaces(spaceName, spaceId);
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
    console.log('===>', {searchText}, {loading});
    if (loading) {
      fetchSpaces();
    } else {
      let filter = spaceData.filter(item =>
        item?._data?.spaceName.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilterData(filter);
    }
  }, [searchText]);

  const onScroll = e => {
    setY(e.nativeEvent.contentOffset.y);
  };

  return (
    <>
      <FlatList
        data={filterData}
        onScroll={onScroll}
        renderItem={({item, index}) => (
          <SpacesItem item={item} AddSpaces={AddSpaces} key={index} />
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
              <ActivityIndicator color={COLORS.grey} size="large" />
            ) : (
              <TextNormal textStyle={styles.noDataFound}>
                space not found.
              </TextNormal>
            )}
          </View>
        )}
        style={{paddingTop: hp(5)}}
        ListFooterComponent={() => <View style={{paddingBottom: hp(15)}} />}
        onRefresh={() => fetchSpacesAgain()}
        refreshing={refreshing}
      />
    </>
  );
};

export default Spaces;

const styles = StyleSheet.create({
  AllSpaces: {
    fontWeight: '700',
    fontSize: wp(5.5),
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
  marginTop: {
    marginTop: hp(2),
  },
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
});
