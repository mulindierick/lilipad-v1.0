import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomTabBar from '../../components/customTabBar';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import CustomTextInput from '../../components/common/CustomTextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';
import {COLORS} from '../../utils/constants/theme';
import Students from './Students';
import Spaces from './Spaces';

const Search = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerRef = useRef(null);
  const [text, setText] = useState('');

  const onPressTab = index => {
    pagerRef.current?.setPage(index);
    // setActiveIndex(index)
  };
  return (
    <CustomWrapper>
      <View style={styles.searchContainer}>
        <CustomTextInput
          placeholder="Search"
          onChange={txt => setText(txt)}
          containerStyle={styles.customTextInput}
          placeholderTextColor="#B0B0B0"
        />
        <CustomIcon
          type="ionicons"
          icon="close"
          size={wp(7)}
          color={COLORS.placeholder}
          style={{
            flex: 0.1,
            alignItems: 'flex-end',
            paddingRight: wp(4),
          }}
        />
      </View>
      <CustomTabBar
        tabs={['Student', 'Spaces']}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        pagerRef={pagerRef}>
        <Students />
        <Spaces />
      </CustomTabBar>
    </CustomWrapper>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginTop: hp(3),
  },
  marginTop: {
    marginTop: hp(2),
  },
  customTextInput: {backgroundColor: 'transparent', flex: 0.9},
});
