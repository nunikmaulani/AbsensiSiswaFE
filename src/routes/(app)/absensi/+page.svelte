<script lang="ts">
	import '$lib/styles/absensi.css';
	import { onMount } from 'svelte';
	import AbsensiForm from '$lib/components/absensi/AbsensiForm.svelte';
	import AttendanceHistory from '$lib/components/absensi/AttendanceHistory.svelte';
	import { getRiwayatAbsensi } from '$lib/services/absensi';
	import type { RiwayatAbsensi } from '$lib/services/absensi';

	let riwayat = $state<RiwayatAbsensi[]>([]);
	let loading = $state(true);

	async function loadRiwayat() {
		try {
			riwayat = await getRiwayatAbsensi();
		} catch (err) {
			console.error(err);
		}
		loading = false;
	}
	onMount(loadRiwayat);
	const tanggal = new Date().toLocaleDateString('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
</script>
<div class="absensi-container">
	<header class="header-dashboard">
		<div >
			<h1>Absensi</h1>
			<p class="subtitle">Selamat datang kembali! Ringkasan aktivitas sekolah hari ini.</p>
		</div>
		<div class="date-badge">
			<span>📅</span>
			<span>{tanggal}</span>
		</div>
	</header>

	<AbsensiForm
		onSuccess={loadRiwayat}
	/>
	{#if loading}
		<p class="empty-data">
			Memuat data...
		</p>
	{:else}
		<AttendanceHistory
			riwayat={riwayat}
		/>
	{/if}
</div>