<script lang="ts">
	interface Props {
		open: boolean;
		namaSiswa: string;
		onClose: () => void;
		onDelete: () => void;
	}

	let {
		open,
		namaSiswa,
		onClose,
		onDelete
	}: Props = $props();
</script>

{#if open}
<div class="modal-overlay">
	<div class="modal delete-modal">
		<h2>Hapus Data Siswa</h2>
		<p>
			Apakah yakin ingin menghapus siswa
			<b>{namaSiswa}</b>?
		</p>
		<div class="modal-button">
			<button
				class="btn-cancel"
				onclick={onClose}
			>
				Batal
			</button>
			<button
				class="btn-delete"
				onclick={onDelete}
			>
				Hapus
			</button>
		</div>
	</div>
</div>
{/if}