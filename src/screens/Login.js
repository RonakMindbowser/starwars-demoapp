import {Keyboard, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Colors from '../theme/Colors';
import Strings from '../utils/Strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isAndroid} from '../utils/Metrics';
import {ButtonComponent, CustomTextInput, Loader} from '../components';
import {
  isEmptyOrNull,
  isValidEmail,
  isValidPassword,
} from '../utils/Validations';
import HTTPService from '../networkConfig/HttpServices';
import {showErrorToast, showSuccessToast} from '../utils/FlashMessage';
import StorageService from '../utils/AsyncStorage';
import NavigationService from '../navigation/NavigationService';
import {routeNames} from '../utils/RouteNames';
import {useDispatch, useSelector} from 'react-redux';
import {requestCompleted, requestStarted} from '../redux/slices/appSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const appState = useSelector(state => state.app);

  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const onPressLogin = async () => {
    const isValid = validateCredentials();
    if (isValid) {
      Keyboard.dismiss();
      await StorageService.clear();
      const params = {
        email,
        password,
      };
      dispatch(requestStarted());
      HTTPService.generateNewAccessToken(params)
        .then(async response => {
          dispatch(requestCompleted());
          if (response?.isSuccess) {
            const token = {
              accessToken: response?.response,
            };
            await StorageService.setItem(
              StorageService.Keys.accessToken,
              token,
            );
            await StorageService.setItem(
              StorageService.Keys.userData,
              JSON.stringify(params),
            );
            showSuccessToast(Strings.loginSuccess);
            setTimeout(() => {
              NavigationService.replace(routeNames.bottomTab);
            }, 500);
          } else {
            showErrorToast(Strings.somethingWentWrong);
          }
        })
        .catch(error => {
          dispatch(requestCompleted());
          showErrorToast(Strings.somethingWentWrong);
        });
    }
  };

  const validateCredentials = () => {
    setIsEmailError(false);
    setIsPasswordError(false);
    let isValid = true;
    if (isEmptyOrNull(email)) {
      setIsEmailError(true);
      setEmailErrorMessage(Strings.enterEmailMsg);
      isValid = false;
    }
    if (!isEmptyOrNull(email) && !isValidEmail(email)) {
      setIsEmailError(true);
      setEmailErrorMessage(Strings.enterValidEmailMsg);
      isValid = false;
    }
    if (isEmptyOrNull(password)) {
      setIsPasswordError(true);
      setPasswordErrorMessage(Strings.enterPasswordMsg);
      isValid = false;
    }
    if (!isEmptyOrNull(password) && !isValidPassword(password)) {
      setIsPasswordError(true);
      setPasswordErrorMessage(Strings.enterValidPasswordMsg);
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.loginTitle}>{Strings.loginTitle}</Text>
        <Text style={styles.loginDescription}>{Strings.loginDescription}</Text>

        <View style={styles.inputWrap}>
          <CustomTextInput
            titleText={Strings.email}
            placeholder={Strings.emailPlaceholder}
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType={'email-address'}
            isError={isEmailError}
            errorMessage={emailErrorMessage}
            onFocus={() => setIsEmailError(false)}
            inputRef={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType={'next'}
            wrapperStyle={styles.wrapperStyle}
          />
          <CustomTextInput
            wrapperStyle={styles.wrapperStyle}
            titleText={Strings.password}
            placeholder={Strings.passwordPlaceholder}
            value={password}
            onChangeText={text => setPassword(text)}
            isError={isPasswordError}
            errorMessage={passwordErrorMessage}
            onFocus={() => setIsPasswordError(false)}
            inputRef={passwordRef}
            secureTextEntry
            returnKeyType={'done'}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <ButtonComponent title={Strings.login} onPress={onPressLogin} />
      </KeyboardAwareScrollView>
      {appState?.loading ? <Loader /> : null}
      <SafeAreaView />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loginTitle: {
    fontSize: 25,
    color: Colors.black,
    fontWeight: '700',
  },
  loginDescription: {
    fontSize: 14,
    color: Colors.blueGrey,
    fontWeight: '400',
    paddingTop: 5,
  },
  keyboardContainer: {
    flexGrow: 1,
    paddingBottom: isAndroid ? 15 : 35,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputWrap: {
    paddingTop: 20,
    paddingBottom: 50,
  },
  wrapperStyle: {
    marginTop: 20,
  },
});
