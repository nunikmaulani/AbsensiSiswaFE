<script lang="ts">
	interface Props {
		onTambah: () => void;
	}

	let { onTambah }: Props = $props();
</script>

<div class="siswa-header">
	<div>
		<h1>Data Siswa</h1>
		<p>Kelola data siswa pada sistem absensi.</p>
	</div>
	<button
		class="btn-add"
		onclick={onTambah}
	>
		+ Tambah Siswa
	</button>
</div>