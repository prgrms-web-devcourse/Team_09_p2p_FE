interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export default class LocalStorage<T> {
  static instance: LocalStorage<any>;
  protected readonly storage: Storage = window.localStorage;

  constructor() {
    if (LocalStorage.instance) {
      return LocalStorage.instance;
    }
    LocalStorage.instance = this;
  }

  get(key: string, defaultValue?: T): T {
    try {
      const value = this.storage.getItem(key);
      if (!value) {
        if (defaultValue === undefined) {
          throw new Error('storage item has not value and is not defined default value.');
        }
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (e) {
      throw new Error('error occurs in storage get.');
    }
  }

  set(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error('error occurs in storage set.');
    }
  }

  clear(key: string): void {
    this.storage.removeItem(key);
  }
}
