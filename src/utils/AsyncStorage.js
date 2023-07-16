import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageService {
  //storage keys
  static Keys = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userData: 'userData',
  };

  //set items to localstorage
  static setItem = async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      return e;
    }
  };

  //get items from localstorage
  static getItem = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      return e;
    }
  };

  // multiple item remove from localstorage
  static multiRemove = async key => {
    try {
      await AsyncStorage.multiRemove(key);
    } catch (error) {}
  };

  // remove single item from localstorage
  static removeItem = async key => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      return error;
    }
  };

  // clear localstorage
  static clear = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (error) {
      return error;
    }
  };
}
