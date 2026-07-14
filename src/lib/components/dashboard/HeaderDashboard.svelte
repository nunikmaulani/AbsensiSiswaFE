<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	function logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('namaGuru');
		localStorage.removeItem('emailGuru');
		localStorage.removeItem('guruId');

		goto('/auth/login');
	}

	let jam = $state('');
	let namaGuru = $state('Admin');

	function updateJam() {
		jam = new Date().toLocaleTimeString('id-ID');
	}

	onMount(() => {

		namaGuru =
			localStorage.getItem('namaGuru') || 'Admin';

		updateJam();

		const interval =
			setInterval(updateJam, 1000);

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
			👋 {greeting}, {namaGuru}
		</h1>

		<p>
			Selamat datang di Sistem Informasi Absensi Siswa
		</p>

	</div>

	<div class="header-right">

		<div class="datetime">

			<p>📅 {tanggal}</p>

			<h2>{jam}</h2>

		</div>

		<button
			class="logout-btn"
			onclick={logout}
		>
			🚪 Logout
		</button>

	</div>

</div>