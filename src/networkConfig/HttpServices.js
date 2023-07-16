import axios from 'axios';
import StorageService from '../utils/AsyncStorage';
import {StatusCode} from './Endpoints';
import NetInfo from '@react-native-community/netinfo';
import Strings from '../utils/Strings';
import Colors from '../theme/Colors';
import {showErrorToast} from '../components/FlashMessage';

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

  static getSimpleHeaders = async () => ({
    'Content-Type': 'application/json',
  });

  static getHeadersWithToken = async () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await this.getAccessToken()}`,
    tenant: 'physician',
  });

  static getHeadersWithTokenAndPdf = async () => ({
    'Content-Type': 'application/pdf',
    Authorization: `Bearer ${await this.getAccessToken()}`,
    tenant: 'physician',
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
  };

  static checkAndValidateResponse = (response, endpoint, params) => {
    const result = response.data;
    let reqResponse = {endpoint, result, reqParams: params};
    //FIXME: we need this log for development purpose
    console.log(
      '%c Axios Response',
      `background: ${Colors.modal_bg_color}; color: ${Colors.white}`,
      reqResponse,
    );
    if (result.status_code == StatusCode.SERVERERRORCODE) {
      showErrorToast(
        result?.message ? result.message : Strings.serverErrorMessage,
      );
      return false;
    }

    if (result.status_code == StatusCode.NOTFOUNDCODE) {
      showErrorToast(result?.message);
      return false;
    }

    if (
      result.status_code == StatusCode.SUCCESS ||
      result.status_code == StatusCode.SUCCESSCODE204 ||
      result.status_code == StatusCode.SUCCESSCODE2
    ) {
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
}
