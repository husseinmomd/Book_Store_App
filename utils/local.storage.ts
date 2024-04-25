import * as SecureStore from 'expo-secure-store';

export class LocalStorageManager {
  public async set(key: string, value: string) {
    SecureStore.setItemAsync(key, value)
      .then((data) => data)
      .catch((error) => error);
  }

  public async get(key: string) {
    return SecureStore.getItemAsync(key)
      .then((data) => data)
      .catch((err) => err);
  }

  public async remove(key: string) {
    SecureStore.deleteItemAsync(key)
      .then((data) => data)
      .catch((error) => error);
  }
}
