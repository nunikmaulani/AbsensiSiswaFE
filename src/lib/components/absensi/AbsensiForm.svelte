<script lang="ts">
	import '$lib/styles/absensi.css';

	import {
		getKelas,
		getSiswaByKelas,
		simpanAbsensi
	} from '$lib/services/absensi';
	
	import type {
		Kelas,
		SiswaAbsensi
	} from '$lib/services/absensi';

	interface Props {
		onSuccess: () => void;
	}

	let { onSuccess }: Props = $props();
	let tanggal = $state(
		new Date().toISOString().substring(0, 10)
	);
	let kelasId = $state('');
	let daftarKelas = $state<Kelas[]>([]);
	let daftarSiswa = $state<SiswaAbsensi[]>([]);
	let loading = $state(false);

	async function loadKelas() {
		try {
			daftarKelas = await getKelas();
		} catch (err) {
			console.error(err);
		}
	}
	async function loadSiswa() {

		if (!kelasId) {
			daftarSiswa = [];
			return;
		}

		try {
			daftarSiswa = await getSiswaByKelas(Number(kelasId));
			daftarSiswa = daftarSiswa.map((item) => ({
				...item,
				status: 'Hadir'
			}));
		} catch (err) {
			console.error(err);
		}
	}
	$effect(() => {
		loadSiswa();
	});
	$effect(() => {
		loadKelas();
	});
	async function simpan() {
		if (!kelasId) {
			alert('Pilih kelas terlebih dahulu.');
			return;
		}
		loading = true;
		try {
			for (const siswa of daftarSiswa) {
				await simpanAbsensi({
					tanggal,
					kelasId: Number(kelasId),
					siswaId: siswa.id,
					status: siswa.status ?? 'Hadir'
				});
			}
			alert('Absensi berhasil disimpan.');
			onSuccess();
		} catch (err) {
			alert(
				err instanceof Error
					? err.message
					: 'Terjadi kesalahan.'
			);
		}
		loading = false;
	}
</script>

<div class="form-card">
	<div class="form-row">
		<div class="form-group">
			<label for="tanggal">
                Tanggal
            </label>
            <input
                id="tanggal"
                type="date"
                bind:value={tanggal}
            />
		</div>
		<div class="form-group">
			<label for="kelas">
                Kelas
            </label>
            <select
                id="kelas"
                bind:value={kelasId}
            >
				<option value="">
					-- Pilih Kelas --
				</option>
				{#each daftarKelas as kelas}
					<option value={kelas.id}>
						{kelas.namaKelas}
					</option>
				{/each}
			</select>
		</div>
	</div>
	{#if daftarSiswa.length > 0}
	<div class="table-container">
	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Nama Siswa</th>
				<th>NIS</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each daftarSiswa as item, index}
			<tr>
				<td>{index + 1}</td>
				<td>{item.namaSiswa}</td>
				<td>{item.nisSiswa}</td>
				<td>
					<select
						class="status-select"
						bind:value={item.status}
					>
						<option>Hadir</option>
						<option>Sakit</option>
						<option>Izin</option>
						<option>Alpha</option>
					</select>
				</td>
			</tr>
			{/each}
		</tbody>
	</table>
	</div>
	<div class="button-area">
		<button
			class="btn-save"
			onclick={simpan}
			disabled={loading}
		>
			{loading
				? 'Menyimpan...'
				: 'Simpan Absensi'}
		</button>
	</div>
	{/if}
</div>