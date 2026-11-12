import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { AuthorizedPage } from './AuthorizedPage'

export class NotFoundPage extends AuthorizedPage {
  readonly page: Page
  readonly notFoundTitle: Locator
  // add more locators here

  constructor(page: Page) {
    super(page)
    this.page = page
    this.notFoundTitle = page.getByTestId('orderNotFound-title')
  }

  async checkNotFoundPageVisible(visible = true): Promise<void> {
    await expect(this.notFoundTitle).toBeVisible({ visible })
  }
}
