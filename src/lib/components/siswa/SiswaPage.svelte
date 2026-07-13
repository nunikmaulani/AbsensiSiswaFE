<script lang="ts">
	import { onMount } from 'svelte';

	import '$lib/styles/siswa.css';

	import SiswaHeader from './SiswaHeader.svelte';
	import SiswaModal from './SiswaModal.svelte';
	import DeleteSiswaModal from './DeleteSiswaModal.svelte';

	import {
		getSiswa,
		getDaftarKelas,
		deleteSiswa
	} from '$lib/services/siswa';

	import type {
		Siswa,
		Kelas
	} from '$lib/services/siswa';

	let daftarSiswa = $state<Siswa[]>([]);
	let daftarKelas = $state<Kelas[]>([]);

	let keyword = $state('');

	let modalTerbuka = $state(false);
	let modalDelete = $state(false);

	let siswaDipilih = $state<Siswa | null>(null);

	async function loadData() {
		try {

			daftarSiswa = await getSiswa();
			daftarKelas = await getDaftarKelas();

		} catch (err) {
			console.error(err);
			alert('Gagal mengambil data.');
		}
	}

	onMount(loadData);
	function handleTambah() {
		siswaDipilih = null;
		modalTerbuka = true;
	}
	function handleEdit(siswa: Siswa) {
		siswaDipilih = siswa;
		modalTerbuka = true;
	}
	function handleHapus(siswa: Siswa) {
		siswaDipilih = siswa;
		modalDelete = true;
	}

	async function konfirmasiHapus() {
		if (!siswaDipilih) return;
		try {

			await deleteSiswa(siswaDipilih.id);

			alert('Data berhasil dihapus.');

			modalDelete = false;

			await loadData();
		}

		catch (err) {

			alert(
				err instanceof Error
					? err.message
					: 'Terjadi kesalahan.'
			);
		}
	}

	function namaKelas(id: number) {
		const kelas = daftarKelas.find(
			(k) => k.id === id
		);
		return kelas?.namaKelas ?? '-';
	}

	const hasilPencarian = $derived(
		daftarSiswa.filter((siswa) =>

			siswa.namaSiswa
				.toLowerCase()
				.includes(keyword.toLowerCase())
		)
	);
</script>

<div class="siswa-container">

	<SiswaHeader
		onTambah={handleTambah}
	/>

	<div class="siswa-toolbar">

		<input
			type="text"
			class="search-input"
			placeholder="🔍 Cari nama siswa..."
			bind:value={keyword}
		/>

	</div>

	<div class="table-container">

		<table>

			<thead>

				<tr>

					<th>No</th>
					<th>Nama Siswa</th>
					<th>NIS</th>
					<th>Jenis Kelamin</th>
					<th>Kelas</th>
					<th>Aksi</th>

				</tr>

			</thead>

			<tbody>

				{#each hasilPencarian as siswa, index}

					<tr>

						<td>{index + 1}</td>

						<td>{siswa.namaSiswa}</td>

						<td>{siswa.nisSiswa}</td>

						<td>

							<span
								class="badge-jk {siswa.jenisKelamin === 'Laki-laki'
									? 'jk-laki'
									: 'jk-perempuan'}"
							>

								{siswa.jenisKelamin}

							</span>

						</td>

						<td>

							{namaKelas(siswa.kelasId)}

						</td>

						<td class="aksi">

							<button
								class="btn-edit"
								onclick={() => handleEdit(siswa)}
							>
								Edit
							</button>

							<button
								class="btn-delete"
								onclick={() => handleHapus(siswa)}
							>
								Hapus
							</button>

						</td>

					</tr>

				{:else}

					<tr>

						<td
							colspan="6"
							class="empty-data"
						>
							Data siswa tidak ditemukan.
						</td>

					</tr>

				{/each}

			</tbody>

		</table>

	</div>

</div>

<SiswaModal
	open={modalTerbuka}
	siswa={siswaDipilih}
	onClose={() => (modalTerbuka = false)}
	onSuccess={loadData}
/>

<DeleteSiswaModal
	open={modalDelete}
	namaSiswa={siswaDipilih?.namaSiswa ?? ''}
	onClose={() => (modalDelete = false)}
	onDelete={konfirmasiHapus}
/>