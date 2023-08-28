import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import CustomIcon from '../../components/common/CustomIcon';
import {COLORS, images} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';

const PostItem = () => {
  const {user} = useUser();

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <CustomImage
          source={{uri: user?.photo}}
          height={hp(7)}
          width={hp(7)}
          containerStyle={{borderRadius: hp(10)}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: wp(3),
            alignItems: 'flex-start',
          }}>
          <View>
            <TextNormal textStyle={styles.textNormal}>
              {user?.firstName + ' ' + user?.lastName}
            </TextNormal>
            <TextNormal textStyle={styles.textTimeAgo}>
              9 minutes ago
            </TextNormal>
          </View>
          <CustomImage
            source={images.postOptions}
            height={hp(2)}
            width={hp(3)}
            containerStyle={{marginTop: hp(0.4)}}
          />
        </View>
      </View>
      <View style={styles.postText}>
        <TextNormal textStyle={styles.postTextStyle}>
          Has anyone taken MB107? Please give me some advice.
        </TextNormal>
      </View>
      <CustomImage
        source={{uri: user?.photo}}
        height={hp(25)}
        width={'100%'}
        resizeMode="cover"
        containerStyle={{borderRadius: 10, marginTop: hp(1.5)}}
      />
      <View style={styles.postFooter}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomIcon
            type="antdesign"
            icon="heart"
            size={hp(3)}
            color={COLORS.red}
          />
          <TextNormal
            textStyle={{
              fontSize: hp(1.75),
              marginLeft: 5,
              fontWeight: '400',
              color: 'rgba(87, 87, 87, 0.83)',
            }}>
            0 likes
          </TextNormal>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(5),
          }}>
          <CustomIcon
            type="ionicons"
            icon="chatbubble"
            size={hp(3)}
            color={COLORS.blue}
          />
          <TextNormal
            textStyle={{
              fontSize: hp(1.75),
              marginLeft: 5,
              fontWeight: '400',
              color: 'rgba(87, 87, 87, 0.83)',
            }}>
            0 replies
          </TextNormal>
        </View>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    marginHorizontal: wp(0.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginBottom: hp(1.5),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 9,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNormal: {
    fontSize: hp(1.9),
    fontWeight: 'bold',
  },
  textTimeAgo: {
    fontSize: hp(1.5),
    color: 'rgba(87, 87, 87, 0.83)',
    fontWeight: '400',
  },
  postText: {
    marginTop: hp(1.5),
    marginRight: wp(12),
  },
  postTextStyle: {
    fontSize: hp(1.75),
    color: '#151313',
  },
  postFooter: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
});
