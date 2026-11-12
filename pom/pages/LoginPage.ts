import { expect, Locator, Page } from '@playwright/test'
import { SERVICE_URL } from '../../config/env-data'
import { Button } from '../atoms/Button'
import { Error } from '../atoms/Error'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage{
  readonly page: Page
  readonly url: string = SERVICE_URL
  readonly signInButton: Button
  readonly usernameField: Locator
  readonly passwordField: Locator
  readonly errorPopup: Error
  // add more locators here

  constructor(page: Page) {
    super(page)
    this.page = page
    this.signInButton = new Button(page, 'signIn-button')
    this.usernameField = page.getByTestId('username-input')
    this.passwordField = page.getByTestId('password-input')
    this.errorPopup = new Error(page, 'authorizationError-popup')
    // continue with the rest of the implementation below
  }

  async open(): Promise<void> {
    await this.page.goto(this.url)
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username)
    await this.passwordField.fill(password)
    await this.signInButton.click()
  }

  async checkLoginPageVisible(visible = true): Promise<void> {
    await expect(this.usernameField).toBeVisible({ visible: visible })
    await expect(this.passwordField).toBeVisible({ visible: visible })
  }

  // continue with the rest of the implementation below
}
