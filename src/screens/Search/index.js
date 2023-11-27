import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BackButton} from '../../components/common/CustomSvgItems';
import CustomTextInput from '../../components/common/CustomTextInput';
import CustomTabBar from '../../components/customTabBar';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS} from '../../utils/constants/theme';
import Spaces from './Spaces';
import Students from './Students';

const Search = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerRef = useRef(null);
  const [StudentText, setStudentText] = useState('');
  const [SpaceText, setSpaceText] = useState('');
  const [searchStudent, setSearchStudent] = useState('');
  const [searchSpace, setSearchSpace] = useState('');

  const navigation = useNavigation();

  const setSearchText = async txt => {
    try {
      if (activeIndex == 0) {
        setStudentText(txt);
      } else {
        setSpaceText(txt);
      }
      // debounce logic
      debouncedHandleInputChange(txt);
    } catch (error) {
      console.log('Search Error', error);
    }
  };

  const debouncedHandleInputChange = useCallback(
    debounce(txt => {
      // Handle the input change here
      if (activeIndex == 0) {
        setSearchStudent(txt);
        console.log('searchStudent');
      } else {
        setSearchSpace(txt);
        console.log('searchSpace');
      }
    }, 0),
    [activeIndex],
  );

  // For Animation
  const [upperBorderFlag, setUpperBorderFlag] = useState(false);
  const [y, setY] = useState(0);

  return (
    <CustomWrapper containerStyle={{paddingHorizontal: 0}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: hp(10),
          backgroundColor: COLORS.backgroundColor,
        }}
      />

      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: wp(6),
            paddingRight: wp(2),
            paddingBottom: hp(1.5),
            marginTop: hp(2),
            zIndex: 1000,
            position: 'relative',
            backgroundColor: COLORS.backgroundColor,
          },
          upperBorderFlag && {
            borderBottomWidth: 0.4,
            borderBottomColor: '#DADADA',
          },
        ]}>
        <TouchableOpacity
          style={{}}
          activeOpacity={1}
          onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <CustomTextInput
            placeholder="search"
            onChange={txt => setSearchText(txt)}
            containerStyle={styles.customTextInput}
            placeholderTextColor="#B0B0B0"
            value={activeIndex === 0 ? StudentText : SpaceText}
          />
        </View>
      </View>
      <CustomTabBar
        tabs={['Student', 'Spaces']}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        pagerRef={pagerRef}
        y={y}
        setUpperBorderFlag={setUpperBorderFlag}>
        <Students searchText={searchStudent} setY={setY} />
        <Spaces searchText={searchSpace} setY={setY} />
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
    marginLeft: wp(6),
  },
  marginTop: {
    marginTop: hp(2),
  },
  customTextInput: {
    backgroundColor: 'transparent',
    flex: 0.9,
    borderRadius: 18,
  },
});
