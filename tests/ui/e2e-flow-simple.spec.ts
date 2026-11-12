import { test } from '@playwright/test'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { LoginPage } from '../../pom/pages/LoginPage'
import { OrderPage } from '../../pom/pages/OrderPage'

test.describe('All tests TL-17.1 - TL-17.2', async () => {
  test('TL-17.1 signIn button disabled when incorrect data inserted', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.usernameField.fill(faker.lorem.word(2))
    await loginPage.passwordField.fill(faker.lorem.word(7))
    await loginPage.signInButton.checkVisible(true)
    await loginPage.signInButton.checkEnabled(false)
  })

  test('TL-17.2 login with correct credentials and verify order creation page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page)
    const orderCreationPage = new OrderPage(page)

    await loginPage.open()
    await loginPage.signIn(USERNAME, PASSWORD)

    await orderCreationPage.statusButton.checkVisible()
    await orderCreationPage.usernameField.checkVisible()
    await orderCreationPage.phoneField.checkVisible()
    await orderCreationPage.commentField.checkVisible()
    // verify at least few elements on the order creation page
  })
})
