<script lang="ts">
	import '$lib/styles/absensi.css';
	import type { RiwayatAbsensi } from '$lib/services/absensi';

	interface Props {
		riwayat: RiwayatAbsensi[];
	}

	let { riwayat }: Props = $props();

	function formatTanggal(tanggal: string) {
		return new Date(tanggal).toLocaleDateString('id-ID');
	}
</script>

<div class="history-card">

	<h2>Riwayat Absensi</h2>

	<div class="table-container">

		<table>

			<thead>

				<tr>

					<th>No</th>
					<th>Tanggal</th>
					<th>Kelas</th>

				</tr>

			</thead>

			<tbody>

				{#if riwayat.length > 0}

					{#each riwayat as item, index}

						<tr>

							<td>{index + 1}</td>

							<td>{formatTanggal(item.tanggal)}</td>

							<td>{item.namaKelas}</td>

						</tr>

					{/each}

				{:else}

					<tr>

						<td
							colspan="3"
							class="empty-data"
						>

							Belum ada riwayat absensi.

						</td>

					</tr>

				{/if}

			</tbody>

		</table>

	</div>

</div>