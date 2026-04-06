import { test, expect } from '@playwright/test';
import { ADMIN_URL, loginAsAdmin, isBackendOnline } from './helpers';

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 2: Frontend-Admin (Dashboard)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('🔐 Admin: Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${ADMIN_URL}/login`);
    });

    test('T21 – Login page tampil dengan form email & password', async ({ page }) => {
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
        await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test('T22 – Input email punya autoComplete="username"', async ({ page }) => {
        const emailInput = page.locator('input[name="email"]');
        const ac = await emailInput.getAttribute('autocomplete');
        expect(ac).toBe('username');
    });

    test('T23 – Input password punya autoComplete="current-password"', async ({ page }) => {
        const pwInput = page.locator('input[name="password"]');
        const ac = await pwInput.getAttribute('autocomplete');
        expect(ac).toBe('current-password');
    });

    test('T24 – Login gagal menampilkan pesan error (skip jika backend tidak jalan)', async ({ page }) => {
        // Cek apakah backend online dulu
        const backendAvailable = await isBackendOnline(page);

        if (!backendAvailable) {
            console.log('  → Backend tidak jalan, test ini di-skip');
            test.skip();
            return;
        }

        await page.fill('input[name="email"]', 'wrong@email.com');
        await page.fill('input[name="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');
        // Tunggu error message apapun
        const errorEl = page.locator('[class*="red"],[class*="error"]').first();
        await expect(errorEl).toBeVisible({ timeout: 6000 });
    });
});

test.describe('🧭 Admin: Sidebar Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
    });

    test('T25 – Sidebar tampil semua nav items (11 item)', async ({ page }) => {
        const navItems = [
            'Dashboard', 'Users', 'Services', 'Connectors',
            'Widget Packs', 'Alerts', 'Reports', 'Integrations',
            'Feature Flags', 'Metrics', 'Settings',
        ];
        for (const item of navItems) {
            await expect(page.locator(`nav a:has-text("${item}")`)).toBeVisible();
        }
    });

    test('T26 – Sidebar TIDAK memiliki emoji corrupt', async ({ page }) => {
        const sidebarHTML = await page.locator('nav').innerHTML();
        expect(sidebarHTML).not.toContain('\uFFFD');
        await expect(page.locator('nav a:has-text("Connectors")')).toBeVisible();
        await expect(page.locator('nav a:has-text("Metrics")')).toBeVisible();
    });

    test('T27 – Sidebar active state berubah saat navigasi', async ({ page }) => {
        await page.click('nav a:has-text("Users")');
        await expect(page).toHaveURL(`${ADMIN_URL}/users`);
        await page.click('nav a:has-text("Settings")');
        await expect(page).toHaveURL(`${ADMIN_URL}/settings`);
    });
});

test.describe('📋 Admin: Header — Page Titles & Bell', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
    });

    test('T28 – Header title berubah sesuai halaman', async ({ page }) => {
        const titleMap: Record<string, string> = {
            '/users': 'User Management',
            '/services': 'Services',
            '/services/connectors': 'Data Connectors',
            '/services/feature-flags': 'Feature Flags',
            '/metrics': 'Usage Metrics',
            '/settings': 'Settings',
        };

        for (const [path, expectedTitle] of Object.entries(titleMap)) {
            await page.goto(`${ADMIN_URL}${path}`);
            const header = page.locator('header h1');
            await expect(header).toHaveText(expectedTitle, { timeout: 5000 });
            console.log(`  → ${path} → "${expectedTitle}" ✓`);
        }
    });

    test('T29 – Notification bell membuka dropdown panel', async ({ page }) => {
        const bellBtn = page.locator('header button[title="Notifications"]');
        await expect(bellBtn).toBeVisible();
        await bellBtn.click();
        // Panel muncul dengan teks "Mark all read"
        await expect(page.locator('text=Mark all read')).toBeVisible();
    });

    test('T30 – "Mark all read" berfungsi', async ({ page }) => {
        const bellBtn = page.locator('header button[title="Notifications"]');
        await bellBtn.click();
        await expect(page.locator('text=Mark all read')).toBeVisible();
        await page.click('text=Mark all read');
        // Setelah mark all read, tombol "Mark all read" harus hilang (karena unread = 0)
        await expect(page.locator('text=Mark all read')).toHaveCount(0, { timeout: 3000 });
    });

    test('T31 – Notification dropdown tutup saat klik di luar (backdrop)', async ({ page }) => {
        const bellBtn = page.locator('header button[title="Notifications"]');
        await bellBtn.click();
        await expect(page.locator('text=Mark all read')).toBeVisible();
        // Klik di area di luar panel (body / main area)
        await page.locator('main').click({ position: { x: 100, y: 100 } });
        // Panel harus menutup
        await expect(page.locator('text=Mark all read')).toHaveCount(0, { timeout: 3000 });
    });

    test('T32 – Dark/Light toggle button berfungsi', async ({ page }) => {
        const toggleBtn = page.locator('header button[title="Toggle dark/light mode"]');
        await expect(toggleBtn).toBeVisible();
        await toggleBtn.click();
        await toggleBtn.click();
    });
});

