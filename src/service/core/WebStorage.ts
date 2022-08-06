type TokenKey = 'jwt-token';

export default class WebStorage {
  private static readonly tokenKey: TokenKey = 'jwt-token';

  static getToken(): string | void {
    if (typeof window !== 'undefined') {
      try {
        const value = window.localStorage.getItem(this.tokenKey);
        if (value) {
          return value;
        }
        this.removeToken();
      } catch (e) {
        console.error('토큰 에러!', e);
        this.removeToken();
      }
    }
  }

  static setToken(token: string): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.tokenKey, token);
    }
  }

  static removeToken(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.tokenKey);
    }
  }
}
