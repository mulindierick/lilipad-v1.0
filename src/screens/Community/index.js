import React, {useState} from 'react';
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

const Community = () => {
  const {user} = useUser();
  const [selectedSpaces, setSleectedSpaces] = useState(user?.spaces[0]);
  const [selectedFilter, setSelectedFilter] = useState('Recent');
  return (
    <CustomWrapper containerStyle={{backgroundColor: '#F6F6F6'}}>
      <CommunityHeader
        selected={selectedFilter}
        setSelected={setSelectedFilter}
      />
      <FlatList
        data={[1, 2]}
        renderItem={({item}) => <PostItem />}
        ListFooterComponent={() => <View style={{marginBottom: hp(15)}}></View>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <View>
              <SpacesContainer
                data={user?.spaces}
                selected={selectedSpaces}
                setSelected={setSleectedSpaces}
              />
            </View>
          </>
        )}
      />
      <View style={styles.addButton}>
        <CustomImage source={images.addButton} resizeMode="cover" />
      </View>
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
});