test.describe('👥 Admin: Users Page', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto(`${ADMIN_URL}/users`);
    });

    test('T33 – Search input menggunakan class .input (consistent styling)', async ({ page }) => {
        const searchInput = page.locator('input[placeholder="Search users..."]');
        await expect(searchInput).toBeVisible();
        const className = await searchInput.getAttribute('class');
        expect(className).toContain('input');
    });

    test('T34 – Stats cards tampil (Total Users, Active Users, Admins)', async ({ page }) => {
        await expect(page.locator('text=Total Users')).toBeVisible();
        await expect(page.locator('text=Active Users')).toBeVisible();
        await expect(page.locator('text=Admins')).toBeVisible();
    });

    test('T35 – Kolom Actions muncul di header tabel', async ({ page }) => {
        await expect(page.locator('th:has-text("Actions")')).toBeVisible();
    });

    test('T36 – Search filter memunculkan empty state', async ({ page }) => {
        const searchInput = page.locator('input[placeholder="Search users..."]');
        await searchInput.fill('xyz-tidak-ada-user-ini-12345');
        await expect(page.locator('text=/No users found matching/i')).toBeVisible({ timeout: 3000 });
    });

    test('T37 – MoreVertical button ada di setiap row (jika ada user)', async ({ page }) => {
        const emptyState = page.locator('text=No users yet.');
        const hasEmpty = await emptyState.isVisible().catch(() => false);

        if (hasEmpty) {
            console.log('  → Tidak ada user di database, skip dropdown test');
            test.skip();
            return;
        }

        const firstRowAction = page.locator('tbody tr').first().locator('button[title="Actions"]');
        await expect(firstRowAction).toBeVisible();
        // Klik untuk buka dropdown
        await firstRowAction.click();
        await expect(page.locator('text=Edit User')).toBeVisible();
        await expect(page.locator('text=Change Role')).toBeVisible();
    });
});

test.describe('⚙️ Admin: Settings Page', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto(`${ADMIN_URL}/settings`);
    });

    test('T38 – Section headers muncul (Profile, Security, Notifications)', async ({ page }) => {
        await expect(page.locator('h3:has-text("Profile Settings")')).toBeVisible();
        await expect(page.locator('h3:has-text("Security & Password")')).toBeVisible();
        // Notifications section header — pakai h3 agar tidak konflik dengan bell icon
        await expect(page.locator('h3:has-text("Notifications")')).toBeVisible();
    });

    test('T39 – Semua input menggunakan class .input', async ({ page }) => {
        const inputs = page.locator('input.input');
        const count = await inputs.count();
        expect(count).toBeGreaterThanOrEqual(3);
        console.log(`  → Ditemukan ${count} input.input elements`);
    });

    test('T40 – Notification toggles (switch) ada 3 buah', async ({ page }) => {
        const toggles = page.locator('button[aria-label*="Toggle"]');
        const count = await toggles.count();
        expect(count).toBe(3);
        console.log(`  → Ditemukan ${count} notification toggles`);
    });

    test('T41 – Toggle notification berfungsi (klik ubah state)', async ({ page }) => {
        const firstToggle = page.locator('button[aria-label*="Toggle"]').first();
        const initialClass = await firstToggle.getAttribute('class');
        await firstToggle.click();
        const newClass = await firstToggle.getAttribute('class');
        expect(newClass).not.toBe(initialClass);
    });

    test('T42 – Save button tampil di section Profile', async ({ page }) => {
        await expect(page.locator('button:has-text("Save Changes")')).toBeVisible();
    });

    test('T43 – Update Password button tampil', async ({ page }) => {
        await expect(page.locator('button:has-text("Update Password")')).toBeVisible();
    });

    test('T44 – Password mismatch menampilkan error', async ({ page }) => {
        // Gunakan nth() untuk target password input secara urutan
        const passwordInputs = page.locator('input[type="password"]');
        await passwordInputs.nth(0).fill('oldpass123');
        await passwordInputs.nth(1).fill('newpass123');
        await passwordInputs.nth(2).fill('differentpass456');
        await page.click('button:has-text("Update Password")');
        await expect(page.locator('text=Passwords do not match')).toBeVisible({ timeout: 4000 });
    });
});

test.describe('🔍 Admin: 404 Page', () => {
    test('T45 – 404 tampil untuk route tidak dikenal (tanpa login)', async ({ page }) => {
        await page.goto(`${ADMIN_URL}/halaman-tidak-ada`);
        const is404 = await page.locator('text=Page not found').isVisible().catch(() => false);
        const isLogin = await page.locator('input[name="email"]').isVisible().catch(() => false);
        expect(is404 || isLogin).toBe(true);
        if (is404) console.log('  → 404 page tampil');
        if (isLogin) console.log('  → Redirect ke login (protected route)');
    });

    test('T46 – 404 tampil untuk route tidak dikenal (saat login)', async ({ page }) => {
        await loginAsAdmin(page);
        await page.goto(`${ADMIN_URL}/halaman-tidak-ada`);
        await expect(page.locator('text=Page not found')).toBeVisible({ timeout: 5000 });
        await expect(page.locator('text=404')).toBeVisible();
        await expect(page.locator('a:has-text("Dashboard"), a[href="/"]')).toBeVisible();
    });
});
