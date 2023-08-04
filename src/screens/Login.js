import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Colors from '../theme/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isAndroid} from '../utils/Metrics';
import {ButtonComponent} from '../components';
import {useAuth0} from 'react-native-auth0';
import {Auth0Config} from '../networkConfig/Endpoints';

const Login = () => {
  const {authorize, user, getCredentials, clearSession, clearCredentials} =
    useAuth0();

  useEffect(() => {
    console.log('user-->', user);
    if (user) {
      getAuth0Credentials();
    }
  }, [user]);

  const getAuth0Credentials = async () => {
    console.log('user-->', await getCredentials());
    Alert.alert('Demo', 'Login Successfully.');
  };

  const onPressLoginWithAuth0 = async () => {
    try {
      await authorize({
        scope: Auth0Config.scope,
        audience: Auth0Config.audience,
        prompt: 'login',
      });
    } catch (e) {}
  };

  const onPressLogOutWithAuth0 = () => {
    clearSession()
      .then(() => {
        console.log('Log out success');
        clearCredentials();
        Alert.alert('Demo', 'Log out Successfully.');
      })
      .catch(error => {
        console.log('Log out Error-->', error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.loginTitle}>
          {user ? 'Welcome to the demo' : 'Login to your account'}
        </Text>
        {user ? (
          <View>
            <Text style={styles.loginDescription}>Email : {user?.email}</Text>
            <ButtonComponent
              title={'Log Out'}
              onPress={onPressLogOutWithAuth0}
            />
          </View>
        ) : (
          <ButtonComponent title={'Login'} onPress={onPressLoginWithAuth0} />
        )}
      </KeyboardAwareScrollView>
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
    marginBottom: 30,
  },
  loginDescription: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 30,
  },
  keyboardContainer: {
    flexGrow: 1,
    paddingBottom: isAndroid ? 15 : 35,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
