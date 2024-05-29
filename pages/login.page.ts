import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) { }

    loginInput = this.page.getByTestId('login-input');
    passwordIndput = this.page.getByTestId('password-input');
    loginButton = this.page.getByTestId('login-button');

}