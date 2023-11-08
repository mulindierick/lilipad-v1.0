import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackButton} from '../../components/common/CustomSvgItems';
import {TextNormal} from '../../components/common/CustomText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const ViewMembersHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <View style={{flex: 5, alignItems: 'center'}}>
        <TextNormal textStyle={styles.textStyle}>View Members</TextNormal>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
};

export default ViewMembersHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  textStyle: {
    fontSize: wp(6),
    fontWeight: '600',
  },
});