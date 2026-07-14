<script lang="ts">
	import type { Guru } from '$lib/services/guru';
	import type { Kelas } from '$lib/services/kelas';
	import { createKelas, updateKelas } from '$lib/services/kelas';

	interface Props {
		open: boolean;
		kelas: Kelas | null;
		guru: Guru[];
		onClose: () => void;
		onSuccess: () => void;
	}

	let {
		open,
		kelas,
		guru,
		onClose,
		onSuccess
	}: Props = $props();

	let namaKelas = $state('');
	let guruId = $state('');

	$effect(() => {
		if (kelas) {
			namaKelas = kelas.namaKelas;
			guruId = String(kelas.guruId);
		} else {
			namaKelas = '';
			guruId = '';
		}
	});

	async function simpanKelas() {
		if (!namaKelas.trim() || !guruId) {
			alert('Semua data wajib diisi.');
			return;
		}

		try {
			const payload = {
				namaKelas,
				guruId: Number(guruId)
			};

			if (kelas) {
				await updateKelas(kelas.id, payload);
				alert('Data kelas berhasil diperbarui.');
			} else {
				await createKelas(payload);
				alert('Data kelas berhasil ditambahkan.');
			}

			onSuccess();
			onClose();

		} catch (error) {
			alert(
				error instanceof Error
					? error.message
					: 'Terjadi kesalahan.'
			);
		}
	}
</script>

{#if open}
<div class="modal-overlay">

	<div class="modal">

		<h2>
			{kelas ? 'Edit Kelas' : 'Tambah Kelas'}
		</h2>

		<div class="form-group">
			<label for="nama kelas">Nama Kelas</label>

			<input
				type="text"
				class="search-input"
				bind:value={namaKelas}
				placeholder="Masukkan nama kelas"
			/>
		</div>

		<div class="form-group">
			<label for="wali kelas">Wali Kelas</label>

			<select
				class="select-kelas"
				bind:value={guruId}
			>

				<option value="">
					-- Pilih Guru --
				</option>

				{#each guru as item}

					<option value={item.id}>
						{item.namaGuru}
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
				onclick={simpanKelas}
			>
				{kelas ? 'Update' : 'Simpan'}
			</button>

		</div>

	</div>

</div>
{/if}