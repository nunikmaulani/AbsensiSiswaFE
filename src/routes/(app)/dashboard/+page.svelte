<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/styles/dashboard.css';
	import { getDashboard } from '$lib/services/dashboard';

	let totalGuru = $state(0);
	let totalSiswa = $state(0);
	let totalKelas = $state(0);
	let hadir = $state(0);
	let izin = $state(0);
	let sakit = $state(0);
	let alpha = $state(0);
	let grafik = $state<any[]>([]);
	let loading = $state(true);

	const tanggal = new Date().toLocaleDateString('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
    function handleQuickAction(action: string) {
		switch (action) {
			case 'presensi':
				console.log('Navigasi ke halaman input presensi');
				window.location.href = '/absensi';
				break;
                case 'siswa':
				window.location.href = '/siswa';
				console.log('Buka modal/halaman tambah siswa');
				break;
                case 'guru':
                    window.location.href = '/guru';
                    console.log('Proses cetak laporan');
				break;
			default:
				break;
		}
	}
	async function loadDashboard() {
		try {
			const data = await getDashboard();
			totalGuru = data.totalGuru;
			totalSiswa = data.totalSiswa;
			totalKelas = data.totalKelas;
			hadir = data.ringkasan.hadir;
			izin = data.ringkasan.izin;
			sakit = data.ringkasan.sakit;
			alpha = data.ringkasan.alpha;
			grafik = data.grafik;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}
	onMount(loadDashboard);
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="dashboard">
	<header class="header-dashboard">
		<div>
			<h1>Dashboard Utama</h1>
			<p class="subtitle">Selamat datang kembali! Ringkasan aktivitas sekolah hari ini.</p>
		</div>
		<div class="date-badge">
			<span>📅</span>
			<span>{tanggal}</span>
		</div>
	</header>
	{#if loading}
		<div class="loading">
			<div class="spinner"></div>
			<p>Memuat Dashboard...</p>
		</div>
	{:else}	
		<div class="cards">
			<div class="stat-card" style="--accent-bg: var(--mint-soft)">
				<div class="card-icon">👨‍🏫</div>
				<div class="card-info">
					<span class="card-title">Total Guru</span>
					<h3 class="card-value">{totalGuru}</h3>
				</div>
			</div>
			<div class="stat-card" style="--accent-bg: var(--peach-soft)">
				<div class="card-icon">👨‍🎓</div>
				<div class="card-info">
					<span class="card-title">Total Siswa</span>
					<h3 class="card-value">{totalSiswa}</h3>
				</div>
			</div>
			<div class="stat-card" style="--accent-bg: var(--purple-soft)">
				<div class="card-icon">🏫</div>
				<div class="card-info">
					<span class="card-title">Total Kelas</span>
					<h3 class="card-value">{totalKelas}</h3>
				</div>
			</div>
			<div class="stat-card" style="--accent-bg: var(--blue-soft)">
				<div class="card-icon">✅</div>
				<div class="card-info">
					<span class="card-title">Hadir Hari Ini</span>
					<h3 class="card-value">{hadir}</h3>
				</div>
			</div>
		</div>
		<div class="dashboard-grid">			
			<div class="content-column">				
				<div class="widget-card">
					<h3 class="widget-title">📌 Ringkasan Presensi Hari Ini</h3>
					<div class="attendance-summary">
						<div class="summary-box hadir-box">
							<span class="box-label">Hadir</span>
							<span class="box-count">{hadir}</span>
						</div>
						<div class="summary-box izin-box">
							<span class="box-label">Izin</span>
							<span class="box-count">{izin}</span>
						</div>
						<div class="summary-box sakit-box">
							<span class="box-label">Sakit</span>
							<span class="box-count">{sakit}</span>
						</div>
						<div class="summary-box alpha-box">
							<span class="box-label">Alpha</span>
							<span class="box-count">{alpha}</span>
						</div>
					</div>
				</div>				
				<div class="widget-card">
					<div class="widget-header">
						<h3 class="widget-title">📈 Grafik Kehadiran</h3>
						<span class="badge">Minggu Ini</span>
					</div>
					<div class="attendance-chart">
						{#if grafik.length > 0}
							<div class="chart-bars">
								{#each grafik as item}
									<div class="bar-group">
										<div class="bar-track">
											<div class="bar-fill" style="height: {item.jumlah || 50}%"></div>
										</div>
										<span class="bar-label">{item.hari || item.label || '-'}</span>
									</div>
								{/each}
							</div>
						{:else}
							<div class="empty-chart">
								<p>Belum ada data grafik kehadiran.</p>
							</div>
						{/if}
					</div>
				</div>
			</div>		
			<div class="content-column">			
				<div class="widget-card">
					<h3 class="widget-title">⚡ Aksi Cepat</h3>
					<div class="quick-actions">
						<button class="action-btn" onclick={() => handleQuickAction('presensi')}>
							<span class="btn-icon">➕</span>
							<span>Input Presensi</span>
						</button>
						<button class="action-btn" onclick={() => handleQuickAction('siswa')}>
							<span class="btn-icon">👤</span>
							<span>Tambah Siswa</span>
						</button>
						<button class="action-btn" onclick={() => handleQuickAction('guru')}>
							<span class="btn-icon">📄</span>
							<span>Tambah Guru</span>
						</button>
					</div>
				</div>
				<div class="widget-card">
					<h3 class="widget-title">💻 Informasi Sistem</h3>
					<div class="system-info">
						<div class="info-row">
							<span>Status Server</span>
							<span class="status-online">● Normal</span>
						</div>
						<div class="info-row">
							<span>Versi Sistem</span>
							<span class="info-value">v2.4.0</span>
						</div>
						<div class="info-row">
							<span>Database</span>
							<span class="info-value">Terhubung</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.header-dashboard {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		padding: 1.5rem 1.75rem;
		border-radius: 18px;
		border: 1px solid var(--pastel-border);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.01);
	}
	.header-dashboard h1 {
		margin: 0;
		font-size: 1.5rem;
		color: var(--text-main);
	}
	.subtitle {
		margin: 0.25rem 0 0 0;
		font-size: 0.875rem;
		color: var(--text-muted);
	}
	.date-badge {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--pastel-bg);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-main);
	}
	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem;
		background: #ffffff;
		border-radius: 18px;
		border: 1px solid var(--pastel-border);
		color: var(--text-muted);
	}
	.spinner {
		width: 36px;
		height: 36px;
		border: 3px solid var(--pastel-border);
		border-top-color: var(--purple-text);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
		margin-bottom: 0.75rem;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.25rem;
	}
	.stat-card {
		background: #ffffff;
		padding: 1.25rem;
		border-radius: 16px;
		display: flex;
		align-items: center;
		gap: 1rem;
		border: 1px solid var(--pastel-border);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.015);
	}
	.card-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background-color: var(--accent-bg);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		flex-shrink: 0;
	}
	.card-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.card-title {
		font-size: 0.825rem;
		color: var(--text-muted);
		font-weight: 500;
	}
	.card-value {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--text-main);
	}
	.dashboard-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 1.5rem;
	}
	.content-column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.widget-card {
		background: #ffffff;
		padding: 1.5rem;
		border-radius: 18px;
		border: 1px solid var(--pastel-border);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.01);
	}
	.widget-title {
		margin: 0 0 1.25rem 0;
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-main);
	}
	.widget-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.25rem;
	}
	.widget-header .widget-title {
		margin: 0;
	}
	.badge {
		background: var(--blue-soft);
		color: var(--blue-text);
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0.3rem 0.75rem;
		border-radius: 12px;
	}
	.attendance-summary {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.75rem;
	}
	.summary-box {
		padding: 0.85rem;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}
	.box-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}
	.box-count {
		font-size: 1.25rem;
		font-weight: 700;
	}
	.hadir-box { background: var(--mint-soft); color: var(--mint-text); }
	.izin-box  { background: var(--blue-soft); color: var(--blue-text); }
	.sakit-box { background: var(--yellow-soft); color: var(--yellow-text); }
	.alpha-box { background: var(--peach-soft); color: var(--peach-text); }
	.attendance-chart {
		min-height: 180px;
		display: flex;
		align-items: flex-end;
	}
	.chart-bars {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		width: 100%;
		height: 160px;
		gap: 0.5rem;
	}
	.bar-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		height: 100%;
		flex: 1;
	}
	.bar-track {
		width: 28px;
		height: 100%;
		background: var(--pastel-bg);
		border-radius: 8px;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
	}
	.bar-fill {
		width: 100%;
		background: var(--purple-soft);
		border-top: 3px solid var(--purple-text);
		border-radius: 8px 8px 0 0;
		transition: height 0.3s ease;
	}
	.bar-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}
	.empty-chart {
		width: 100%;
		text-align: center;
		color: var(--text-muted);
		font-size: 0.875rem;
		padding: 2rem 0;
	}
	.quick-actions {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}
	.action-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--pastel-border);
		background: var(--pastel-bg);
		border-radius: 12px;
		color: var(--text-main);
		font-weight: 600;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.action-btn:hover {
		background: #ffffff;
		border-color: var(--purple-text);
		transform: translateY(-1px);
	}
	.btn-icon {
		font-size: 1rem;
	}
	.system-info {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.info-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.85rem;
		color: var(--text-muted);
		padding-bottom: 0.5rem;
		border-bottom: 1px dashed var(--pastel-border);
	}
	.info-row:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.status-online {
		color: var(--mint-text);
		font-weight: 600;
	}
	.info-value {
		color: var(--text-main);
		font-weight: 600;
	}
	@media (max-width: 900px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
		}
		.header-dashboard {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
		.attendance-summary {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>