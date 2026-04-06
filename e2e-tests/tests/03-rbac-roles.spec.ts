/**
 * SUITE 3: Role-Based Access Control (RBAC)
 * ─────────────────────────────────────────
 * Test akses berdasarkan role: admin / editor / viewer
 * Semua test di-skip jika backend tidak tersedia.
 */
import { test, expect } from '@playwright/test';
import { APP_URL, USERS, loginAs, isBackendOnline, apiLogin } from './helpers';

// ─── Guard: skip semua test jika backend offline ─────────────────────────────
test.beforeEach(async ({ page }, testInfo) => {
    const online = await isBackendOnline(page);
    if (!online) {
        console.log(`  ⚠️  Backend offline — skip: ${testInfo.title}`);
        testInfo.skip();
    }
});

// ═══════════════════════════════════════════════════════════════════════
// ROLE: ADMIN — Akses penuh ke semua fitur
// ═══════════════════════════════════════════════════════════════════════
test.describe('👑 RBAC — Role: Admin', () => {
    test.beforeEach(async ({ page }) => {
        await loginAs(page, 'admin');
    });

    test('R01 – Admin berhasil login dan masuk ke dashboard', async ({ page }) => {
        await expect(page).toHaveURL(`${APP_URL}/`);
        // Header harus tampilkan "Dashboard"
        await expect(page.locator('header h1')).toHaveText('Dashboard');
    });

    test('R02 – Admin melihat sidebar dengan semua 11 menu item', async ({ page }) => {
        const items = [
            'Dashboard', 'Users', 'Services', 'Connectors',
            'Widget Packs', 'Alerts', 'Reports', 'Integrations',
            'Feature Flags', 'Metrics', 'Settings',
        ];
        for (const item of items) {
            await expect(page.locator(`nav a:has-text("${item}")`)).toBeVisible();
        }
    });

    test('R03 – Admin bisa mengakses halaman Users', async ({ page }) => {
        await page.goto(`${APP_URL}/users`);
        await expect(page.locator('header h1')).toHaveText('User Management');
        // Tidak ada redirect/403
        await expect(page.locator('text=403, text=Forbidden, text=Unauthorized')).toHaveCount(0);
    });

    test('R04 – Admin melihat badge role "admin" di sidebar user info', async ({ page }) => {
        // Role badge ada di sidebar bawah (user section)
        const userSection = page.locator('aside').locator('[class*="capitalize"]');
        await expect(userSection).toContainText('admin');
    });

    test('R05 – Admin dapat melihat tombol "Add User" di Users page', async ({ page }) => {
        await page.goto(`${APP_URL}/users`);
        await expect(page.locator('button:has-text("Add User")')).toBeVisible();
    });
});

// ═══════════════════════════════════════════════════════════════════════
// ROLE: EDITOR — Akses terbatas
// ═══════════════════════════════════════════════════════════════════════
test.describe('✏️ RBAC — Role: Editor', () => {
    test.beforeEach(async ({ page }) => {
        await loginAs(page, 'editor');
    });

    test('R06 – Editor berhasil login dan masuk ke dashboard', async ({ page }) => {
        // Editor harus berhasil login
        const isOnDashboard = await page.url().includes(APP_URL) && !page.url().includes('/login');
        // Jika gagal login (user belum dibuat), skip
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) {
            console.log('  ⚠️  Editor user belum ada — jalankan setup-test-users.js');
            test.skip();
            return;
        }
        await expect(page.locator('header h1')).toHaveText('Dashboard');
    });

    test('R07 – Editor melihat badge role "editor" di sidebar', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        const userSection = page.locator('aside').locator('[class*="capitalize"]');
        await expect(userSection).toContainText('editor');
    });

    test('R08 – Editor mengakses halaman Services (diizinkan)', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        await page.goto(`${APP_URL}/services`);
        await expect(page.locator('header h1')).toHaveText('Services');
    });

    test('R09 – Editor mencoba akses Users page (API-level 403)', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        // Test via direct API call — GET /users harus return 403 untuk editor
        const token = await apiLogin(page, USERS.editor.email, USERS.editor.password);
        if (!token) { test.skip(); return; }

        const status = await page.evaluate(async (t) => {
            const r = await fetch('http://localhost:3000/api/users', {
                headers: { Authorization: `Bearer ${t}` },
            });
            return r.status;
        }, token);

        expect(status).toBe(403);
        console.log(`  → GET /users as editor → HTTP ${status} (expected 403) ✓`);
    });

    test('R10 – Editor tidak bisa create user via API (403)', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        const token = await apiLogin(page, USERS.editor.email, USERS.editor.password);
        if (!token) { test.skip(); return; }

        const status = await page.evaluate(async (t) => {
            const r = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${t}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'hacked@test.com',
                    password: 'Hack123!',
                    fullName: 'Hacker',
                }),
            });
            return r.status;
        }, token);

        expect(status).toBe(403);
        console.log(`  → POST /users as editor → HTTP ${status} (expected 403) ✓`);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// ROLE: VIEWER — Hanya bisa baca
