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
import {COLORS} from '../../utils/constants/theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MyContext} from '../../context/Context';
import CustomLoader from '../../components/common/CustomLoader';
import SplashScreen from 'react-native-splash-screen';

const DifferentUserProfile = ({route}) => {
  console.log({route});
  const {uid} = route?.params;
  const {user} = useUser();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
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
    SplashScreen.hide();
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
  }, []);

  console.log({userDetails});

  return loading ? (
    <CustomLoader />
  ) : (
    <CustomWrapper>
      <ProfileHeader differentUserProfile />
      <FlatList
        data={data}
        ref={ProfileFlatListRef}
        renderItem={({item}) => (
          <PostItem
            data={item}
            key={item?.postId}
            disabledProfileClick={true}
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
              <TextNormal textStyle={styles.noDataFound}>
                Nothing, Yet.
              </TextNormal>
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

const styles = StyleSheet.create({});