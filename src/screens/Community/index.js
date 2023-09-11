import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import CommunityHeader from './CommunityHeader';
import SpacesContainer from './SpacesContainer';
import useUser from '../../utils/hooks/useUser';
import {FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import CustomImage from '../../components/common/CustomImage';
import CustomIcon from '../../components/common/CustomIcon';
import PostItem from './PostItem';
import {TouchableOpacity} from 'react-native';
import AddPostModal from './AddPostModal';
import usePost from '../../utils/hooks/usePost';
import {set} from 'react-hook-form';
import {ActivityIndicator} from 'react-native';

const Community = () => {
  const {user} = useUser();
  const [spacesIndex, setSpacesIndex] = useState(0);
  const [selectedSpaces, setSlectedSpaces] = useState(user?.spaces[0]);
  const [upperBorderFlag, setUpperBorderFlag] = useState(false);
  const {fetchPostsOfAllSpaces, fetchPostsOfSpecificSpace} = usePost();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  //The below state is used to store the data of the selected space
  const [selectedSpaceData, setSelectedSpaceData] = useState(() => {
    let obj = {};
    user?.spaces.forEach(space => {
      console.log({space});
      obj[space] = [];
    });
    return obj;
  });

  const fetchPosts = async () => {
    setLoading(true);
    const data = await fetchPostsOfAllSpaces(user?.spaces);
    setSelectedSpaceData(data);
    setLoading(false);
  };

  const fetchParticularSpacePosts = async spaceName => {
    setRefreshing(true);
    const data = await fetchPostsOfSpecificSpace(selectedSpaces);
    setSelectedSpaceData({...selectedSpaceData, [selectedSpaces]: data});
    setRefreshing(false);
  };

  useEffect(() => {
    const res = fetchPosts();
  }, []);

  const [selectedFilter, setSelectedFilter] = useState('Recent');
  const [addPostModal, setAddPostModal] = useState(false);

  return (
    <CustomWrapper containerStyle={{backgroundColor: '#F6F6F6'}}>
      <CommunityHeader
        selected={selectedFilter}
        setSelected={setSelectedFilter}
        setSpacesIndex={setSpacesIndex}
        upperBorderFlag={upperBorderFlag}
      />
      <FlatList
        data={selectedSpaceData[selectedSpaces]}
        // data={[]}
        onScroll={event => {
          event.nativeEvent.contentOffset.y > 0
            ? setUpperBorderFlag(true)
            : setUpperBorderFlag(false);
        }}
        refreshing={refreshing}
        onRefresh={() => fetchParticularSpacePosts()}
        renderItem={({item}) => <PostItem data={item} />}
        ListFooterComponent={() => <View style={{marginBottom: hp(15)}}></View>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <View>
              <SpacesContainer
                data={user?.spaces}
                selected={selectedSpaces}
                setSelected={setSlectedSpaces}
                setSpacesIndex={setSpacesIndex}
              />
            </View>
          </>
        )}
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
              <TextNormal textStyle={styles.noDataFound}>
                Nothing, Yet.
              </TextNormal>
            )}
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddPostModal(true)}
        activeOpacity={0.8}>
        <CustomImage source={images.addButton} resizeMode="cover" disabled />
      </TouchableOpacity>
      <AddPostModal
        isVisible={addPostModal}
        onBackButtonPress={() => setAddPostModal(false)}
        onBackDropPress={() => setAddPostModal(false)}
        spaceName={selectedSpaces}
      />
    </CustomWrapper>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    height: wp(15),
    width: wp(15),
    bottom: hp(16),
    right: wp(5),
  },
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
});
