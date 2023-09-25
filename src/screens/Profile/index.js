import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
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

const Profile = () => {
  const dispatch = useDispatch();
  const {user} = useUser();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const signOut = () => {
    dispatch(
      setUser({
        email: null,
        photo: null,
        firstName: null,
        lastName: null,
        isVerified: null,
        firebaseUserId: null,
        major: null,
        spaces: null,
      }),
    );
    auth().signOut();
  };

  const {fetchMyPost} = usePost();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let res = await fetchMyPost();
      setData(res);
    } catch (e) {
      console.log({e});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <CustomWrapper>
      <ProfileHeader />
      <FlatList
        data={data}
        renderItem={({item}) => <PostItem data={item} key={item?.postId} />}
        ListHeaderComponent={() => <ListHeaderItem user={user} />}
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
