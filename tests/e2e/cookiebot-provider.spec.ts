import { test, expect } from '@playwright/test';

test.describe('Cookiebot Live Integration', () => {

  test('should display the real Cookiebot banner on page load and', async ({ page }) => {
    test.skip(!process.env.NEXT_PUBLIC_CM_COOKIEBOT_CBID, 'Skipping test: Cookiebot CBID environment variable is not set.');
    await page.goto('http://127.0.0.1:3000');

    const banner = page.locator('#CybotCookiebotDialog');
    await expect(banner).toBeVisible({ timeout: 5000 });

    await banner.getByRole('button', { name: /Deny/i }).click();
    await expect(banner).toBeHidden();
  });
});