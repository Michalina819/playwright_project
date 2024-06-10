import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) { }

    loginInput = this.page.getByTestId('login-input');
    passwordIndput = this.page.getByTestId('password-input');
    loginButton = this.page.getByTestId('login-button');

    loginError = this.page.getByTestId('error-login-id');
    passwordError = this.page.getByTestId('error-login-password');

    async login(userID: string, userPassword: string): Promise<void> {

        await this.loginInput.fill(userID);
        await this.passwordIndput.fill(userPassword);
        await this.loginButton.click();
    }

}