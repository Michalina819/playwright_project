import { test, expect } from '@playwright/test';

test.describe('successful login with correct credentials', () => {
  test('login with correct credentials', async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'testerLO';
    const userPassword = '10425689';
    const expectedUserName = 'Jan Demobankowy';

    await page.goto(url);
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('test');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('unsuccessful login with to short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('1234');
    await page.getByTestId('password-input').blur();
   
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');

  });

});