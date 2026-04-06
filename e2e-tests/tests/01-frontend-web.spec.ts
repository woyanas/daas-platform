import { test, expect } from '@playwright/test';
import { WEB_URL } from './helpers';

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 1: Frontend-Web (Publik)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('🌐 Frontend-Web: Home Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(WEB_URL);
    });

    test('T01 – Hero section tampil dengan judul utama', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        const h1Text = await page.locator('h1').textContent();
        expect(h1Text).toBeTruthy();
        console.log(`  → H1: "${h1Text?.trim()}"`);
    });

    test('T02 – Dashboard Preview: stat cards bukan placeholder kosong', async ({ page }) => {
        // Harus ada SVG chart (sparkline dashboard preview)
        const svgChart = page.locator('svg').first();
        await expect(svgChart).toBeVisible();
        // Pastikan TIDAK ada teks "Dashboard Preview" placeholder kosong
        await expect(page.locator('text=📊 Dashboard Preview')).toHaveCount(0);
        // Mockup browser chrome URL ada
        await expect(page.locator('text=app.daas-platform.io')).toBeVisible();
    });

    test('T03 – Stats section muncul: 500+, 10B+, 99.9%, 24/7', async ({ page }) => {
        // Cek label stats yang unik (bukan angkanya yang bisa duplikat)
        await expect(page.getByText('Enterprise Clients', { exact: true })).toBeVisible();
        await expect(page.getByText('Data Points Processed', { exact: true })).toBeVisible();
        await expect(page.getByText('Uptime SLA', { exact: true })).toBeVisible();
        await expect(page.getByText('Expert Support', { exact: true })).toBeVisible();
    });

    test('T04 – Feature cards ditampilkan', async ({ page }) => {
        await expect(page.locator('text=Big Data Analytics')).toBeVisible();
        await expect(page.locator('text=Real-Time Processing')).toBeVisible();
    });

    test('T05 – CTA button "Start Free Trial" mengarah ke admin URL', async ({ page }) => {
        const ctaBtn = page.locator('a', { hasText: /Start Free Trial/i }).first();
        await expect(ctaBtn).toBeVisible();
        const href = await ctaBtn.getAttribute('href');
        expect(href).toContain('register');
        console.log(`  → CTA href: "${href}"`);
    });
});

test.describe('🌐 Frontend-Web: Header Navigation', () => {
    test('T06 – Brand name "DaaS Platform" di header', async ({ page }) => {
        await page.goto(WEB_URL);
        const headerBrand = page.locator('header').locator('text=DaaS Platform');
        await expect(headerBrand).toBeVisible();
    });

    test('T07 – Nav links ada: About, Services, Pricing, Contact', async ({ page }) => {
        await page.goto(WEB_URL);
        for (const link of ['About', 'Services', 'Pricing', 'Contact']) {
            await expect(page.locator(`nav a:has-text("${link}")`).first()).toBeVisible();
        }
    });

    test('T08 – Mobile hamburger menu buka/tutup', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(WEB_URL);
        const menuBtn = page.locator('button[aria-label="Toggle menu"]');
        await expect(menuBtn).toBeVisible();
        await menuBtn.click();
        await expect(page.locator('text=Contact').last()).toBeVisible();
        await menuBtn.click();
    });
});

test.describe('🌐 Frontend-Web: Pricing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${WEB_URL}/pricing`);
    });

    test('T09 – Toggle Monthly/Yearly tersedia', async ({ page }) => {
        await expect(page.locator('button', { hasText: 'Monthly' })).toBeVisible();
        await expect(page.locator('button', { hasText: 'Yearly' })).toBeVisible();
    });

    test('T10 – Harga berubah saat klik Yearly (Pro $29 → $23)', async ({ page }) => {
        await expect(page.locator('text=$29')).toBeVisible();
        await page.locator('button', { hasText: 'Yearly' }).click();
        await expect(page.locator('text=$23')).toBeVisible();
        await expect(page.locator('text=Save 20%')).toBeVisible();
    });

    test('T11 – 3 plan cards tampil (Free, Pro, Enterprise)', async ({ page }) => {
        // Gunakan getByRole heading exact match untuk menghindari FAQ heading
        await expect(page.getByRole('heading', { name: 'Free', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Pro', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Enterprise', exact: true })).toBeVisible();
    });

    test('T12 – "Most Popular" badge ada di plan Pro', async ({ page }) => {
        await expect(page.locator('text=Most Popular')).toBeVisible();
    });
});

test.describe('🌐 Frontend-Web: Contact Form Validation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${WEB_URL}/contact`);
    });

    test('T13 – Submit kosong menampilkan error validasi', async ({ page }) => {
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Name is required')).toBeVisible();
        await expect(page.locator('text=Email is required')).toBeVisible();
        await expect(page.locator('text=Please select a topic')).toBeVisible();
        await expect(page.locator('text=Message is required')).toBeVisible();
    });

    test('T14 – Error name hilang saat field diisi', async ({ page }) => {
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Name is required')).toBeVisible();
        await page.fill('input[id="name"]', 'John Doe');
        await expect(page.locator('text=Name is required')).toHaveCount(0);
    });

    test('T15 – Format email tidak valid menampilkan error tepat', async ({ page }) => {
        await page.fill('input[id="email"]', 'bukan-email');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Enter a valid email address')).toBeVisible();
    });

    test('T16 – Tombol submit menampilkan spinner saat loading', async ({ page }) => {
        await page.fill('input[id="name"]', 'Test User');
        await page.fill('input[id="email"]', 'test@example.com');
        await page.selectOption('select[id="subject"]', 'support');
        await page.fill('textarea[id="message"]', 'This is a test message long enough');
        await page.click('button[type="submit"]');
        const sending = page.locator('text=Sending...');
        const success = page.locator('text=Message Sent!');
        await expect(sending.or(success)).toBeVisible({ timeout: 5000 });
    });
});

test.describe('🌐 Frontend-Web: 404 Page', () => {
    test('T17 – Halaman 404 tampil saat route tidak ada', async ({ page }) => {
        await page.goto(`${WEB_URL}/halaman-yang-tidak-ada`);
        await expect(page.locator('text=404')).toBeVisible();
        await expect(page.locator('text=Page not found')).toBeVisible();
        await expect(page.locator('text=Home Page')).toBeVisible();
    });

    test('T18 – Tombol Go Back pada 404 berfungsi', async ({ page }) => {
        await page.goto(`${WEB_URL}/about`);
        await page.goto(`${WEB_URL}/halaman-tidak-ada`);
        await page.click('button:has-text("Go Back")');
        await expect(page).toHaveURL(`${WEB_URL}/about`);
    });
});

test.describe('🌐 Frontend-Web: Footer', () => {
    test('T19 – Footer menampilkan "DaaS Platform" sebagai brand', async ({ page }) => {
        await page.goto(WEB_URL);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        // Cari di dalam elemen footer / bagian bawah halaman
        const footerText = await page.locator('footer').textContent();
        expect(footerText).toContain('DaaS Platform');
    });

    test('T20 – Copyright footer berisi tahun ini', async ({ page }) => {
        await page.goto(WEB_URL);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        const year = new Date().getFullYear().toString();
        const footerText = await page.locator('footer').textContent();
        expect(footerText).toContain(year);
        expect(footerText).toContain('DaaS Platform');
    });
});
