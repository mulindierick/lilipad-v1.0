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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {MyContext} from '../../context/Context';

const Profile = () => {
  const {user} = useUser();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [upperBorderFlag, setUpperBorderFlag] = useState(false);
  const {ProfileFlatListRef} = useContext(MyContext);
  const [visibleIndex, setVisibleIndex] = useState(-1);

  const {fetchMyPost} = usePost();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let res = await fetchMyPost(user?.firebaseUserId);
      setData(res);
    } catch (e) {
      console.log({e});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onScroll = e => {
    const y = e.nativeEvent.contentOffset.y;
    if (y <= 0) {
      // At the top of the FlatList
      setUpperBorderFlag(false);
    } else {
      setUpperBorderFlag(true);
    }
  };

  return (
    <CustomWrapper
      containerStyle={{paddingHorizontal: widthPercentageToDP(-4)}}>
      <ProfileHeader upperBorderFlag={upperBorderFlag} />
      <FlatList
        data={data}
        ref={ProfileFlatListRef}
        onScroll={onScroll}
        renderItem={({item, index}) => (
          <PostItem
            data={item}
            key={item?.postId}
            index={index}
            setVisibleIndex={setVisibleIndex}
          />
        )}
        ListHeaderComponent={() => <ListHeaderItem user={user} />}
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
        refreshing={loading}
        onRefresh={() => fetchPosts()}
      />
    </CustomWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
