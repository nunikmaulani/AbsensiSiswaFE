<script lang="ts">
	import { onMount } from 'svelte';

	let jam = $state('');

	function updateJam() {
		jam = new Date().toLocaleTimeString('id-ID');
	}

	onMount(() => {
		updateJam();

		const interval = setInterval(updateJam, 1000);

		return () => clearInterval(interval);
	});

	const tanggal = new Date().toLocaleDateString('id-ID', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	const hour = new Date().getHours();

	let greeting = $state('Selamat Datang');

	if (hour < 11) {
		greeting = 'Selamat Pagi';
	} else if (hour < 15) {
		greeting = 'Selamat Siang';
	} else if (hour < 18) {
		greeting = 'Selamat Sore';
	} else {
		greeting = 'Selamat Malam';
	}
</script>

<div class="dashboard-header">

	<div>

		<h1>
			👋 {greeting}, Admin
		</h1>

		<p>
			Selamat datang di Sistem Informasi Absensi Siswa
		</p>

	</div>

	<div class="datetime">

		<p>📅 {tanggal}</p>

		<h2>{jam}</h2>

	</div>

</div>