import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('desktop test', () => {

    test.beforeEach(async ({ page }) => {
        const userID = loginData.userID;
        const userPassword = loginData.userPassword;

        await page.goto('/')
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userID);
        await loginPage.passwordIndput.fill(userPassword);
        await loginPage.loginButton.click();
    });

    test('quick payment with correct data', async ({ page }) => {
        const recevierId = '2';
        const transferAmount = '120';
        const transferTitle = 'zwrot srodkow';
        const expectedTransferReceiver = 'Chuck Demobankowy';

        const desktopPage = new DesktopPage(page);
        await desktopPage.recevierIdInput.selectOption(recevierId);
        await desktopPage.transferAmountInput.fill(transferAmount);
        await desktopPage.transferTitleInput.fill(transferTitle);

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        await expect(desktopPage.expectedTransferReceiverText).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('successful mobile top-up', async ({ page }) => {
        const topUpReceiver = '500 xxx xxx';
        const topUpAmount = '50';
        const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

        const desktopPage = new DesktopPage(page);
        await desktopPage.topUpReceiverInput.selectOption(topUpReceiver);
        await desktopPage.topUpAmountInput.fill(topUpAmount);
        //await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
        // await page.locator('#widget_1_topup_amount').fill(topUpAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();

        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });
    test('correct balance after successful mobile top-up', async ({ page }) => {
        const topUpReceiver = '500 xxx xxx';
        const topUpAmount = '50';
        const initialBalance = await page.locator('#money_value').innerText();
        const expectedBalance = Number(initialBalance) - Number(topUpAmount);

        await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
        await page.locator('#widget_1_topup_amount').fill(topUpAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
    });
});