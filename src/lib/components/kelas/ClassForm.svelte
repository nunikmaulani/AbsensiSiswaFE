<script lang="ts">
	let { open = $bindable() } = $props();

	let namaKelas = $state('');
	let waliKelas = $state('');
	let jumlahSiswa = $state(0);

	function tutupModal() {
		open = false;
	}

	function simpanData() {
		console.log({
			namaKelas,
			waliKelas,
			jumlahSiswa
		});

		tutupModal();
	}
</script>

{#if open}

<div class="modal-overlay">

	<div class="modal">

		<h2>Tambah Kelas</h2>

		<div class="form-group">
			<label>
				<span>Nama kelas</span> 
			<input
				type="text"
				bind:value={namaKelas}
			/>
			</label>
		</div>

		<div class="form-group">
			<label>
				<span>Wali Kelas</span>W
			<input
				type="text"
				bind:value={waliKelas}
			/>
			</label>
		</div>

		<div class="form-group">
			<label>
				<span>Jumlah Siswa</span>

			<input
				type="number"
				bind:value={jumlahSiswa}
			/>
			</label>
		</div>

		<div class="modal-action">

			<button class="cancel" onclick={tutupModal}>
				Batal
			</button>

			<button class="save" onclick={simpanData}>
				Simpan
			</button>

		</div>

	</div>

</div>

{/if}