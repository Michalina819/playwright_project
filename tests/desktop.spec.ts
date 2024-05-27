import { test, expect } from '@playwright/test';

test.describe('desktop test', () => {
    test('quick payment with correct data', async ({ page }) => {
        const url = 'https://demo-bank.vercel.app/';
        const userID = 'testerLO';
        const userPassword = '10425689';
        const recevierID = '2';
        const transferAmount = '120';
        const transferTitle = 'zwrot srodkow';
        const expectedTransferReceiver = 'Chuck Demobankowy';

        await page.goto(url);
        await page.getByTestId('login-input').fill(userID);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
       
        await page.locator('#widget_1_transfer_receiver').selectOption(recevierID);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
         
        await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });
    
    test('successful mobile top-up', async ({ page }) => {
        const url = 'https://demo-bank.vercel.app/';
        const userID = 'testerLO';
        const userPassword = '10425689';
        const topUpReceiver = '500 xxx xxx';
        const topUpAmount = '50';
        const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    
        await page.goto(url);
        await page.getByTestId('login-input').fill(userID);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
        await page.locator('#widget_1_topup_amount').fill(topUpAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();

        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    });
});