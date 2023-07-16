import Toast, {
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import {StyleSheet} from 'react-native';
import Colors from '../theme/Colors';
import Strings from '../utils/Strings';

const flashType = {
  success: Strings.success,
  error: Strings.error,
  info: Strings.info,
};

const flashTitle = {
  success: Strings.successTitle,
  error: Strings.errorTitle,
  info: Strings.infoTitle,
};

export const flashPosition = {
  top: 'top',
  bottom: 'bottom',
};

export const FlashMessage = (msg, type, title, position) => {
  Toast.show({
    text1: title,
    text2: msg,
    position: position || 'bottom',
    type: type,
  });
};

export const showSuccessToast = (msg, position) => {
  FlashMessage(msg, flashType.success, flashTitle.success, position);
};

export const showErrorToast = (msg, position) => {
  FlashMessage(msg, flashType.error, flashTitle.error, position);
};

export const showInfoToast = (msg, position) => {
  FlashMessage(msg, flashType.info, flashTitle.info, position);
};

export const toastConfig = {
  [flashType.success]: props => (
    <SuccessToast
      {...props}
      text1Style={[styles.textStyle, styles.text1SuccessStyle]}
      text2NumberOfLines={3}
      text2Style={styles.text2Style}
    />
  ),

  [flashType.error]: props => (
    <ErrorToast
      {...props}
      text1Style={[styles.textStyle, styles.text1ErrorStyle]}
      text2NumberOfLines={3}
      text2Style={styles.text2Style}
    />
  ),

  [flashType.info]: props => (
    <InfoToast
      {...props}
      text1Style={[styles.textStyle, styles.text1InfoStyle]}
      text2NumberOfLines={3}
      text2Style={styles.text2Style}
    />
  ),
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  text1SuccessStyle: {
    color: Colors.successColor,
  },
  text1ErrorStyle: {
    color: Colors.errorColor,
  },
  text1InfoStyle: {
    color: Colors.infoColor,
  },
  text2Style: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
