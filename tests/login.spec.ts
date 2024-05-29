import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('user login do Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  });

  test('successful login with correct credentials', async ({ page }) => {

    const userID = loginData.userID;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';


    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordIndput.fill(userPassword);
    await loginPage.loginButton.click();


    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {

    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {

    const userID = loginData.userID;
    const incorretcUserPassword = '104';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(incorretcUserPassword);
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorMessage);

  });

});