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

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordIndput.click();

    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const userID = loginData.userID;
    const incorretcUserPassword = '104';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordIndput.fill(incorretcUserPassword);
    await loginPage.passwordIndput.blur();

    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);

  });

});