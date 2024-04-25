import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Config } from '../config';
import { LocalStorageManager } from '../utils';

export class ApiClient {
  private axiosInstance: AxiosInstance;
  private authToken: string | null;

  private localStorageManager: LocalStorageManager;

  constructor() {
    this.authToken = null;
    this.localStorageManager = new LocalStorageManager();
    this.axiosInstance = axios.create({
      baseURL: Config.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      this.authToken = await this.localStorageManager.get(Config.jwt_token);
      if (this.authToken) {
        config.headers!.Authorization = `Bearer ${this.authToken}`;
      }
      return config;
    });
  }

  private handleSuccessResponse<T>(response: AxiosResponse<T>) {
    if (response.status === 201) {
      //
    }
    if (response.status === 204) {
      //
    }
    return response.data;
  }

  private async handleErrorResponse(error: AxiosError): Promise<never> {
    console.log('error', error.response?.status);
    if (error.response?.status === 401) {
      console.error('Your session has expired, you will be redirected to login page');
      // clear local storage variables & navigate to login
      await this.localStorageManager.remove(Config.jwt_token);
    } else if (error.response?.status === 403) {
      console.log('error');
    }
    return Promise.reject(error);
  }

  public async clearAuthToken() {
    this.authToken = null;
    this.localStorageManager
      .remove(Config.jwt_token)
      .then((data) => data)
      .catch((err) => err);
  }
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }
  public async put<T>(
    url: string,
    id: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axiosInstance
      .put<T>(url + '/' + id, data, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }

  public async delete<T>(url: string, id: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<T>(url + '/' + id, config)
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }
}
