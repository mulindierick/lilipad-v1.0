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
import {COLORS, FONTS} from '../../utils/constants/theme';
import {TextNormal} from './CustomText';
import CustomTextInput from './CustomTextInput';

const CustomSearchDropDown = ({data, setSelected, selected}) => {
  const [text, setText] = useState(null);
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

  const turnFocusOn = () => {
    setText('');
    setFocus(true);
  };

  return (
    <View>
      <CustomTextInput
        onChange={txt => setText(txt)}
        value={text}
        //because the data takes sometime to populate in filteredData
        onFocus={() => turnFocusOn()}
        onBlur={() => setFocus(false)}
        placeholder="search"
        autoCapitalize="sentences"
        autoCorrect={false}
        spellCheck={true}
        placeholderTextColor="#B0B0B0"
      />
      {focus && (
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.textStyle}
                onPress={() => handleSelect(item)}>
                <TextNormal textStyle={styles.text}>{item}</TextNormal>
              </TouchableOpacity>
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
    paddingVertical: hp(1.2),
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: hp(0.2),
    borderColor: '#D9D9D9',
  },
  listContainer: {
    width: '100%',
    flex: 1,
    maxHeight: hp(16.5), // Set a fixed height for the dropdown list
    marginTop: hp(0.5),
    overflow: 'hidden', // Prevents list from overflowing
  },
  text: {
    fontFamily: FONTS.Medium,
    color: '#888888',
    fontWeight: '500',
  },
});
