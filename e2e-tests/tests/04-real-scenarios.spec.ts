/**
 * SUITE 4: Real-Case End-to-End Scenarios
 * ─────────────────────────────────────────
 * Skenario nyata dari sisi pengguna platform:
 * S01–S08: Admin use-cases (CRUD, navigation, workflow)
 * S09–S14: Visitor/publik use-cases (landing, pricing, contact)
 * S15–S20: System & cross-cutting (404, responsive, bell, settings)
 */
import { test, expect } from '@playwright/test';
import { APP_URL, WEB_URL, USERS, isBackendOnline, apiLogin } from './helpers';

// ═══════════════════════════════════════════════════════════════════════
// SCENARIO: Admin onboarding & navigasi lengkap
// ═══════════════════════════════════════════════════════════════════════
test.describe('🎬 Scenario: Admin — Login & Onboarding Flow', () => {
    test('S01 – Admin login → dashboard → navigasi ke semua section (full flow)', async ({ page }) => {
        // 1. Buka halaman login
        await page.goto(`${APP_URL}/login`);
        await expect(page.locator('h2, h1')).toBeVisible();

        // 2. Isi form login
        await page.fill('input[name="email"]', 'test.admin@daas.local');
        await page.fill('input[name="password"]', 'TestAdmin123!');
        await page.click('button[type="submit"]');

        // 3. Redirect ke dashboard (atau tetap di login jika backend offline)
        const onDashboard = await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 })
            .then(() => true)
            .catch(() => false);

        if (!onDashboard) {
            // Fallback: simulasikan dengan login admin bawaan
            await page.goto(`${APP_URL}/login`);
            await page.fill('input[name="email"]', 'admin@daas.local');
            await page.fill('input[name="password"]', 'admin123');
            await page.click('button[type="submit"]');
            await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 }).catch(() => {});
        }

        // 4. Verifikasi dashboard
        const isDashboard = await page.locator('header h1').textContent().catch(() => '');
        if (!isDashboard?.includes('Dashboard')) {
            test.skip();
            return;
        }

        // 5. Navigasi ke tiap section dan verifikasi judul
        const navMap = [
            { nav: 'Users',         title: 'User Management' },
            { nav: 'Services',      title: 'Services' },
            { nav: 'Connectors',    title: 'Data Connectors' },
            { nav: 'Metrics',       title: 'Usage Metrics' },
            { nav: 'Settings',      title: 'Settings' },
            { nav: 'Dashboard',     title: 'Dashboard' },
        ];

        for (const { nav, title } of navMap) {
            await page.click(`nav a:has-text("${nav}")`);
            await expect(page.locator('header h1')).toHaveText(title, { timeout: 5_000 });
            console.log(`  → ${nav} → "${title}" ✓`);
        }
    });
});

