import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {setUser} from '../../redux/reducers/userSlice';
import ProfileHeader from './ProfileHeader';

import useUser from '../../utils/hooks/useUser';
import ListHeaderItem from './ListHeaderItem';
import usePost from '../../utils/hooks/usePost';
import PostItem from '../Community/PostItem';
import {TextNormal} from '../../components/common/CustomText';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {MyContext} from '../../context/Context';
import CustomLoader from '../../components/common/CustomLoader';
import SplashScreen from 'react-native-splash-screen';
import DifferentUserProfileItem from './DifferentUserProfileItem';

const DifferentUserProfile = ({route}) => {
  const {uid} = route?.params;
  const {user} = useUser();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(-1);

  const [userDetails, setUserDetails] = useState({});
  const {ProfileFlatListRef} = useContext(MyContext);

  const {fetchMyPost} = usePost();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let res = await fetchMyPost(uid);
      setData(res?.post || []);
      setUserDetails(res?.user || {});
    } catch (e) {
      console.log({e});
    }
    try {
      SplashScreen.hide();
    } catch (e) {
      console.log({e});
    }

    setLoading(false);
  };

  const fetchPostAgain = async () => {
    setRefreshing(true);
    try {
      let res = await fetchMyPost(uid);
      setData(res?.post || []);
      setUserDetails(res?.user || {});
    } catch (e) {
      console.log({e});
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [uid]);

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

  return loading ? (
    <CustomLoader />
  ) : (
    <CustomWrapper containerStyle={{paddingHorizontal: wp(-4)}}>
      <ProfileHeader differentUserProfile upperBorderFlag={upperBorderFlag} />
      <FlatList
        data={data}
        ref={ProfileFlatListRef}
        onScroll={onScroll}
        renderItem={({item, index}) => (
          <DifferentUserProfileItem
            data={item}
            key={item?.postId}
            disabledProfileClick={true}
            index={index}
            setVisibleIndex={setVisibleIndex}
          />
        )}
        ListHeaderComponent={() => (
          <ListHeaderItem user={userDetails} differentUserProfile />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{marginBottom: hp(15)}} />}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(10),
            }}>
            {loading ? (
              <ActivityIndicator color={COLORS.grey} size="large" />
            ) : (
              <TextNormal textStyle={styles.noDataFound}>nothing.</TextNormal>
            )}
          </View>
        )}
        refreshing={refreshing}
        onRefresh={() => fetchPostAgain()}
      />
    </CustomWrapper>
  );
};

export default DifferentUserProfile;

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    borderColor: '#C9C9C9',
    borderWidth: 1,
    height: wp(14),
    aspectRatio: 1,
    borderRadius: hp(10),
    justifyContent: 'center',
    position: 'absolute',
    left: wp(4),
    backgroundColor: COLORS.white,
    zIndex: 111111,
  },
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
});
