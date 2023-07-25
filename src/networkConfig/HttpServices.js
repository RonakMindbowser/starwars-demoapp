import axios from 'axios';
import StorageService from '../utils/AsyncStorage';
import {StatusCode, appSecretForAuthentication} from './Endpoints';
import NetInfo from '@react-native-community/netinfo';
import Strings from '../utils/Strings';
import Colors from '../theme/Colors';
import {showErrorToast, showSuccessToast} from '../utils/FlashMessage';
import {sign, decode} from 'react-native-pure-jwt';

export default class HTTPService {
  static timeOut = promise => {
    return new Promise((resolve, reject) => {
      const timerId = setTimeout(() => {
        reject({
          message: Strings.requestTimeoutMessage,
          status: StatusCode.TIMEOUT,
          timerId,
        });
      }, 120 * 1000);
      promise.then(resolve, reject);
    });
  };

  static checkNetInfo = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  static getRequest = async (endpoint, params, options) =>
    this.buildRequest(endpoint, {
      method: 'GET',
      data: params,
    });

  static postRequest = async (endpoint, params, options) =>
    this.buildRequest(endpoint, {
      method: 'POST',
      data: params,
    });

  static deleteRequest = async (endpoint, params, options) =>
    this.buildRequest(endpoint, {
      method: 'DELETE',
      data: params,
    });

  static putRequest = async (endpoint, params, options) =>
    this.buildRequest(endpoint, {
      method: 'PUT',
      data: params,
    });

  static patchRequest = async (endpoint, params, options) =>
    this.buildRequest(endpoint, {
      method: 'PATCH',
      data: params,
    });

  static getHeadersWithToken = async () => ({
    'Content-Type': 'application/json',
  });

  static getAccessToken = async () => {
    const accessToken = await StorageService.getItem(
      StorageService.Keys.accessToken,
    );
    if (accessToken) {
      return accessToken.replace(/['"]/g, '');
    }
  };

  static setAccessToken = async token => {
    await StorageService.setItem(StorageService.Keys.accessToken, token);
  };

  static buildRequest = async (endpoint, params = {}, options = undefined) => {
    if ((await this.checkNetInfo()) === false) {
      showErrorToast(Strings.pleaseCheckYourInnternet);
      return false;
    }

    const {isSuccess} = await this.checkTokenValidation();

    if (isSuccess) {
      const headers = await this.getHeadersWithToken();

      const axiosRequest = {
        url: endpoint,
        headers: headers,
        ...params,
      };
      //FIXME: we need this log for development purpose
      console.log(
        '%c Axios Request',
        `background: ${Colors.black}; color: ${Colors.white}`,
        axiosRequest,
      );

      try {
        const response = await this.timeOut(
          axios({
            ...axiosRequest,
            validateStatus: status => {
              return status < 500;
            },
          }),
        );
        return this.checkAndValidateResponse(response, endpoint, params);
      } catch (error) {
        let reqError = {
          error,
          endpoint,
        };
        //FIXME: we need this log for development purpose
        console.log(
          '%c Axios Error',
          `background: ${Colors.red}; color: ${Colors.white}`,
          reqError,
        );
        if (error) {
          if (error?.status == StatusCode.TIMEOUT) {
            showErrorToast(Strings.requestTimeoutMessage);
            clearTimeout(error.timerId);
            return false;
          } else {
            showErrorToast(Strings.somethingWentWrong);
            return false;
          }
        }
      }
    } else {
      const userData = JSON.parse(
        await StorageService.getItem(StorageService.Keys.userData),
      );
      const response = await this.generateNewAccessToken(userData);
      if (response?.isSuccess) {
        const token = {
          accessToken: response?.response,
        };
        await StorageService.setItem(StorageService.Keys.accessToken, token);
        showSuccessToast(Strings.tokenRefreshSuccessFully);
        return HTTPService.buildRequest(endpoint, params, options);
      } else {
        showErrorToast(Strings.somethingWentWrong);
        return false;
      }
    }
  };

  static checkAndValidateResponse = (response, endpoint, params) => {
    const result = response.data;
    let reqResponse = {endpoint, result, reqParams: params, response};
    //FIXME: we need this log for development purpose
    console.log(
      '%c Axios Response',
      `background: ${Colors.modal_bg_color}; color: ${Colors.white}`,
      reqResponse,
    );

    if (response.status == StatusCode.SERVERERRORCODE) {
      showErrorToast(
        result?.message ? result.message : Strings.serverErrorMessage,
      );
      return false;
    }

    if (response.status == StatusCode.NOTFOUNDCODE) {
      showErrorToast(result?.message);
      return false;
    }

    if (response.status == StatusCode.SUCCESS) {
      return result;
    }

    if (result?.status_code == StatusCode.SESSIONTIMEOUTCODE) {
      showErrorToast(
        result?.message ? result?.message : Strings.tokenExpireMessage,
      );
      return false;
    }

    let message = result?.message
      ? result?.message?.toString()
      : Strings.somethingWentWrong;
    showErrorToast(message);
    return false;
  };

  /**
   * @param {*} params
   * @returns JWT Token for 5 min validation
   * 60 * 1 == 60 sec
   */
  static generateNewAccessToken = async params => {
    try {
      const response = await sign(
        {
          iss: params?.email,
          exp: new Date().getTime() + 60 * 1000,
          additional: params,
        },
        appSecretForAuthentication,
        {
          alg: 'HS256',
        },
      );
      if (response) {
        return {
          isSuccess: true,
          response,
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        response,
        error,
      };
    }
  };

  static checkTokenValidation = async () => {
    const token = JSON.parse(
      await StorageService.getItem(StorageService.Keys.accessToken),
    );
    try {
      let response = await decode(
        token?.accessToken, // the token
        appSecretForAuthentication, // the secret
        {
          skipValidation: false, // to skip signature and exp verification
        },
      );
      if (response) {
        return {
          isSuccess: true,
        };
      } else {
        return {
          isSuccess: false,
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        error: error,
      };
    }
  };
}