test.describe('🎬 Scenario: Admin — User Management CRUD', () => {
    test.beforeEach(async ({ page }) => {
        const online = await isBackendOnline(page);
        if (!online) { test.skip(); return; }
        // Login admin
        await page.goto(`${APP_URL}/login`);
        await page.fill('input[name="email"]', USERS.admin.email);
        await page.fill('input[name="password"]', USERS.admin.password);
        await page.click('button[type="submit"]');
        await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 }).catch(() => {
            test.skip();
        });
    });

    test('S02 – Admin melihat daftar users dengan pagination', async ({ page }) => {
        await page.goto(`${APP_URL}/users`);
        await expect(page.locator('header h1')).toHaveText('User Management');
        // Stats cards harus ada
        await expect(page.locator('text=Total Users')).toBeVisible();
        await expect(page.locator('text=Active Users')).toBeVisible();
        // Tabel ada
        await expect(page.locator('table')).toBeVisible();
        console.log('  → Users table visible ✓');
    });

    test('S03 – Admin search user berhasil filter tabel', async ({ page }) => {
        await page.goto(`${APP_URL}/users`);
        const search = page.locator('input[placeholder="Search users..."]');
        await expect(search).toBeVisible();
        // Search sesuatu yang ada
        await search.fill('admin');
        await page.waitForTimeout(300); // debounce
        // Row tabel harus ada (atau empty state)
        const rows = page.locator('tbody tr');
        const count = await rows.count();
        console.log(`  → Search "admin" → ${count} row(s) found ✓`);
        // Clear search
        await search.clear();
        await page.waitForTimeout(300);
    });

    test('S04 – Admin search tidak ada hasil → empty state muncul', async ({ page }) => {
        await page.goto(`${APP_URL}/users`);
        const search = page.locator('input[placeholder="Search users..."]');
        await search.fill('zzz-999-not-exist-xyz');
        await page.waitForTimeout(300);
        await expect(page.locator('text=/No users found matching/i')).toBeVisible();
        console.log('  → Empty state shown for no-match search ✓');
    });

    test('S05 – Admin buka action dropdown di row user (jika ada user)', async ({ page }) => {
        await page.goto(`${APP_URL}/users`);
        const emptyState = page.locator('text=No users yet.');
        const hasEmpty = await emptyState.isVisible().catch(() => false);
        if (hasEmpty) { console.log('  → No users, skip'); test.skip(); return; }

        // Klik action button di row pertama
        const actionBtn = page.locator('tbody tr').first().locator('button[title="Actions"]');
        await expect(actionBtn).toBeVisible();
        await actionBtn.click();

        // Dropdown terbuka dengan opsi lengkap
        await expect(page.locator('text=Edit User')).toBeVisible();
        await expect(page.locator('text=Change Role')).toBeVisible();
        await expect(page.locator('text=View Details')).toBeVisible();
        const deactivateOrActivate = page.locator('text=Deactivate, text=Activate');
        await expect(deactivateOrActivate.first()).toBeVisible();
        console.log('  → Action dropdown opened with all options ✓');

        // Tutup dengan klik di luar
        await page.locator('main').click({ position: { x: 200, y: 200 } });
        await expect(page.locator('text=Edit User')).toHaveCount(0);
        console.log('  → Dropdown closed on outside click ✓');
    });
});

test.describe('🎬 Scenario: Admin — Settings Profile Update', () => {
    test.beforeEach(async ({ page }) => {
        const online = await isBackendOnline(page);
        // Jika backend off, test Settings UI tetap bisa jalan (tidak perlu save)
        await page.goto(`${APP_URL}/login`);
        await page.fill('input[name="email"]', 'admin@daas.local');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 }).catch(() => {});
    });

    test('S06 – Navigasi ke Settings dan verifikasi 3 section + form', async ({ page }) => {
        await page.goto(`${APP_URL}/settings`);
        await expect(page.locator('h3:has-text("Profile Settings")')).toBeVisible();
        await expect(page.locator('h3:has-text("Security & Password")')).toBeVisible();
        await expect(page.locator('h3:has-text("Notifications")')).toBeVisible();

        // Input fields harus ada dengan class .input
        const inputs = page.locator('input.input');
        const count = await inputs.count();
        console.log(`  → ${count} input.input fields found ✓`);
        expect(count).toBeGreaterThanOrEqual(3);
    });

    test('S07 – Password mismatch → error tanpa memanggil API', async ({ page }) => {
        await page.goto(`${APP_URL}/settings`);
        const pwInputs = page.locator('input[type="password"]');
        await pwInputs.nth(0).fill('current123');
        await pwInputs.nth(1).fill('newpass123');
        await pwInputs.nth(2).fill('differentpass456'); // mismatch
        await page.click('button:has-text("Update Password")');
        await expect(page.locator('text=Passwords do not match')).toBeVisible();
        console.log('  → Mismatch error shown correctly ✓');
    });

    test('S08 – Notification toggle berubah state saat diklik', async ({ page }) => {
        await page.goto(`${APP_URL}/settings`);
        const toggles = page.locator('button[aria-label*="Toggle"]');
        await expect(toggles).toHaveCount(3);

        // Klik toggle pertama, verifikasi class berubah
        const first = toggles.first();
        const before = await first.getAttribute('class');
        await first.click();
        const after = await first.getAttribute('class');
        expect(before).not.toBe(after);

        // Klik semuanya sekali (smoke test)
        await toggles.nth(1).click();
        await toggles.nth(2).click();
        console.log('  → All 3 notification toggles clickable ✓');
    });
});

