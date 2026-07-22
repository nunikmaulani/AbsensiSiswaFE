<script lang="ts">

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    let { children } = $props();
    let showLogoutModal = $state(false);

    function confirmLogout() {
        showLogoutModal = true;
    }
    function cancelLogout() {
        showLogoutModal = false;
    }
    async function handleLogout() {
        try {
           
            localStorage.removeItem('token');
            showLogoutModal = false;
            await goto('/login');
        } catch (err) {
            console.error('Gagal logout:', err);
        }
    }
</script>

<div class="dashboard-layout">
    <aside class="sidebar">
        <div class="brand">
            <div class="brand-icon">🏫</div>
            <div class="brand-info">
                <h2>SIMBASIS</h2>
                <p>Sistem Informasi Absensi Sekolah</p>
            </div>
        </div>

<nav class="nav-menu">
    <a
        href="/dashboard"
        class="nav-item"
        class:active={$page.url.pathname.startsWith('/dashboard')}
    >
        <span class="icon">📊</span>
        <span>Dashboard</span>
    </a>
    <a
        href="/guru"
        class="nav-item"
        class:active={$page.url.pathname.startsWith('/guru')}
    >
        <span class="icon">👨‍🏫</span>
        <span>Data Guru</span>
    </a>
    <a
        href="/siswa"
        class="nav-item"
        class:active={$page.url.pathname.startsWith('/siswa')}
    >
        <span class="icon">👨‍🎓</span>
        <span>Data Siswa</span>
    </a>
    <a
        href="/kelas"
        class="nav-item"
        class:active={$page.url.pathname.startsWith('/kelas')}
    >
        <span class="icon">🏫</span>
        <span>Kelas</span>
    </a>
    <a
        href="/absensi"
        class="nav-item"
        class:active={$page.url.pathname.startsWith('/absensi')}
    >
        <span class="icon">📋</span>
        <span>Presensi</span>
    </a>
</nav>
        <div class="sidebar-footer">
            <div class="user-card">
                <div class="user-info">
                    <div class="avatar">AD</div>
                    <div class="user-details">
                        <p class="user-name">Admin Sekolah</p>
                        <p class="user-role">Administrator</p>
                    </div>
                </div>
                <button class="btn-logout-icon" onclick={confirmLogout} type="button" title="Keluar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                </button>
            </div>
        </div>
    </aside>
    <main class="main-content">
        {@render children()}
    </main>
</div>

{#if showLogoutModal}
    <div class="modal-backdrop" onclick={cancelLogout} role="presentation">
        <div class="modal-box" onclick={(e) => e.stopPropagation()} role="dialog">
            <div class="modal-header">
                <div class="warning-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
                <div>
                    <h4>Konfirmasi Keluar</h4>
                    <p>Apakah Anda yakin ingin keluar dari aplikasi SIMBASIS?</p>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn-secondary" onclick={cancelLogout} type="button">Batal</button>
                <button class="btn-danger" onclick={handleLogout} type="button">Keluar</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .dashboard-layout {
        display: flex;
        min-height: 100vh;
        background-color: var(--pastel-bg);
    }

    .sidebar {
        width: 260px;
        background: #ffffff;
        border-right: 1px solid var(--pastel-border);
        display: flex;
        flex-direction: column;
        padding: 1.5rem 1.25rem;
        position: sticky;
        top: 0;
        height: 100vh;
        box-sizing: border-box;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        margin-bottom: 2rem;
        padding: 0.25rem 0.5rem;
    }

    .brand-icon {
        font-size: 1.5rem;
        background: var(--purple-soft);
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
    }

    .brand-info h2 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-main);
    }

    .brand-info p {
        margin: 0;
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .nav-menu {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        flex: 1;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        color: var(--text-muted);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .nav-item:hover {
        background: var(--pastel-bg);
        color: var(--text-main);
    }

    .nav-item.active {
        background: var(--mint-soft);
        color: var(--mint-text);
        font-weight: 600;
    }

    .sidebar-footer {
        padding-top: 1rem;
        border-top: 1px solid var(--pastel-border);
    }

    .user-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.6rem;
        background: var(--pastel-bg);
        border-radius: 12px;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .avatar {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: var(--peach-soft);
        color: var(--peach-text);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
    }

    .user-details p {
        margin: 0;
    }

    .user-name {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-main);
    }

    .user-role {
        font-size: 0.725rem;
        color: var(--text-muted);
    }

    .btn-logout-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: none;
        background: transparent;
        color: #94a3b8;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .btn-logout-icon:hover {
        background: #fef2f2;
        color: #ef4444;
    }

    .main-content {
        flex: 1;
        padding: 2rem 2.5rem;
        overflow-y: auto;
    }
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.35);
        backdrop-filter: blur(6px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-box {
        background: #ffffff;
        width: 100%;
        max-width: 360px;
        border-radius: 16px;
        padding: 1.25rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
        border: 1px solid rgba(226, 232, 240, 0.8);
        animation: slideUp 0.15s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-header {
        display: flex;
        align-items: flex-start;
        gap: 0.85rem;
        margin-bottom: 1.25rem;
    }

    .warning-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        background: #fef2f2;
        color: #ef4444;
        border-radius: 10px;
        flex-shrink: 0;
    }

    .modal-header h4 {
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #0f172a;
    }

    .modal-header p {
        margin: 0;
        font-size: 0.825rem;
        color: #64748b;
        line-height: 1.4;
    }

    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .btn-secondary, .btn-danger {
        padding: 0.5rem 0.9rem;
        border-radius: 8px;
        font-size: 0.825rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .btn-secondary {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        color: #475569;
    }

    .btn-secondary:hover {
        background: #f1f5f9;
        color: #0f172a;
    }

    .btn-danger {
        background: #ef4444;
        border: none;
        color: #ffffff;
    }

    .btn-danger:hover {
        background: #dc2626;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    @media (max-width: 900px) {
        .dashboard-layout {
            flex-direction: column;
        }
        .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            border-right: none;
            border-bottom: 1px solid var(--pastel-border);
        }
    }
</style>