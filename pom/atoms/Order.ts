import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../pages/BasePage'

export class Order extends BasePage{
  page: Page
  orderPopup: Locator

  constructor(page: Page, dataTestId: string) {
    super(page)
    this.page = page
    this.orderPopup = page.getByTestId(dataTestId)
  }

  async checkVisible(visible = true): Promise<void> {
    await expect(this.orderPopup).toBeVisible({ visible: visible })
  }

}

