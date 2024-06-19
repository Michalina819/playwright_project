import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('user login do Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials', async ({ page }) => {
    const userID = loginData.userID;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    await loginPage.login(userID, userPassword);

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordIndput.click();

    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const userID = loginData.userID;
    const incorrectUserPassword = '104';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    await loginPage.loginInput.fill(userID);
    await loginPage.passwordIndput.fill(incorrectUserPassword);
    await loginPage.passwordIndput.blur();

    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);

  });

});