import LocalStorage from './core/LocalStorage';

const JWT_TOKEN = 'jwt-token' as const;

class TokenStorage extends LocalStorage<string> {
  getToken(): string {
    try {
      return this.get(JWT_TOKEN);
    } catch (e) {
      throw new Error('토큰이 없습니다.');
    }
  }

  setToken(token: string): void {
    this.set(JWT_TOKEN, token);
  }

  removeToken(): void {
    this.clear(JWT_TOKEN);
  }
}

export default new TokenStorage();
