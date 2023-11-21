import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput';
import SpacesItem from '../../components/common/SpacesItem';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, FONTS} from '../../utils/constants/theme';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import usePost from '../../utils/hooks/usePost';
import useUser from '../../utils/hooks/useUser';
import Header from './Header';
import {MyContext} from '../../context/Context';

const ExploreSpaces = () => {
  const {user} = useUser();
  const {joinSpaces} = UseFirebaseAuth();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [spaceData, setSpaceData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const {fetchAllSpaces, fetchFilteredSpaces} = usePost();

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
    const Data = {
      'All Spaces': 'allSpaces',
      'My Spaces': 'mySpaces',
      Living: 'living',
      Other: 'others',
      Activities: 'activities',
      Academics: 'academic',
      'User-Created': 'userCreated',
    };

    setRefreshing(true);
    try {
      const res = await fetchFilteredSpaces(Data[selectedFilter]);
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
    if (loading) {
      fetchSpaces();
    } else {
      let filter = spaceData.filter(item =>
        item?._data?.spaceName.toLowerCase().includes(text.toLowerCase()),
      );
      setFilterData(filter);
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

  const {ExploreSpacesFlatListRef} = useContext(MyContext);
  const [selectedFilter, setSelectedFilter] = useState('All Spaces');

  useEffect(() => {
    if (selectedFilter == 'All Spaces') {
      fetchSpaces();
    } else {
      fetchSpacesAgain();
    }
  }, [selectedFilter]);

  return (
    <CustomWrapper containerStyle={{paddingHorizontal: 0}}>
      <Header
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <View style={styles.marginTop}>
        <CustomTextInput
          placeholder="search"
          onChange={txt => setText(txt)}
          containerStyle={styles.searchContainer}
        />
      </View>
      <View
        style={[
          styles.marginTop,
          upperBorderFlag && {
            borderBottomWidth: 0.4,
            borderBottomColor: '#B0B0B0',
          },
        ]}>
        <TextBig textStyle={[styles.AllSpaces, {marginHorizontal: wp(4)}]}>
          {selectedFilter}
        </TextBig>
      </View>
      <FlatList
        data={filterData}
        ref={ExploreSpacesFlatListRef}
        disableVirtualization={true}
        style={{position: 'relative', zIndex: -1}}
        onScroll={onScroll}
        renderItem={({item, index}) => (
          <SpacesItem
            item={item}
            AddSpaces={AddSpaces}
            index={index}
            key={item._data?.spaceId}
          />
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
        ListFooterComponent={() => <View style={{paddingBottom: hp(20)}} />}
        refreshing={refreshing}
        onRefresh={() => fetchSpacesAgain()}
      />
    </CustomWrapper>
  );
};

export default ExploreSpaces;

const styles = StyleSheet.create({
  AllSpaces: {
    fontWeight: '700',
    fontSize: wp(5.5),
    paddingBottom: hp(1),
  },
  searchContainer: {
    width: wp(92),
    alignSelf: 'center',
  },
  marginTop: {
    position: 'relative',
    zIndex: -1,
    marginTop: hp(2),
    borderBottomWidth: 0.4,
    borderBottomColor: 'transparent',
  },
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
});
