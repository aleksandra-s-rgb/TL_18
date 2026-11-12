import { expect, Locator, Page } from '@playwright/test'

import { AuthorizedPage } from './AuthorizedPage'

export class FoundPage extends AuthorizedPage {
  readonly page: Page
  readonly orderDetailsBlock: Locator
  // add more locators here

  constructor(page: Page) {
    super(page)
    this.page = page
    this.orderDetailsBlock = page.locator('.order-details')
  }

  async checkFoundPageVisible(visible = true): Promise<void> {
    await expect(this.orderDetailsBlock).toBeVisible({ visible })
  }
}
