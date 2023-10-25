import React from 'react';
import {Controller} from 'react-hook-form';
import CustomTextInput from './CustomTextInput';

const CustomRHFTextInput = ({
  control,
  name,
  rules,
  secureTextEntry,
  defaultValue,
  keyboardType,
  placeholder,
  width,
  multiline,
  containerStyle,
  source,
  editable = true,
  autoCapitalize = 'none',
  spellCheck = false,
  autoCorrect = false,
  textInputStyle,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue || null}
      render={({
        field: {name, onBlur, onChange, value},
        fieldState: {error},
      }) => (
        <CustomTextInput
          source={source}
          multiline={multiline}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          containerStyle={containerStyle}
          value={value}
          width={width}
          onChange={onChange}
          error={error?.message}
          editable={editable}
          autoCapitalize={autoCapitalize}
          spellCheck={spellCheck}
          autoCorrect={autoCorrect}
          textInputStyle={textInputStyle}
        />
      )}
    />
  );
};

export default CustomRHFTextInput;
