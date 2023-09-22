import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextBig} from '../../components/common/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput';
import SpacesItem from '../../components/common/SpacesItem';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS} from '../../utils/constants/theme';
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
          <SpacesItem item={item} AddSpaces={AddSpaces} />
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
  searchContainer: {
    backgroundColor: '#E4E4E4',
  },
  marginTop: {
    marginTop: hp(2),
  },
});
