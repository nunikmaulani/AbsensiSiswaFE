<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createSiswa,
		updateSiswa,
		getDaftarKelas
	} from '$lib/services/siswa';
	import type {
		Siswa,
		Kelas
	} from '$lib/services/siswa';

	interface Props {
		open: boolean;
		siswa: Siswa | null;
		onClose: () => void;
		onSuccess: () => void;
	}

	let {
		open,
		siswa,
		onClose,
		onSuccess
	}: Props = $props();
	let namaSiswa = $state('');
	let nisSiswa = $state('');
	let jenisKelamin = $state<'Laki-laki' | 'Perempuan'>('Laki-laki');
	let kelasId = $state('');
	let daftarKelas = $state<Kelas[]>([]);

	onMount(async () => {
		try {
			daftarKelas = await getDaftarKelas();
		} catch (err) {
			console.error(err);
		}
	});

	$effect(() => {
		if (open && siswa) {
			namaSiswa = siswa.namaSiswa;
			nisSiswa = siswa.nisSiswa;
			jenisKelamin = siswa.jenisKelamin;
			kelasId = String(siswa.kelasId);
		}
		else if (open) {
			namaSiswa = '';
			nisSiswa = '';
			jenisKelamin = 'Laki-laki';
			kelasId = '';
		}
	});

	async function simpanSiswa() {
		if (
			!namaSiswa.trim() ||
			!nisSiswa.trim() ||
			!kelasId
		) {
			alert('Semua data wajib diisi.');
			return;
		}
		const payload = {
			namaSiswa,
			nisSiswa,
			jenisKelamin,
			kelasId: Number(kelasId)
		};
		try {
			if (siswa) {
				await updateSiswa(
					siswa.id,
					payload
				);
				alert('Data siswa berhasil diperbarui.');
			}
			else {
				await createSiswa(payload);
				alert('Data siswa berhasil ditambahkan.');
			}
			onSuccess();
			onClose();
		}
		catch (err) {
			alert(
				err instanceof Error
					? err.message
					: 'Terjadi kesalahan.'
			);
		}
	}
</script>

{#if open}
<div class="modal-overlay">
	<div class="modal">
		<h2>
			{siswa ? 'Edit Siswa' : 'Tambah Siswa'}
		</h2>
		<div class="form-group">
			<label for="nama siswa">Nama Siswa</label>
			<input
                id="nama siswa"
				type="text"
				bind:value={namaSiswa}
				class="search-input"
			/>
		</div>
		<div class="form-group">
			<label for="nis">NIS</label>
			<input
                id="nis"
				type="text"
				bind:value={nisSiswa}
				class="search-input"
			/>
		</div>
		<div class="form-group">
			<label for="jenis_kelamin">Jenis Kelamin</label>
			<select
				bind:value={jenisKelamin}
				class="select-siswa"
			>
				<option value="Laki-laki">
					Laki-laki
				</option>
				<option value="Perempuan">
					Perempuan
				</option>
			</select>
		</div>
		<div class="form-group">
			<label for="kelas">Kelas</label>
			<select
				bind:value={kelasId}
				class="select-siswa"
			>
				<option value="">
					-- Pilih Kelas --
				</option>
				{#each daftarKelas as kelas}
					<option value={String(kelas.id)}>
						{kelas.namaKelas}
					</option>
				{/each}
			</select>
		</div>
		<div class="modal-button">
			<button
				class="btn-cancel"
				onclick={onClose}
			>
				Batal
			</button>
			<button
				class="btn-save"
				onclick={simpanSiswa}
			>
				{siswa ? 'Update' : 'Simpan'}
			</button>
		</div>
	</div>
</div>
{/if}