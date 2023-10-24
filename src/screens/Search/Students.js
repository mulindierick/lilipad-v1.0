import algoliasearch from 'algoliasearch/lite';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextBig} from '../../components/common/CustomText';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import StudentsItem from './StudentsItem';
import useUser from '../../utils/hooks/useUser';

const ALGOLIA_APP_ID = 'VGYLBZ9NVP';
const ALGOLIA_API_KEY = '557b30279ba11eb89ecb208ab50ed432';
const ALGOLIA_INDEX_NAME = 'fullName';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const searchIndex = searchClient.initIndex(ALGOLIA_INDEX_NAME);

const Students = ({searchText}) => {
  const {user} = useUser();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Example: 'status:active'
      const whereCondition = `college: "${user?.college}"`;
      // Use the filters parameter to apply the where condition
      const {hits} = await searchIndex.search(searchText, {
        // filters: whereCondition,
      });
      setResults(hits);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      handleSearch();
    } else {
      setResults([]);
    }
    console.log({searchText});
  }, [searchText]);

  return (
    <>
      <FlatList
        data={results}
        style={{paddingTop: hp(2)}}
        refreshing={isLoading}
        renderItem={({item}) => {
          return <StudentsItem item={item} key={item.objectID} />;
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
              <TextBig color={COLORS.grey}>Nothing, Yet!</TextBig>
            ) : null}
          </View>
        )}
        ListFooterComponent={() => <View style={{paddingBottom: hp(15)}} />}
      />
    </>
  );
};

export default Students;

const styles = StyleSheet.create({});
