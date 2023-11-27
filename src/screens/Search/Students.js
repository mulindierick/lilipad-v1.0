import algoliasearch from 'algoliasearch/lite';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import StudentsItem from './StudentsItem';
import useUser from '../../utils/hooks/useUser';
import usePost from '../../utils/hooks/usePost';
import {set} from 'lodash';

// const ALGOLIA_APP_ID = 'VGYLBZ9NVP';
// const ALGOLIA_API_KEY = '557b30279ba11eb89ecb208ab50ed432';
// const ALGOLIA_INDEX_NAME = 'fullName';

// const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
// const searchIndex = searchClient.initIndex(ALGOLIA_INDEX_NAME);

const Students = ({searchText, setY}) => {
  const {user} = useUser();
  const [results, setResults] = useState([]);
  const [pureData, setPureData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {fetchAllStudents} = usePost();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Algolia Search

      // Example: 'status:active'
      // const whereCondition = `college:${user?.college}`;
      // Use the filters parameter to apply the where condition
      // const {hits} = await searchIndex.search(searchText, {
      //   // filters: whereCondition,
      // });
      // console.log({hits});
      // setResults(hits);

      // Normal Search
      const students = await fetchAllStudents();
      console.log({students});
      setPureData(students);
      if (searchText) {
        const filteredData = students.filter(item =>
          item.fullName.toLowerCase().includes(searchText.toLowerCase()),
        );
        setFilterData(filteredData);
      } else {
        setFilterData(students);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterDataBySearch = () => {
    if (searchText) {
      const filteredData = pureData.filter(item =>
        item._data?.fullName.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilterData(filteredData);
    } else {
      setFilterData(pureData);
    }
  };

  useEffect(() => {
    if (searchText) {
      filterDataBySearch();
    } else {
      setResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    handleSearch();
  }, []);

  const onScroll = e => {
    setY(e.nativeEvent.contentOffset.y);
  };

  return (
    <>
      <FlatList
        data={filterData}
        refreshing={isLoading}
        onScroll={onScroll}
        renderItem={({item, index}) => {
          return item?._data?.fullName ? (
            <StudentsItem
              item={item?._data}
              key={item._data?.firebaseUserId}
              index={index}
            />
          ) : null;
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(50),
            }}>
            {!isLoading ? (
              <TextNormal textStyle={styles.noDataFound}>
                student not found.
              </TextNormal>
            ) : null}
          </View>
        )}
        style={{paddingTop: hp(23.5)}}
        ListFooterComponent={() => <View style={{paddingBottom: hp(50)}} />}
        onEndReachedThreshold={0.1}
      />
    </>
  );
};

export default Students;

const styles = StyleSheet.create({
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
});
