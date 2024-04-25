import { ApiClient, Endpoints } from '~/api';
import { Book } from '~/types';

export class BookServices {
  private readonly path = Endpoints.books;
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  public async getAll() {
    return this.apiClient.get<Book[]>(this.path).then((res) => res);
  }
}
