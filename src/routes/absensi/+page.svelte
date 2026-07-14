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
</script>

<div class="absensi-container">

	<div class="absensi-header">

		<div>

			<h1>Data Absensi</h1>

			<p>
				Kelola absensi siswa berdasarkan kelas
			</p>

		</div>

	</div>

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