import { ApiClient, Endpoints } from '~/api';
import { Category } from '~/types';

export class CategoryServices {
  private readonly path = Endpoints.category;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Category[]>(this.path).then((res) => res);
  }
}
