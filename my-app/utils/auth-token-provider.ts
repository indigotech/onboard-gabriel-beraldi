import { getData, storeData } from "@/utils/storage";

class AuthTokenProvider {
  private authToken: string | null = null;

  public setToken(token: string): Promise<void> {
    this.authToken = token;
    return storeData("token", token);
  }

  public async getToken(): Promise<string | null> {
    if (this.authToken) {
      return this.authToken;
    }

    const token = await getData("token");

    this.authToken = token;

    return token;
  }
}

export const authTokenProvider = new AuthTokenProvider();
