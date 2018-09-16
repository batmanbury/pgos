export class TestUsers {
  public testUser: string

  private userPassword: string

  constructor() {
    // Test User Accounts
    this.testUser = 'test_user'
  }

  public getUserSecret(): Promise<string> {
    return Promise.resolve('Password')
  }
}
