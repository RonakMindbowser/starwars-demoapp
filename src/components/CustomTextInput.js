import React from 'react';
import {StyleSheet, TextInput, Image, Text, View} from 'react-native';
import Colors from '../theme/Colors';
import {screenWidth} from '../utils/Metrics';
import {isEmptyOrNull} from '../utils/Validations';

const CustomTextInput = ({
  onChangeText,
  onPress,
  editable,
  imageSource,
  placeholder,
  value,
  width,
  containerStyle,
  activeOpacity,
  showLeftIcon,
  titleText,
  wrapperStyle,
  isError,
  autoFocus,
  errorMessage,
  inputRef,
  titleStyle,
  errorStyle,
  maxLength,
  multiline,
  numberOfLines,
  selection,
  inputStyle,
  inputAccessoryViewID,
  showEyeIcon,
  isRightText,
  rightText,
  rightTextCustomStyle,
  keyboardType,
  showStarIcon,
  secureTextEntry,
  ...rest
}) => {
  return (
    <View style={wrapperStyle}>
      {isEmptyOrNull(titleText) ? null : (
        <View style={styles.titleWrap}>
          <Text style={[styles.titleStyle, titleStyle]}>{titleText}</Text>
        </View>
      )}

      <View
        style={[
          styles.inputView,
          {width: width ? width : screenWidth - 40},
          containerStyle,
        ]}>
        {showLeftIcon ? (
          <Image style={styles.icon} source={imageSource} />
        ) : null}
        <TextInput
          selection={selection}
          multiline={multiline}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          editable={editable}
          style={[styles.input, inputStyle]}
          onChangeText={onChangeText}
          underlineColorAndroid={Colors.transparent}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType || 'default'}
          ref={inputRef}
          autoFocus={autoFocus}
          autoCorrect={false}
          autoCompleteType="off"
          autoCapitalize="none"
          blurOnSubmit={false}
          inputAccessoryViewID={inputAccessoryViewID}
          {...rest}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Colors.blueGrey}
        />
      </View>
      {isError ? (
        <Text style={[styles.errorMessage, errorStyle]}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 32,
    paddingHorizontal: 8,
  },
  icon: {
    resizeMode: 'contain',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    height: 32,
    alignSelf: 'flex-start',
    fontSize: 14,
    marginRight: 20,
    color: Colors.black,
    flex: 1,
    padding: 0,
    paddingBottom: 3,
  },
  errorMessage: {
    color: Colors.red,
    fontSize: 10,
    paddingTop: 5,
  },
  titleStyle: {
    paddingBottom: 5,
    color: Colors.primaryText,
  },
  rightText: {
    paddingHorizontal: 8,
    borderLeftWidth: 1,
    paddingLeft: 15,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  titleWrap: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starStyle: {
    paddingLeft: 2,
    fontSize: 16,
  },
});
