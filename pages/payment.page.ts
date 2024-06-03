import { Page } from "@playwright/test";

export class PaymentPage {
    constructor(private page: Page) { }

    nameTransferReceiver = this.page.getByTestId('transfer_receiver');
    accountNumber = this.page.getByTestId('form_account_to');
    amountInput = this.page.getByTestId('form_amount');
    transferMessage = this.page.locator('#show_messages');

}