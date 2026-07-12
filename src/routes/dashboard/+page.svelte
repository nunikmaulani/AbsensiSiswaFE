<script lang="ts">
	import { onMount } from 'svelte';

	let totalGuru = $state(0);
    let totalSiswa = $state(0);
    let totalKelas = $state(0);
    let totalAbsensi = $state(0);

	async function loadDashboard() {
		try {
			const token = localStorage.getItem('token');

			const [guruRes, siswaRes, kelasRes, absensiRes] = await Promise.all([
				fetch('http://localhost:3000/guru', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				}),
				fetch('http://localhost:3000/siswa', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				}),
				fetch('http://localhost:3000/kelas', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				}),
				fetch('http://localhost:3000/absensi', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
			]);

			if (guruRes.ok) {
				const data = await guruRes.json();
				totalGuru = data.count;
			}

			if (siswaRes.ok) {
				const data = await siswaRes.json();
				totalSiswa = data.count;
			}

			if (kelasRes.ok) {
				const data = await kelasRes.json();
				totalKelas = data.count;
			}

			if (absensiRes.ok) {
				const data = await absensiRes.json();
				totalAbsensi = data.count;
			}
		} catch (err) {
			console.log(err);
		}
	}

	onMount(loadDashboard);
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="dashboard">

	<h1>Dashboard</h1>

	<p class="subjudul">
		Selamat Datang di Sistem Informasi Absensi Siswa
	</p>

	<div class="card-container">

		<div class="card">
			<h3>Total Guru</h3>
			<h2>{totalGuru}</h2>
		</div>

		<div class="card">
			<h3>Total Siswa</h3>
			<h2>{totalSiswa}</h2>
		</div>

		<div class="card">
			<h3>Total Kelas</h3>
			<h2>{totalKelas}</h2>
		</div>

		<div class="card">
			<h3>Total Absensi</h3>
			<h2>{totalAbsensi}</h2>
		</div>

	</div>

	<div class="informasi">

		<h2>Informasi Sistem</h2>

		<table>
			<tbody>
				<tr>
					<td>Nama Aplikasi</td>
					<td>Sistem Informasi Absensi Siswa</td>
				</tr>

				<tr>
					<td>Frontend</td>
					<td>SvelteKit</td>
				</tr>

				<tr>
					<td>Backend</td>
					<td>Express JS</td>
				</tr>

				<tr>
					<td>Database</td>
					<td>MySQL</td>
				</tr>
			</tbody>
		</table>

	</div>

</div>

<style>
.dashboard{
	padding:20px;
}
h1{
	margin-bottom:5px;
	color:#1565c0;
}
.subjudul{
	color:#666;
	margin-bottom:30px;
}
.card-container{
	display:grid;
	grid-template-columns:repeat(4,1fr);
	gap:20px;
	margin-bottom:30px;
}
.card{
	background:white;
	padding:20px;
	border-radius:10px;
	box-shadow:0 2px 8px rgba(0,0,0,.1);
	text-align:center;
}
.card h3{
	margin:0;
	color:#555;
	font-weight:normal;
}
.card h2{
	margin-top:15px;
	font-size:40px;
	color:#1976d2;
}
.informasi{
	background:white;
	padding:20px;
	border-radius:10px;
	box-shadow:0 2px 8px rgba(0,0,0,.1);
}
.informasi h2{
	margin-top:0;
	color:#1976d2;
}
table{
	width:100%;
	border-collapse:collapse;
	margin-top:15px;
}
td{
	padding:12px;
	border-bottom:1px solid #ddd;
}
td:first-child{
	font-weight:bold;
	width:220px;
}
@media(max-width:900px){

	.card-container{
		grid-template-columns:repeat(2,1fr);
	}

}
@media(max-width:600px){

	.card-container{
		grid-template-columns:1fr;
	}

}
</style>