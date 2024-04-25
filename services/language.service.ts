import { ApiClient, Endpoints } from '~/api';
import { Language } from '~/types';

export class LanguageServices {
  private readonly path = Endpoints.language;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Language[]>(this.path).then((res) => res);
  }
}
