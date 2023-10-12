import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import CustomHeader from '../../components/common/CustomHeader';
import usePost from '../../utils/hooks/usePost';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomImage from '../../components/common/CustomImage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {formatDate} from '../../utils/constants/helper';
import ActivityItem from './ActivityItem';

const Activity = () => {
  const {fetchActivities} = usePost();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchAllActivities = async () => {
    try {
      const res = await fetchActivities();
      setData(res);
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    fetchAllActivities();
  }, []);

  const renderSectionFooter = ({section}) => {
    return (
      <View
        style={{
          marginVertical: hp(1),
        }}></View>
    );
  };

  return (
    <CustomWrapper>
      <CustomHeader Activty={true} />
      <SectionList
        sections={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => <ActivityItem item={item} />}
        renderSectionHeader={({section: {title}}) => {
          return (
            <TextBig bold textStyle={{marginVertical: hp(1)}}>
              {formatDate(title)}
            </TextBig>
          );
        }}
        renderSectionFooter={renderSectionFooter}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {!loader && <TextBig>No Data Found</TextBig>}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </CustomWrapper>
  );
};

export default Activity;

const styles = StyleSheet.create({
  text: {
    marginLeft: wp(2),
    fontSize: wp(5),
    width: wp(70),
    paddingLeft: wp(2),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    backgroundColor: COLORS.white,
    borderWidth: 0,
    marginHorizontal: wp(0.5),
    marginVertical: hp(0.5),
  },
  image: {
    height: wp(5),
    aspectRatio: 1,
    borderRadius: wp(100),
  },
});