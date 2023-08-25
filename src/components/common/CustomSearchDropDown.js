import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {TextNormal} from './CustomText';
import CustomTextInput from './CustomTextInput';

const CustomSearchDropDown = ({data, setSelected, selected}) => {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const [filteredData, setFilteredData] = useState(data || []);

  useEffect(() => {
    if (selected && focus && text !== selected) {
      setSelected('');
    }
    if (text) {
      setFilteredData(
        data.filter(item => item.toLowerCase().includes(text.toLowerCase())),
      );
    } else {
      setFilteredData(data);
    }
  }, [text]);

  const handleSelect = item => {
    setSelected(item);
    setText(item);
    Keyboard.dismiss();
  };

  return (
    <View>
      <CustomTextInput
        onChange={txt => setText(txt)}
        value={text}
        //because the data takes sometime to populate in filteredData
        onFocus={() => setTimeout(() => setFocus(true), 100)}
        onBlur={() => setFocus(false)}
        placeholder="Search"
      />
      {focus && (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.textStyle}
                onPress={() => handleSelect(item)}>
                <TextNormal color={COLORS.textColor}>{item}</TextNormal>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.grey,
                }}></View>
            )}
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={[styles.textStyle, {alignItems: 'center'}]}>
                <TextNormal color={COLORS.textColor}>No Data Found</TextNormal>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomSearchDropDown;

const styles = StyleSheet.create({
  textStyle: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.5),
  },
  dropDownContainer: {
    backgroundColor: '#F6F6F6',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  listContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    maxHeight: hp(10.5), // Set a fixed height for the dropdown list
    marginTop: hp(0.5),
    overflow: 'hidden', // Prevents list from overflowing
  },
});
