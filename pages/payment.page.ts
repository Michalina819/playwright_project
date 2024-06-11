import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
    constructor(private page: Page) { }

    sideMenu = new SideMenuComponent(this.page);

    nameTransferReceiver = this.page.getByTestId('transfer_receiver');
    accountNumber = this.page.getByTestId('form_account_to');
    amountInput = this.page.getByTestId('form_amount');

    transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
    actionCloseButton = this.page.getByTestId('close-button');

    transferMessage = this.page.locator('#show_messages');

    async makeTransfer(
        transferReceiver: string,
        transferAccount: string,
        transferAmount: string
    ): Promise<void> {
        await this.nameTransferReceiver.fill(transferReceiver);
        await this.accountNumber.fill(transferAccount);
        await this.amountInput.fill(transferAmount);

        await this.transferButton.click();
        await this.actionCloseButton.click();
    }

}