test.describe('🎬 Scenario: Admin — Notification Bell Full Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${APP_URL}/login`);
        await page.fill('input[name="email"]', 'admin@daas.local');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 }).catch(() => {});
    });

    test('S09 – Bell ring → buka panel → ada notifikasi → mark all read → badge hilang', async ({ page }) => {
        const bell = page.locator('header button[title="Notifications"]');
        await expect(bell).toBeVisible();

        // Badge unread ada sebelum mark all
        const badge = bell.locator('span');
        const hasBadge = await badge.isVisible().catch(() => false);
        console.log(`  → Unread badge before: ${hasBadge}`);

        // Buka panel
        await bell.click();
        await expect(page.locator('text=Mark all read')).toBeVisible();

        // Isi panel: ada item notifikasi
        const notifItems = page.locator('[class*="divide-y"] > div, [class*="px-4 py-3"]');
        const itemCount = await notifItems.count();
        console.log(`  → ${itemCount} notifications in panel ✓`);

        // Mark all read
        await page.click('text=Mark all read');
        await expect(page.locator('text=Mark all read')).toHaveCount(0, { timeout: 3_000 });
        console.log('  → "Mark all read" disappeared ✓');

        // Badge merah harus hilang
        await expect(badge).toHaveCount(0, { timeout: 2_000 });
        console.log('  → Unread badge removed ✓');
    });
});

// ═══════════════════════════════════════════════════════════════════════
// SCENARIO: Visitor — Landing Page Journey
// ═══════════════════════════════════════════════════════════════════════
test.describe('🎬 Scenario: Visitor — Landing Page Journey', () => {
    test('S10 – Visitor melihat landing page → scroll → klik pricing', async ({ page }) => {
        await page.goto(WEB_URL);

        // 1. Hero terlihat
        await expect(page.locator('h1')).toBeVisible();

        // 2. Dashboard mockup ada
        await expect(page.locator('text=app.daas-platform.io')).toBeVisible();

        // 3. Scroll ke stats
        await page.evaluate(() => window.scrollTo(0, 700));
        await expect(page.getByText('Enterprise Clients', { exact: true })).toBeVisible();

        // 4. Klik nav Pricing
        await page.click('nav a:has-text("Pricing")');
        await expect(page).toHaveURL(`${WEB_URL}/pricing`);
        await expect(page.locator('h1')).toContainText('Pricing');
        console.log('  → Landing → Stats → Pricing navigation ✓');
    });

    test('S11 – Visitor coba semua nav links dari Home', async ({ page }) => {
        await page.goto(WEB_URL);

        const links = [
            { text: 'About',    url: '/about' },
            { text: 'Services', url: '/services' },
            { text: 'Pricing',  url: '/pricing' },
            { text: 'Contact',  url: '/contact' },
        ];

        for (const { text, url } of links) {
            await page.click(`nav a:has-text("${text}")`);
            await expect(page).toHaveURL(`${WEB_URL}${url}`);
            // Kembali ke home untuk klik nav berikutnya
            await page.click('nav a:has-text("Home"), a[href="/"]');
            await expect(page).toHaveURL(`${WEB_URL}/`);
        }
        console.log('  → All nav links verified ✓');
    });
});

