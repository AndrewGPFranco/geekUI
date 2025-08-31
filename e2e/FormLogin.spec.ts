import { test, expect } from '@playwright/test'

test.describe('FormLogin Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login')
  })

  test('deve renderizar o formulário de login corretamente', async ({
                                                                      page
                                                                    }) => {
    await expect(page.getByTestId('Email')).toBeVisible()
    await expect(page.getByTestId('Senha')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()

    await expect(page.getByTestId('Email')).toBeVisible()
    await expect(page.getByTestId('Senha')).toBeVisible()

    await expect(
      page.getByRole('link', { name: 'Esqueceu a senha?' })
    ).toBeVisible()

    await expect(page.getByTestId('Email')
      .locator('input')
    ).toHaveAttribute('placeholder', 'seu@email.com')

    await expect(page.getByTestId('Senha').locator('input')
    ).toHaveAttribute('placeholder', '••••••••')
  })

  test('deve preencher os campos de email e senha', async ({ page }) => {
    const emailInput = page.getByTestId('Email').locator('input')
    const senhaInput = page.getByTestId('Senha').locator('input')

    await emailInput.fill('usuario@teste.com')
    await expect(emailInput).toHaveValue('usuario@teste.com')

    await senhaInput.fill('minhasenha123')
    await expect(senhaInput).toHaveValue('minhasenha123')
  })

  test('deve mostrar estado de loading ao clicar em entrar', async ({
                                                                      page
                                                                    }) => {
    await page.route('/api/v1/user/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      })
    })

    await page.getByTestId('Email').locator('input').fill('teste@teste.com')
    await page.getByTestId('Senha').locator('input').fill('teste@teste')

    await page.getByRole('button', { name: 'Entrar' }).click()

    await expect(page.getByText('Entrando...')).toBeVisible()

    await expect(page.getByTestId('Email').locator('input')).toBeDisabled()
    await expect(page.getByTestId('Senha').locator('input')).toBeDisabled()
  })

  // TODO: corrigir
  // test('deve exibir toast de erro para email inválido', async ({ page }) => {
  //   await page.getByTestId('Email').locator('input').fill('beatriz@gmail.com')
  //   await page.getByTestId('Senha').locator('input').fill('senha123')
  //
  //   await page.getByRole('button', { name: 'Entrar' }).click()
  //
  //   await expect(
  //     page.locator('.n-message', { hasText: 'Mensagem de sucesso' })
  //   ).toBeVisible()
  // })

  test('deve navegar para home após login bem-sucedido', async ({ page }) => {
    await page.route('/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      })
    })

    await page.getByTestId('Email').locator('input').fill('teste@teste.com')
    await page.getByTestId('Senha').locator('input').fill('teste@teste')

    await page.getByRole('button', { name: 'Entrar' }).click()

    await expect(page).toHaveURL('/')
  })

  test('deve exibir toast de erro para credenciais inválidas', async ({
                                                                        page
                                                                      }) => {
    await page.route('/api/v1/user/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Credenciais inválidas' })
      })
    })

    await page.getByTestId('Email').locator('input').fill('usuario@teste.com')
    await page.getByTestId('Senha').locator('input').fill('senhaerrada')

    await page.getByRole('button', { name: 'Entrar' }).click()

    await expect(page).toHaveURL('/auth/login')
  })

  test('deve navegar para página de esqueceu senha', async ({ page }) => {
    await page.getByRole('link', { name: 'Esqueceu a senha?' }).click()
    await expect(page).toHaveURL('/auth/forgot-password')
  })

  // TODO: corrigir
  // test('deve ter acessibilidade adequada', async ({ page }) => {
  //   await expect(page.getByTestId('Email').locator('input')).toBeVisible()
  //   await expect(page.getByTestId('Senha').locator('input')).toBeVisible()
  //
  //   await page.keyboard.press('Tab')
  //   await expect(page.getByTestId('Email')).toBeFocused()
  //
  //   await page.keyboard.press('Tab')
  //   await expect(page.getByTestId('Senha')).toBeFocused()
  //
  //   await page.keyboard.press('Tab')
  //   await expect(
  //     page.getByRole('link', { name: 'Esqueceu a senha?' })
  //   ).toBeFocused()
  //
  //   await page.keyboard.press('Tab')
  //   await expect(
  //     page.getByRole('link', { name: 'Cadastre-se aqui' })
  //   ).toBeFocused()
  // })

  test('Deve realizar o tab até o botão de entrar', async ({ page }) => {
    await page.getByTestId('Email').locator('input').fill('teste@teste.com')
    await page.getByTestId('Senha').locator('input').fill('minhasenha')

    for (let i = 0; i < 23; i++) {
      await page.keyboard.press('Tab')
    }

    await expect(page.getByRole('button', { name: 'Entrar' })).toBeFocused()
  })

  test('deve permitir submit com Enter', async ({ page }) => {
    await page.getByTestId('Email').locator('input').fill('teste@teste.com')
    await page.getByTestId('Senha').locator('input').fill('teste@teste')

    await page.route('/api/v1/user/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      })
    })

    await page.getByTestId('Senha').press('Enter')

    await expect(page.getByText('Entrando...')).toBeVisible()
  })
})
