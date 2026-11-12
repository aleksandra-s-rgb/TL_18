import { test } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { LoginPage } from '../../pom/pages/LoginPage'
import { OrderPage } from '../../pom/pages/OrderPage'

let loginPage: LoginPage
let orderCreationPage: OrderPage

test.describe('All tests TL-17.3 - TL-17.8', async () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.open()
  })
  test('TL-17.3 signIn button disabled when incorrect data inserted', async ({}) => {
    await loginPage.usernameField.fill(faker.lorem.word(2))
    await loginPage.passwordField.fill(faker.lorem.word(7))
    await loginPage.signInButton.checkVisible(true)
    await loginPage.signInButton.checkEnabled(false)
  })

  test('TL-17.4 error message displayed when incorrect credentials used', async ({}) => {
    await loginPage.signIn(faker.lorem.word(2), faker.lorem.word(8))
    await loginPage.errorPopup.checkVisible()
  })

  test('TL-17.5 login with correct credentials and verify order creation page', async ({
    page,
  }) => {
    orderCreationPage = new OrderPage(page)
    await loginPage.signIn(USERNAME, PASSWORD)

    await orderCreationPage.statusButton.checkVisible()
    await orderCreationPage.usernameField.checkVisible()
    await orderCreationPage.phoneField.checkVisible()
    await orderCreationPage.commentField.checkVisible()
  })

  test('TL-17.6 login and create order', async ({ page }) => {
    const order = new OrderPage(page)
    await loginPage.signIn(USERNAME, PASSWORD)

    await order.createOrder(
      faker.lorem.word(2),
      Number(faker.string.numeric(6)),
      faker.lorem.word(2),
    )
  })

  test('TL-17.7 errors during the order creation', async ({ page }) => {
    const order = new OrderPage(page)
    await loginPage.signIn(USERNAME, PASSWORD)

    await loginPage.usernameField.fill(faker.lorem.word(1))
    await order.nameFieldError.checkVisibleNameFieldError()

    await order.phoneField.fill(faker.lorem.word(2))
    await order.phoneFieldError.checkVisiblePhoneFieldError()
  })

  test('TL-17.8 log out from the platform', async ({ page }) => {
    const order = new OrderPage(page)
    await loginPage.signIn(USERNAME, PASSWORD)

    await order.logOutButton.click()
    await loginPage.checkLoginPageVisible(true)
    await loginPage.signInButton.checkVisible(true)
  })
})
