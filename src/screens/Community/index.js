import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {PlusSVG} from '../../components/common/CustomSvgItems';
import {TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {MyContext} from '../../context/Context';
import {COLORS, FONTS} from '../../utils/constants/theme';
import usePost from '../../utils/hooks/usePost';
import useUser from '../../utils/hooks/useUser';
import AddPostModal from './AddPostModal';
import CommunityHeader from './CommunityHeader';
import PostItem from './PostItem';
import SpacesContainer from './SpacesContainer';
import WelcomeNoteModal from './WelcomeNoteModal';
import {setPostId} from '../../redux/reducers/generalSlice';
import {useDispatch} from 'react-redux';

const headerHeight = hp(20);
let scrollValue = 0;
let headerVisible = true;
let focused = false;

const Community = () => {
  const dispatch = useDispatch();
  const {user, general, setFirstTimeLoginStatus} = useUser();
  const {fetchPostsOfAllSpaces, fetchPostsOfSpecificSpace} = usePost();
  const {PostFlatListRef} = useContext(MyContext);
  // useReducer
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [upperBorderFlag, setUpperBorderFlag] = useState(false);
  const [selectedSpaces, setSlectedSpaces] = useState(user?.spaces[0]);
  const [selectedFilter, setSelectedFilter] = useState('Recent');
  const [addPostModal, setAddPostModal] = useState(false);

  // The below state is used to store the data of the selected space
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
    setSelectedSpaceData({...selectedSpaceData, [selectedSpaces]: []});
    setSelectedSpaceData({...selectedSpaceData, [selectedSpaces]: data});
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (general?.postId) {
      const findIndex = selectedSpaceData[selectedSpaces].findIndex(item => {
        return item?.postId === general?.postId;
      });
      if (findIndex >= 0) {
        let temp = [...selectedSpaceData[general?.spaceName]];
        console.log({temp});
        temp[findIndex].likesCount = general?.likeCount;
        temp[findIndex].commentsCount = general?.commentCount;
        temp[findIndex].userLiked = general?.userLiked;
        setSelectedSpaceData({...selectedSpaceData, [selectedSpaces]: temp});
      }
    }
  }, [general?.postId]);
  // For Animation

  const animation = useRef(new Animated.Value(1)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, headerHeight / 2 - 2],
  });
  const inputTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [headerHeight / 4, 0],
  });
  const opacity = animation;
  const onScroll = e => {
    if (focused) return;
    const y = e.nativeEvent.contentOffset.y;

    if (y > scrollValue && headerVisible && y > headerHeight / 2) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = false;
      setUpperBorderFlag(true);
    }
    if (y < scrollValue && !headerVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = true;
      setUpperBorderFlag(false);
    }
    scrollValue = y;
  };

  return (
    <CustomWrapper containerStyle={{backgroundColor: '#F6F6F6'}}>
      <CommunityHeader
        selected={selectedFilter}
        setSelected={setSelectedFilter}
        upperBorderFlag={upperBorderFlag}
      />

      <Animated.View
        style={[styles.spaceContainer, {transform: [{translateY}]}]}>
        <Animated.View
          style={[
            styles.spaceNestedContainer,
            {opacity, transform: [{translateY: inputTranslateY}]},
          ]}>
          <SpacesContainer
            data={user?.spaces}
            selected={selectedSpaces}
            setSelected={setSlectedSpaces}
          />
        </Animated.View>
      </Animated.View>

      <FlatList
        ref={PostFlatListRef}
        persistentScrollbar={true}
        keyExtractor={(item, index) => index.toString()}
        data={selectedSpaceData[selectedSpaces]}
        onScroll={onScroll}
        refreshControl={
          <RefreshControl
            tintColor={COLORS.grey}
            refreshing={refreshing}
            onRefresh={() => fetchParticularSpacePosts()}
            enabled={true}
            progressViewOffset={hp(10)}
          />
        }
        renderItem={({item}) => <PostItem data={item} />}
        ListFooterComponent={() => (
          <View style={{paddingBottom: hp(30)}}></View>
        )}
        showsVerticalScrollIndicator={false}
        // make this JSX componenet
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
                Nothing, Yet.
              </TextNormal>
            )}
          </View>
        )}
        style={{paddingTop: hp(11.5)}}
        // make this JSX componenet
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddPostModal(true)}
        activeOpacity={0.8}>
        <PlusSVG />
      </TouchableOpacity>
      <AddPostModal
        isVisible={addPostModal}
        onBackButtonPress={() => setAddPostModal(false)}
        onBackDropPress={() => setAddPostModal(false)}
        spaceName={selectedSpaces}
      />
      <WelcomeNoteModal
        isVisible={general?.firstTimeLogin}
        onBackButtonPress={() => setFirstTimeLoginStatus(false)}
        onBackDropPress={() => setFirstTimeLoginStatus(false)}
        user={user}
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
    height: wp(18),
    width: wp(18),
    bottom: hp(15),
    right: wp(5),
  },
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
  spaceContainer: {
    height: headerHeight / 2,
    position: 'absolute',
    alignSelf: 'center',
    top: hp(3.5),
    zIndex: 10000,
  },
  spaceNestedContainer: {
    backgroundColor: COLORS.backgroundColor,
  },
});
