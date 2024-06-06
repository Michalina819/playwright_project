import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('payment tests', () => {

    test.beforeEach(async ({ page }) => {
        const userID = loginData.userID;
        const userPassword = loginData.userPassword;

        await page.goto('/')
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userID);
        await loginPage.passwordIndput.fill(userPassword);
        await loginPage.loginButton.click();

        await page.getByRole('link', { name: 'płatności' }).click();
    });

    test('simple payment', async ({ page }) => {
        const transferReceiver = 'Jan Nowak';
        const transferAccount = '12 3456 7891 2345 6789 1234 5678';
        const transferAmount = '1500';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;


        const paymentPage = new PaymentPage(page);
        await paymentPage.nameTransferReceiver.fill(transferReceiver);
        await paymentPage.accountNumber.fill(transferAccount);
        await paymentPage.amountInput.fill(transferAmount);

        await paymentPage.transferButton.click();
        await paymentPage.actionCloseButton.click();

        await expect(paymentPage.transferMessage).toHaveText(expectedMessage);

    });

});