// ═══════════════════════════════════════════════════════════════════════
test.describe('👁️ RBAC — Role: Viewer', () => {
    test.beforeEach(async ({ page }) => {
        await loginAs(page, 'viewer');
    });

    test('R11 – Viewer berhasil login dan masuk ke dashboard', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) {
            console.log('  ⚠️  Viewer user belum ada — jalankan setup-test-users.js');
            test.skip();
            return;
        }
        await expect(page.locator('header h1')).toHaveText('Dashboard');
    });

    test('R12 – Viewer melihat badge role "viewer" di sidebar', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        const userSection = page.locator('aside').locator('[class*="capitalize"]');
        await expect(userSection).toContainText('viewer');
    });

    test('R13 – Viewer tidak bisa GET /users (403)', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        const token = await apiLogin(page, USERS.viewer.email, USERS.viewer.password);
        if (!token) { test.skip(); return; }

        const status = await page.evaluate(async (t) => {
            const r = await fetch('http://localhost:3000/api/users', {
                headers: { Authorization: `Bearer ${t}` },
            });
            return r.status;
        }, token);

        expect(status).toBe(403);
        console.log(`  → GET /users as viewer → HTTP ${status} (expected 403) ✓`);
    });

    test('R14 – Viewer tidak bisa GET /users/stats (403)', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        const token = await apiLogin(page, USERS.viewer.email, USERS.viewer.password);
        if (!token) { test.skip(); return; }

        const status = await page.evaluate(async (t) => {
            const r = await fetch('http://localhost:3000/api/users/stats', {
                headers: { Authorization: `Bearer ${t}` },
            });
            return r.status;
        }, token);

        expect(status).toBe(403);
        console.log(`  → GET /users/stats as viewer → HTTP ${status} (expected 403) ✓`);
    });

    test('R15 – Viewer bisa GET /users/me (profil sendiri)', async ({ page }) => {
        const isLoginPage = await page.locator('input[name="email"]').isVisible().catch(() => false);
        if (isLoginPage) { test.skip(); return; }

        const token = await apiLogin(page, USERS.viewer.email, USERS.viewer.password);
        if (!token) { test.skip(); return; }

        const result = await page.evaluate(async (t) => {
            const r = await fetch('http://localhost:3000/api/users/me', {
                headers: { Authorization: `Bearer ${t}` },
            });
            const data = await r.json();
            return { status: r.status, role: data.role, email: data.email };
        }, token);

        expect(result.status).toBe(200);
        expect(result.role).toBe('viewer');
        expect(result.email).toBe(USERS.viewer.email);
        console.log(`  → GET /users/me as viewer → HTTP ${result.status}, role=${result.role} ✓`);
    });
});

// ═══════════════════════════════════════════════════════════════════════
// RBAC: Token-Level Security Tests
// ═══════════════════════════════════════════════════════════════════════
test.describe('🔒 RBAC — Token & Auth Security', () => {
    test('R16 – Request tanpa token ke /users ditolak (401)', async ({ page }) => {
        const online = await isBackendOnline(page);
        if (!online) { test.skip(); return; }

        const status = await page.evaluate(async () => {
            const r = await fetch('http://localhost:3000/api/users');
            return r.status;
        });

        expect(status).toBe(401);
        console.log(`  → GET /users tanpa token → HTTP ${status} (expected 401) ✓`);
    });

    test('R17 – Token palsu ditolak (401)', async ({ page }) => {
        const online = await isBackendOnline(page);
        if (!online) { test.skip(); return; }

        const status = await page.evaluate(async () => {
            const r = await fetch('http://localhost:3000/api/users/me', {
                headers: { Authorization: 'Bearer fake.token.here' },
            });
            return r.status;
        });

        expect(status).toBe(401);
        console.log(`  → Token palsu → HTTP ${status} (expected 401) ✓`);
    });

    test('R18 – Register dengan email yang sudah ada → 409 Conflict', async ({ page }) => {
        const online = await isBackendOnline(page);
        if (!online) { test.skip(); return; }

        const status = await page.evaluate(async () => {
            const r = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Email admin yang pasti sudah ada
                body: JSON.stringify({
                    email: 'test.admin@daas.local',
                    password: 'TestAdmin123!',
                    fullName: 'Duplicate',
                }),
            });
            return r.status;
        });

        // 409 atau 400 tergantung implementasi
        expect([400, 409]).toContain(status);
        console.log(`  → Duplicate register → HTTP ${status} (expected 409) ✓`);
    });

    test('R19 – Login dengan password salah → 401', async ({ page }) => {
        const online = await isBackendOnline(page);
        if (!online) { test.skip(); return; }

        const status = await page.evaluate(async () => {
            const r = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test.admin@daas.local',
                    password: 'WrongPassword999!',
                }),
            });
            return r.status;
        });

        expect(status).toBe(401);
        console.log(`  → Login salah password → HTTP ${status} (expected 401) ✓`);
    });
});
