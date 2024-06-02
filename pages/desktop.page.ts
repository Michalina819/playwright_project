import { Page } from "@playwright/test";

export class DesktopPage {
    constructor(private page: Page) { }

    recevierIdInput = this.page.locator('#widget_1_transfer_receiver');
    transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    transferTitleInput = this.page.locator('#widget_1_transfer_title');
    expectedTransferReceiverText = this.page.locator('#show_messages');

    topUpReceiverInput = this.page.locator('#widget_1_topup_receiver');
    topUpAmountInput = this.page.locator('#widget_1_topup_amount');
    topUpAgreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement span');

    topUpIncorrect = this.page.getByTestId('error-widget-1-topup-amount');
}