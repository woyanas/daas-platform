#!/usr/bin/env node
/**
 * SEED SCRIPT — Buat test users dengan 3 role berbeda via API
 * Jalankan: node setup-test-users.js
 *
 * Requires: backend running on http://localhost:3000
 */

const BACKEND_URL = 'http://localhost:3000/api';

const TEST_USERS = [
    {
        email: 'test.admin@daas.local',
        password: 'TestAdmin123!',
        fullName: 'Test Admin User',
        role: 'admin',
    },
    {
        email: 'test.editor@daas.local',
        password: 'TestEditor123!',
        fullName: 'Test Editor User',
        role: 'editor',
    },
    {
        email: 'test.viewer@daas.local',
        password: 'TestViewer123!',
        fullName: 'Test Viewer User',
        role: 'viewer',
    },
];

async function checkBackend() {
    try {
        const res = await fetch(`${BACKEND_URL}/docs`);
        if (!res.ok) throw new Error('Backend not healthy');
        console.log('✅ Backend is running');
        return true;
    } catch (e) {
        console.error('❌ Backend not available at', BACKEND_URL);
        console.error('   Start backend with: cd backend && npm run start:dev');
        return false;
    }
}

async function getAdminToken() {
    // Login sebagai admin utama (dari migration / seed default)
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@daas.local', password: 'admin123' }),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Login failed: ${res.status} — ${body}`);
    }

    const data = await res.json();
    console.log('✅ Logged in as admin@daas.local');
    return data.accessToken;
}

async function registerUser(user, adminToken) {
    // Coba register dulu
    const registerRes = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            fullName: user.fullName,
        }),
    });

    let userId;

    if (registerRes.status === 409) {
        console.log(`  ⚠️  User ${user.email} sudah ada, skip register`);
        // Ambil ID dari login
        const loginRes = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, password: user.password }),
        });
        if (loginRes.ok) {
            const loginData = await loginRes.json();
            userId = loginData.user?.id;
        }
    } else if (registerRes.ok) {
        const data = await registerRes.json();
        userId = data.user?.id;
        console.log(`  ✅ Created: ${user.email}`);
    } else {
        const body = await registerRes.text();
        console.error(`  ❌ Failed to create ${user.email}: ${registerRes.status} — ${body}`);
        return;
    }

    // Update role jika bukan viewer (default role dari register = viewer)
    if (user.role !== 'viewer' && userId && adminToken) {
        const roleRes = await fetch(`${BACKEND_URL}/users/${userId}/role`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`,
            },
            body: JSON.stringify({ role: user.role }),
        });

        if (roleRes.ok) {
            console.log(`  ✅ Role set to [${user.role}] for ${user.email}`);
        } else {
            const body = await roleRes.text();
            console.error(`  ⚠️  Could not set role: ${roleRes.status} — ${body}`);
        }
    }
}

async function main() {
    console.log('\n🔧 DaaS Platform — Test User Seeder');
    console.log('=====================================\n');

    const backendOk = await checkBackend();
    if (!backendOk) {
        process.exit(1);
    }

    let adminToken;
    try {
        adminToken = await getAdminToken();
    } catch (e) {
        console.error('❌ Cannot get admin token:', e.message);
        console.error('   Make sure admin@daas.local exists in the database');
        process.exit(1);
    }

    console.log('\n👤 Creating test users...\n');
    for (const user of TEST_USERS) {
        await registerUser(user, adminToken);
    }

    console.log('\n✅ Done! Test users ready:\n');
    console.log('┌─────────────────────────────┬──────────────────┬─────────┐');
    console.log('│ Email                        │ Password         │ Role    │');
    console.log('├─────────────────────────────┼──────────────────┼─────────┤');
    for (const u of TEST_USERS) {
        console.log(`│ ${u.email.padEnd(28)} │ ${u.password.padEnd(16)} │ ${u.role.padEnd(7)} │`);
    }
    console.log('└─────────────────────────────┴──────────────────┴─────────┘\n');
}

main().catch(console.error);
