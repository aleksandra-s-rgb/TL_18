import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { Order } from '../atoms/Order'
import { Error } from '../atoms/Error'
import { AuthorizedPage } from './AuthorizedPage'
import { Page } from '@playwright/test'

export class OrderPage extends AuthorizedPage {
  readonly page: Page
  readonly usernameField: Input
  readonly phoneField: Input
  readonly commentField: Input
  readonly orderButton: Button
  readonly orderPopup: Order
  readonly nameFieldError: Error
  readonly phoneFieldError: Error
  readonly searchOrderInput: Input
  readonly searchButton: Button
  // add more locators here

  constructor(page: Page) {
    super(page)
    this.page = page
    this.usernameField = new Input(page, 'username-input')
    this.phoneField = new Input(page, 'phone-input')
    this.commentField = new Input(page, 'comment-input')
    this.orderButton = new Button(page, 'createOrder-button')
    this.orderPopup = new Order(page, 'orderSuccessfullyCreated-popup')
    this.nameFieldError = new Error(page, 'username-input-error')
    this.phoneFieldError = new Error(page, 'phone-input-error')
    this.searchOrderInput = new Input(page, 'searchOrder-input')
    this.searchButton = new Button(page, 'searchOrder-submitButton')
  }

  async createOrder(username: string, phone: number, comment: string): Promise<void> {
    await this.usernameField.fill(username)
    await this.phoneField.fill(String(phone))
    await this.commentField.fill(comment)
    await this.orderButton.checkVisible()
    await this.orderButton.checkEnabled()
    await this.orderButton.click()
    await this.orderPopup.checkVisible()
  }
}
