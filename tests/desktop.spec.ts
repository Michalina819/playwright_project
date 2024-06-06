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
        const expectedMessageTransfer = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

        const desktopPage = new DesktopPage(page);
        await desktopPage.recevierIdInput.selectOption(recevierId);
        await desktopPage.transferAmountInput.fill(transferAmount);
        await desktopPage.transferTitleInput.fill(transferTitle);

        await desktopPage.actionButton.click();
        await desktopPage.closeButtonAction.click();

        await expect(desktopPage.expectedTransferReceiverText).toHaveText(expectedMessageTransfer);
    });

    test('successful mobile top-up', async ({ page }) => {
        const topUpReceiver = '500 xxx xxx';
        const topUpAmount = '50';
        const topUpExpectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

        const desktopPage = new DesktopPage(page);
        await desktopPage.topUpReceiverInput.selectOption(topUpReceiver);
        await desktopPage.topUpAmountInput.fill(topUpAmount);
        await desktopPage.topUpAgreementCheckbox.click();

        await desktopPage.actionButtonAmount.click();
        await desktopPage.closeButtonAction.click();

        await expect(desktopPage.expectedTransferReceiverText).toHaveText(topUpExpectedMessage);
    });
    test('unsuccessful mobile top-up', async ({ page }) => {
        const topUpReceiver = '500 xxx xxx';
        const topUpAmount = '508888888';
        const errorMessage = 'kwota musi być mniejsza lub równa 150'

        const desktopPage = new DesktopPage(page);
        await desktopPage.topUpReceiverInput.selectOption(topUpReceiver);
        await desktopPage.topUpAmountInput.fill(topUpAmount);
        await desktopPage.topUpAgreementCheckbox.click();

        await expect(desktopPage.topUpIncorrect).toHaveText(errorMessage);

    });
});