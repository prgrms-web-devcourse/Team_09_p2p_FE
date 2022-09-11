import LocalStorage from './LocalStorage';
const JWT_TOKEN = 'jwt-token' as const;

class TokenStorage extends LocalStorage<string> {
  getToken(): string | undefined {
    return this.get(JWT_TOKEN, '');
  }

  setToken(token: string): void {
    this.set(JWT_TOKEN, token);
  }

  removeToken(): void {
    this.clear(JWT_TOKEN);
  }
}

export default new TokenStorage();
