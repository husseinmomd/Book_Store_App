import { ApiClient, Endpoints } from '~/api';
import { Config } from '~/types';

export class ConfigServices {
  private readonly path = Endpoints.Config;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Config>(this.path).then((res) => res);
  }
}