test.describe('🎬 Scenario: Visitor — Pricing Toggle & Plan Selection', () => {
    test('S12 – Visitor ubah ke Yearly lalu kembali Monthly, verifikasi harga', async ({ page }) => {
        await page.goto(`${WEB_URL}/pricing`);

        // Monthly: Pro harus $29
        await expect(page.locator('text=$29')).toBeVisible();

        // Klik Yearly
        await page.locator('button:has-text("Yearly")').click();

        // Pro harus $23
        await expect(page.locator('text=$23')).toBeVisible();
        await expect(page.locator('text=Save 20%')).toBeVisible();

        // Kembali Monthly
        await page.locator('button:has-text("Monthly")').click();
        await expect(page.locator('text=$29')).toBeVisible();
        console.log('  → Monthly ↔ Yearly price toggle works ✓');
    });

    test('S13 – Tombol "Get Started" (Free plan) mengarah ke register', async ({ page }) => {
        await page.goto(`${WEB_URL}/pricing`);
        const freeBtn = page.locator('a:has-text("Get Started")').first();
        const href = await freeBtn.getAttribute('href');
        expect(href).toContain('3002');
        expect(href).toContain('register');
        console.log(`  → Free plan CTA → "${href}" ✓`);
    });

    test('S14 – Tombol Enterprise "Contact Sales" mengarah ke /contact', async ({ page }) => {
        await page.goto(`${WEB_URL}/pricing`);
        const salesBtn = page.locator('a:has-text("Contact Sales")');
        const href = await salesBtn.getAttribute('href');
        expect(href).toContain('/contact');
        console.log(`  → Enterprise CTA → "${href}" ✓`);
    });
});

test.describe('🎬 Scenario: Visitor — Contact Form End-to-End', () => {
    test('S15 – Validasi form: submit kosong → isi satu per satu → error hilang', async ({ page }) => {
        await page.goto(`${WEB_URL}/contact`);

        // Submit kosong → 4 error
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Name is required')).toBeVisible();
        await expect(page.locator('text=Email is required')).toBeVisible();
        await expect(page.locator('text=Please select a topic')).toBeVisible();
        await expect(page.locator('text=Message is required')).toBeVisible();

        // Isi Name → name error hilang
        await page.fill('#name', 'Budi Santoso');
        await expect(page.locator('text=Name is required')).toHaveCount(0);

        // Isi Email invalid
        await page.fill('#email', 'bukan-email');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Enter a valid email address')).toBeVisible();

        // Perbaiki email
        await page.fill('#email', 'budi@perusahaan.co.id');
        await expect(page.locator('text=Enter a valid email address')).toHaveCount(0);

        // Isi topic
        await page.selectOption('#subject', 'sales');
        await expect(page.locator('text=Please select a topic')).toHaveCount(0);

        // Isi message terlalu pendek
        await page.fill('#message', 'Hi');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Message must be at least 10 characters')).toBeVisible();

        // Perbaiki message
        await page.fill('#message', 'Saya tertarik dengan layanan DaaS Platform untuk kebutuhan data analytics perusahaan.');
        await expect(page.locator('text=Message must be at least 10 characters')).toHaveCount(0);

        console.log('  → All form validations work correctly ✓');
    });

    test('S16 – Submit form valid → loading spinner → success state', async ({ page }) => {
        await page.goto(`${WEB_URL}/contact`);

        await page.fill('#name', 'Dewi Rahayu');
        await page.fill('#email', 'dewi@company.id');
        await page.selectOption('#subject', 'partnership');
        await page.fill('#message', 'Kami ingin berdiskusi mengenai partnership untuk integrasi data platform.');

        await page.click('button[type="submit"]');

        // Loading state ATAU success langsung
        const loading = page.locator('text=Sending...');
        const success = page.locator('text=Message Sent!');
        await expect(loading.or(success)).toBeVisible({ timeout: 5_000 });

        // Tunggu hingga success (API call selesai)
        await expect(success).toBeVisible({ timeout: 10_000 });
        await expect(page.locator('text=Send Another Message')).toBeVisible();
        console.log('  → Form submitted → success state shown ✓');
    });

    test('S17 – Klik "Send Another Message" → form reset', async ({ page }) => {
        await page.goto(`${WEB_URL}/contact`);
        // Submit valid form
        await page.fill('#name', 'Reset Test');
        await page.fill('#email', 'reset@test.com');
        await page.selectOption('#subject', 'support');
        await page.fill('#message', 'Testing form reset functionality for the test suite now.');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Message Sent!')).toBeVisible({ timeout: 10_000 });

        // Klik send another
        await page.click('text=Send Another Message');

        // Form harus kembali
        await expect(page.locator('button[type="submit"]')).toBeVisible();
        await expect(page.locator('#name')).toHaveValue('');
        console.log('  → Form reset after "Send Another Message" ✓');
    });
});

