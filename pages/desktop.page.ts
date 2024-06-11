import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class DesktopPage {
    constructor(private page: Page) { }

    sideMenuComponent = new SideMenuComponent(this.page);

    recevierIdInput = this.page.locator('#widget_1_transfer_receiver');
    transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    transferTitleInput = this.page.locator('#widget_1_transfer_title');
    expectedTransferReceiverText = this.page.locator('#show_messages');

    topUpReceiverInput = this.page.locator('#widget_1_topup_receiver');
    topUpAmountInput = this.page.locator('#widget_1_topup_amount');
    topUpAgreementCheckbox = this.page.locator('#uniform-widget_1_topup_agreement span');

    actionButton = this.page.getByRole('button', { name: 'wykonaj' });
    closeButtonAction = this.page.getByTestId('close-button');

    actionButtonAmount = this.page.getByRole('button', { name: 'doładuj telefon' });

    topUpIncorrect = this.page.getByTestId('error-widget-1-topup-amount');

    async makeQuickPayment(
        recevierId: string,
        transferAmount: string,
        transferTitle: string
    ): Promise<void> {
        await this.recevierIdInput.selectOption(recevierId);
        await this.transferAmountInput.fill(transferAmount);
        await this.transferTitleInput.fill(transferTitle);

        await this.actionButton.click();
        await this.closeButtonAction.click();
    }

    async makeQucikMobilePayment(
        topUpReceiver: string,
        topUpAmount: string
    ): Promise<void> {
        await this.topUpReceiverInput.selectOption(topUpReceiver);
        await this.topUpAmountInput.fill(topUpAmount);
        await this.topUpAgreementCheckbox.click();

        await this.actionButtonAmount.click();
        await this.closeButtonAction.click();
    }
}