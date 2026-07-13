<script lang="ts">
	interface Props {
		onTambah: () => void;
	}

	let { onTambah }: Props = $props();
</script>

<div class="guru-header">
	<div>
		<h1>Data Guru</h1>
		<p>Kelola data guru yang terdaftar pada sistem absensi siswa.</p>
	</div>

	<button
		class="btn-add"
		onclick={onTambah}
	>
		+ Tambah Guru
	</button>
</div>