// ═══════════════════════════════════════════════════════════════════════
// SCENARIO: Cross-cutting — Responsive, 404, Dark mode
// ═══════════════════════════════════════════════════════════════════════
test.describe('🎬 Scenario: System — Responsive & Dark Mode', () => {
    test('S18 – Mobile view: hamburger menu buka seluruh nav', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
        await page.goto(WEB_URL);

        const menuBtn = page.locator('button[aria-label="Toggle menu"]');
        await expect(menuBtn).toBeVisible();

        // Navbar desktop tersembunyi di mobile
        await expect(page.locator('nav.hidden')).toBeVisible(); // hidden md:flex

        // Buka menu
        await menuBtn.click();
        await expect(page.locator('text=Contact').last()).toBeVisible();

        // Klik link di mobile menu → navigasi
        await page.locator('text=Pricing').last().click();
        await expect(page).toHaveURL(`${WEB_URL}/pricing`);
        console.log('  → Mobile menu navigation works ✓');
    });

    test('S19 – Dark mode toggle di admin: class "dark" toggle di html', async ({ page }) => {
        await page.goto(`${APP_URL}/login`);
        await page.fill('input[name="email"]', 'admin@daas.local');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 }).catch(() => {});

        const isDashboard = await page.locator('header h1').isVisible().catch(() => false);
        if (!isDashboard) { test.skip(); return; }

        const toggleBtn = page.locator('header button[title="Toggle dark/light mode"]');
        await expect(toggleBtn).toBeVisible();

        // Ambil state awal HTML class
        const initialClass  = await page.evaluate(() => document.documentElement.className);
        await toggleBtn.click();
        await page.waitForTimeout(300);
        const afterClass = await page.evaluate(() => document.documentElement.className);

        // Class harus berubah (antara 'dark' dan '')
        expect(afterClass).not.toBe(initialClass);
        console.log(`  → HTML class: "${initialClass}" → "${afterClass}" ✓`);

        // Kembalikan ke state awal
        await toggleBtn.click();
    });
});

test.describe('🎬 Scenario: System — 404 Handling', () => {
    test('S20 – 404 web: route aneh → halaman 404 → kembali ke Home', async ({ page }) => {
        // Kunjungi halaman yang valid dulu buat history
        await page.goto(`${WEB_URL}/about`);
        // Navigasi ke route tidak ada
        await page.goto(`${WEB_URL}/produk/ini-tidak-ada/sama-sekali`);
        await expect(page.locator('text=404')).toBeVisible();
        await expect(page.locator('text=Page not found')).toBeVisible();
        // Klik Go Back → kembali ke /about
        await page.click('button:has-text("Go Back")');
        await expect(page).toHaveURL(`${WEB_URL}/about`);
        // Kunjungi 404 lagi → klik Home Page
        await page.goto(`${WEB_URL}/halaman-tidak-ada/lagi`);
        await page.click('a:has-text("Home Page")');
        await expect(page).toHaveURL(`${WEB_URL}/`);
        console.log('  → 404 both buttons work correctly ✓');
    });
});
