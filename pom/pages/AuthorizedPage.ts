import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { Button } from '../atoms/Button'

export class AuthorizedPage extends BasePage {
  readonly header: Locator
  readonly logOutButton: Button
  readonly statusButton: Button
  // add more locators here

  constructor(page: Page) {
    super(page)
    this.header = page.locator('.header__buttons header__buttons_shown')
    this.logOutButton = new Button(page, 'logout-button')
    this.statusButton = new Button(page, 'openStatusPopup-button')
  }

  async checkAuthorizedPage(): Promise<void> {
    await expect(this.header).toBeVisible()
  }
}
