import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {TextNormal, TextSmall} from '../../components/common/CustomText';
import {color} from 'react-native-reanimated';

const SpacesContainer = ({data = [1, 2, 3, 4, 5], selected, setSelected}) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: wp(0.5),
      }}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={selected == item ? styles.selected : styles.container}
            onPress={() => setSelected(item)}>
            <TextNormal
              textStyle={styles.textStyle}
              numberOfLines={2}
              color={selected == item ? COLORS.white : COLORS.black}>
              {item}
            </TextNormal>
            <View style={styles.totalPostNumbers}>
              <TextSmall
                bold
                color={COLORS.white}
                textStyle={{fontSize: hp(1.4)}}>
                0
              </TextSmall>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default SpacesContainer;

const styles = StyleSheet.create({
  container: {
    width: wp(29),
    height: hp(6),
    backgroundColor: COLORS.white,
    marginRight: wp(2),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    marginVertical: hp(1.5),
    // For Shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8,
  },
  selected: {
    width: wp(29),
    height: hp(6.2),
    backgroundColor: COLORS.blue,
    marginRight: wp(2),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    marginVertical: hp(1.5),
  },

  textStyle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: hp(2.1),
  },
  totalPostNumbers: {
    position: 'absolute',
    top: -9,
    right: -7,
    height: hp(2.5),
    aspectRatio: 1,
    backgroundColor: COLORS.green,
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
