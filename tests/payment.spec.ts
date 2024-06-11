import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { DesktopPage } from '../pages/desktop.page';

test.describe('payment tests', () => {
    let paymentPage: PaymentPage;

    test.beforeEach(async ({ page }) => {
        const userID = loginData.userID;
        const userPassword = loginData.userPassword;

        await page.goto('/')
        const loginPage = new LoginPage(page);
        await loginPage.login(userID, userPassword);

        const desktopPage = new DesktopPage(page);
        await desktopPage.sideMenuComponent.paymentLink.click();

        paymentPage = new PaymentPage(page);

    });

    test('simple payment', async ({ page }) => {
        const transferReceiver = 'Jan Nowak';
        const transferAccount = '12 3456 7891 2345 6789 1234 5678';
        const transferAmount = '1500';
        const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

        await paymentPage.makeTransfer(
            transferReceiver, 
            transferAccount, 
            transferAmount
        );

        await expect(paymentPage.transferMessage).toHaveText(expectedMessage);

    });

});