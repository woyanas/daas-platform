import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    expect: { timeout: 8_000 },
    retries: 1,
    workers: 1, // serial agar tidak konflik session
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ],
    use: {
        headless: true,
        screenshot: 'on',
        video: 'off',
        trace: 'retain-on-failure',
        baseURL: 'http://localhost:3001',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    /* Dev servers sudah berjalan manual sebelum test */
});
