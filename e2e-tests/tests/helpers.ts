/**
 * Test fixtures & credential constants
 * ─────────────────────────────────────
 * Jalankan setup-test-users.js terlebih dahulu jika backend tersedia.
 * Jika backend offline, test role-based akan di-skip secara otomatis.
 */
import { Page } from '@playwright/test';

export const ADMIN_URL = 'http://localhost:3000/api'; // backend
export const WEB_URL   = 'http://localhost:3001';
export const APP_URL   = 'http://localhost:3002'; // frontend-admin

// ─── Test User Credentials ─────────────────────────────────────────────────
export const USERS = {
    admin: {
        email:    'test.admin@daas.local',
        password: 'TestAdmin123!',
        fullName: 'Test Admin User',
        role:     'admin',
    },
    editor: {
        email:    'test.editor@daas.local',
        password: 'TestEditor123!',
        fullName: 'Test Editor User',
        role:     'editor',
    },
    viewer: {
        email:    'test.viewer@daas.local',
        password: 'TestViewer123!',
        fullName: 'Test Viewer User',
        role:     'viewer',
    },
};

// ─── Login helper ───────────────────────────────────────────────────────────
export async function loginAs(page: Page, role: keyof typeof USERS) {
    const user = USERS[role];
    await page.goto(`${APP_URL}/login`);
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    // Tunggu redirect ke dashboard atau error
    await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 }).catch(() => {});
}

/** Alias backward-compat untuk suite 02 yang pakai loginAsAdmin */
export async function loginAsAdmin(page: Page) {
    await page.goto(`${APP_URL}/login`);
    await page.fill('input[name="email"]', 'admin@daas.local');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(`${APP_URL}/`, { timeout: 8_000 }).catch(() => {});
}

// ─── Backend availability check ─────────────────────────────────────────────
export async function isBackendOnline(page: Page): Promise<boolean> {
    try {
        const response = await page.request.get('http://localhost:3000/api/docs', {
            timeout: 3000
        });
        return response.ok();
    } catch {
        return false;
    }
}

// ─── API call via backend (direct, bypass UI) ───────────────────────────────
export async function apiLogin(
    page: Page,
    email: string,
    password: string
): Promise<string | null> {
    const token = await page.evaluate(
        async ({ email, password }) => {
            try {
                const r = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                if (!r.ok) return null;
                const d = await r.json();
                return d.accessToken ?? null;
            } catch {
                return null;
            }
        },
        { email, password }
    );
    return token;
}
