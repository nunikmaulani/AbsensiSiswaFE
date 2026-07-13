<script lang="ts">
	import { onMount } from 'svelte';

	let kelas = $state<any[]>([]);
	let filteredKelas = $state<any[]>([]);
	let loading = $state(true);
	let search = $state('');

	let totalKelas = $state(0);
	let totalSiswa = $state(0);
	let kelasAktif = $state(0);


	async function getKelas() {
		try {
			const token = localStorage.getItem('token');

			const response = await fetch('http://localhost:3000/kelas', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const result = await response.json();

			console.log(result);

			kelas = result.rows ?? [];
			filteredKelas = kelas;

			totalKelas = kelas.length;
			kelasAktif = kelas.length;

			totalSiswa = kelas.reduce(
				(total, item) => total + (item.jumlahSiswa ?? 0),
				0
			);

		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}


	function cariKelas() {
		const keyword = search.toLowerCase();

		filteredKelas = kelas.filter((item) =>
			item.namaKelas.toLowerCase().includes(keyword)
		);
	}


	onMount(() => {
		getKelas();
	});
</script>


<div class="page">


	<h1>
		📚 Data Kelas
	</h1>


	<!-- CARD -->
	<div class="cards">

		<div class="card hijau">
			<h3>Total Kelas</h3>
			<p>{totalKelas}</p>
		</div>


		<div class="card biru">
			<h3>Total Siswa</h3>
			<p>{totalSiswa}</p>
		</div>


		<div class="card kuning">
			<h3>Kelas Aktif</h3>
			<p>{kelasAktif}</p>
		</div>

	</div>



	<!-- SEARCH -->
	<div class="toolbar">

		<input
			type="text"
			placeholder="Cari kelas..."
			bind:value={search}
			oninput={cariKelas}
		/>


		<button class="tambah">
			+ Tambah Kelas
		</button>

	</div>




	{#if loading}

		<p>Loading data...</p>

	{:else}


	<table>

		<thead>

			<tr>
				<th>No</th>
				<th>Nama Kelas</th>
				<th>Wali Kelas</th>
				<th>Jumlah Siswa</th>
				<th>Aksi</th>
			</tr>

		</thead>



		<tbody>

			{#each filteredKelas as item, index}

				<tr>

					<td>{index + 1}</td>

					<td>
						{item.namaKelas}
					</td>


					<td>
						{item.namaGuru ?? '-'}
					</td>


					<td>
						{item.jumlahSiswa ?? 0}
					</td>


					<td>

						<button class="edit">
							✏️
						</button>


						<button class="hapus">
							🗑️
						</button>

					</td>

				</tr>


			{/each}

		</tbody>


	</table>


	{/if}


</div>



<style>

.page {
	padding: 25px;
}


h1 {
	font-size: 36px;
	margin-bottom: 35px;
	font-family: Georgia, serif;
}



/* CARD */

.cards {
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap: 30px;
	margin-bottom: 30px;
}


.card {
	height: 230px;
	border-radius: 20px;
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	color:white;
	font-family: Georgia, serif;
}


.card h3 {
	font-size:28px;
	margin-bottom:30px;
}


.card p {
	font-size:45px;
	font-weight:bold;
}


.hijau {
	background:#8bd3a8;
}


.biru {
	background:#91afe8;
}


.kuning {
	background:#ffd38f;
}





/* TOOLBAR */

.toolbar {
	display:flex;
	gap:20px;
	margin-bottom:30px;
}


input {
	flex:1;
	height:55px;
	padding:0 20px;
	font-size:18px;
	border:1px solid #ddd;
	border-radius:12px;
}


.tambah {
	background:#3568df;
	color:white;
	border:none;
	padding:0 30px;
	border-radius:12px;
	font-size:18px;
}





/* TABLE */

table {
	width:100%;
	border-collapse:collapse;
	font-family:Georgia, serif;
}


thead {
	background:#edf2fb;
}


th {
	text-align:left;
	padding:22px;
	font-size:22px;
}


td {
	padding:22px;
	font-size:20px;
	border-bottom:1px solid #eee;
}



.edit,
.hapus {

	width:55px;
	height:35px;
	margin-right:15px;
	background:white;
	border:1px solid #999;
	cursor:pointer;
	border-radius:4px;
	font-size:17px;

}


</style>