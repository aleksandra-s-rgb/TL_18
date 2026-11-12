import { test } from '@playwright/test'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { LoginPage } from '../../pom/pages/LoginPage'
import { OrderPage } from '../../pom/pages/OrderPage'
import { NotFoundPage } from '../../pom/pages/NotFoundPage'
import { FoundPage } from '../../pom/pages/FoundPage'

const TD = {
  createdOrderId: 20703,
}

test.describe('All tests TL-18.1 - TL.18.2', async () => {
  let loginPage: LoginPage
  let orderPage: OrderPage
  let notFoundPage: NotFoundPage
  let foundPage: FoundPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    orderPage = new OrderPage(page)
    notFoundPage = new NotFoundPage(page)
    foundPage = new FoundPage(page)
    await loginPage.open()
  })
  test('TL-18.1 order not found', async ({}) => {
    await loginPage.signIn(USERNAME, PASSWORD)
    await orderPage.statusButton.checkVisible()
    await orderPage.statusButton.click()
    await orderPage.searchOrderInput.fill('0')
    await orderPage.searchButton.click()
    await notFoundPage.checkNotFoundPageVisible()
  })
  test('TL-18.2 order not found', async ({}) => {
    await loginPage.signIn(USERNAME, PASSWORD)
    await orderPage.statusButton.checkVisible()
    await orderPage.statusButton.click()
    await orderPage.searchOrderInput.fill(TD.createdOrderId)
    await orderPage.searchButton.click()
    await foundPage.checkFoundPageVisible()
  })
})
