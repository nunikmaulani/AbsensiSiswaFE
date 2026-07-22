<script lang="ts">
	import '$lib/styles/kelas.css';
	import { onMount } from 'svelte';
	import KelasModal from '$lib/components/kelas/KelasModal.svelte';

	import {
		getKelas,
		deleteKelas,
		type Kelas
	} from '$lib/services/kelas';

	import {
		getGuru,
		type Guru
	} from '$lib/services/guru';

	let daftarKelas = $state<Kelas[]>([]);
	let daftarGuru = $state<Guru[]>([]);
	let loading = $state(true);
	let search = $state('');
	let modalOpen = $state(false);
	let selectedKelas = $state<Kelas | null>(null);

	const hasilPencarian = $derived(
		daftarKelas.filter((kelas) =>
			kelas.namaKelas
				.toLowerCase()
				.includes(search.toLowerCase())
		)
	);
	const totalKelas = $derived(
		daftarKelas.length
	);
	const totalSiswa = $derived(
		daftarKelas.reduce(
			(total, item) => total + item.jumlahSiswa,
			0
		)
	);
	const kelasAktif = $derived(
		daftarKelas.length
	);

	async function loadData() {
		try {
			loading = true;
			daftarKelas = await getKelas();
			daftarGuru = await getGuru();
		} catch (error) {
			alert(
				error instanceof Error
					? error.message
					: 'Gagal memuat data.'
			);
		} finally {
			loading = false;
		}
	}
	function handleTambahKelas() {
		selectedKelas = null;
		modalOpen = true;
	}
	function handleEditKelas(kelas: Kelas) {
		selectedKelas = kelas;
		modalOpen = true;
	}
	async function handleHapusKelas(id: number, nama: string) {
		if (!confirm(`Hapus kelas "${nama}"?`)) return;
		try {
			await deleteKelas(id);
			alert('Data kelas berhasil dihapus.');
			loadData();
		} catch (error) {
			alert(
				error instanceof Error
					? error.message
					: 'Gagal menghapus data.'
			);
		}
	}
	onMount(loadData);
</script>

<div class="kelas-container">
	<div class="kelas-header">
		<div>
			<h1>Data Kelas</h1>
			<p>Kelola data kelas pada sistem absensi siswa.</p>
		</div>

		<button
			class="btn-add"
			onclick={handleTambahKelas}
		>
			+ Tambah Kelas
		</button>
	</div>
	<div class="kelas-summary">
		<div class="summary-card">
			<h3>Total Kelas</h3>
			<h2>{totalKelas}</h2>
		</div>
		<div class="summary-card">
			<h3>Total Siswa</h3>
			<h2>{totalSiswa}</h2>
		</div>
		<div class="summary-card">
			<h3>Kelas Aktif</h3>
			<h2>{kelasAktif}</h2>
		</div>
	</div>
	<div class="kelas-toolbar">
		<input
			class="search-input"
			type="text"
			placeholder="🔍 Cari kelas..."
			bind:value={search}
		/>
	</div>
	<div class="table-container">
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
				{#if loading}
					<tr>
						<td colspan="5" class="empty-data">
							Loading...
						</td>
					</tr>
				{:else}
					{#each hasilPencarian as kelas, index}
						<tr>
							<td>{index + 1}</td>
							<td>{kelas.namaKelas}</td>
							<td>{kelas.namaGuru}</td>
							<td>{kelas.jumlahSiswa}</td>
							<td>
								<button
									class="btn-edit"
									onclick={() => handleEditKelas(kelas)}
								>
									Edit
								</button>
								<button
									class="btn-delete"
									onclick={() => handleHapusKelas(kelas.id, kelas.namaKelas)}
								>
									Hapus
								</button>
							</td>
						</tr>
					{:else}
						<tr>
							<td
								colspan="5"
								class="empty-data"
							>
								Data kelas tidak ditemukan.
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

<KelasModal
	open={modalOpen}
	kelas={selectedKelas}
	guru={daftarGuru}
	onClose={() => (modalOpen = false)}
	onSuccess={loadData}
/>