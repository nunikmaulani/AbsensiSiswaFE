<script lang="ts">
	import '$lib/styles/absensi.css';
	import {
		getAbsensiByKelasTanggal,
		updateAbsensi
	} from '$lib/services/absensi';
	import type {
		RiwayatAbsensi,
		Absensi
	} from '$lib/services/absensi';

	interface Props {
		riwayat: RiwayatAbsensi[];
	}

	let { riwayat }: Props = $props();

	let absensiDetail = $state<Absensi[]>([]);
	let loadingDetail = $state(false);
	let selectedKelasId = $state<number | null>(null);
	let selectedTanggal = $state('');
	let selectedNamaKelas = $state('');
	let editingId = $state<number | null>(null);
	let editStatusValue = $state('');
	let saving = $state(false);

	function formatTanggal(tanggal: string) {
		return new Date(tanggal).toLocaleDateString('id-ID');
	}

	async function lihatAbsensi(item: RiwayatAbsensi) {
		try {
			loadingDetail = true;

			selectedKelasId = item.kelasId;
			selectedTanggal = item.tanggal;
			selectedNamaKelas = item.namaKelas;

			absensiDetail = await getAbsensiByKelasTanggal(
				item.kelasId,
				item.tanggal.substring(0, 10)
			);
		} catch (error) {
			console.error(error);

			alert(
				error instanceof Error
					? error.message
					: 'Gagal mengambil data absensi'
			);
		} finally {
			loadingDetail = false;
		}
	}

	function mulaiEdit(item: Absensi) {
		editingId = item.id;
		editStatusValue = item.status;
	}

	function batalEdit() {
		editingId = null;
		editStatusValue = '';
	}

	async function simpanEdit(item: Absensi) {
		if (!editStatusValue) {
			alert('Status wajib dipilih.');
			return;
		}

		try {
			saving = true;

			await updateAbsensi(item.id, {
				siswaId: item.siswaId,
				guruId: item.guruId,
				tanggal: item.tanggal,
				status: editStatusValue
			});

			alert('Status absensi berhasil diperbarui.');

			editingId = null;
			editStatusValue = '';

			if (selectedKelasId !== null) {
				absensiDetail = await getAbsensiByKelasTanggal(
					selectedKelasId,
					selectedTanggal.substring(0, 10)
				);
			}
		} catch (error) {
			alert(
				error instanceof Error
					? error.message
					: 'Gagal memperbarui absensi'
			);
		} finally {
			saving = false;
		}
	}

	function tutupDetail() {
		absensiDetail = [];
		selectedKelasId = null;
		selectedTanggal = '';
		selectedNamaKelas = '';
		editingId = null;
		editStatusValue = '';
	}
</script>

{#if selectedKelasId === null}

	<div class="history-card">

		<h2>Riwayat Absensi</h2>

		<div class="table-container">

			<table>

				<thead>
					<tr>
						<th>No</th>
						<th>Tanggal</th>
						<th>Kelas</th>
						<th>Aksi</th>
					</tr>
				</thead>

				<tbody>

					{#if riwayat.length > 0}

						{#each riwayat as item, index}

							<tr>
								<td>{index + 1}</td>

								<td>
									{formatTanggal(item.tanggal)}
								</td>

								<td>
									{item.namaKelas}
								</td>

								<td>
									<button
										type="button"
										class="edit-button"
										onclick={() => lihatAbsensi(item)}
									>
										Lihat
									</button>
								</td>
							</tr>

						{/each}

					{:else}

						<tr>
							<td
								colspan="4"
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

{:else}

	<div class="history-card">

		<div class="detail-header">

			<div>

				<h2>Detail Absensi</h2>

				<p>
					Kelas:
					<strong>{selectedNamaKelas}</strong>
				</p>

				<p>
					Tanggal:
					<strong>
						{formatTanggal(selectedTanggal)}
					</strong>
				</p>

			</div>

			<button
				type="button"
				class="delete-button"
				onclick={tutupDetail}
			>
				← Kembali
			</button>

		</div>

		{#if loadingDetail}

			<p class="empty-data">
				Memuat data absensi...
			</p>

		{:else if absensiDetail.length > 0}

			<div class="table-container">

				<table>

					<thead>
						<tr>
							<th>No</th>
							<th>NIS</th>
							<th>Nama Siswa</th>
							<th>Status</th>
							<th>Aksi</th>
						</tr>
					</thead>

					<tbody>

						{#each absensiDetail as item, index}

							<tr>

								<td>
									{index + 1}
								</td>

								<td>
									{item.nisSiswa}
								</td>

								<td>
									{item.namaSiswa}
								</td>

								<td>

									{#if editingId === item.id}

										<select
											class="status-select"
											bind:value={editStatusValue}
										>
											<option value="Hadir">
												Hadir
											</option>

											<option value="Izin">
												Izin
											</option>

											<option value="Sakit">
												Sakit
											</option>

											<option value="Alpha">
												Alpha
											</option>
										</select>

									{:else}

										<span
											class:status-hadir={item.status === 'Hadir'}
											class:status-sakit={item.status === 'Sakit'}
											class:status-izin={item.status === 'Izin'}
											class:status-alpha={item.status === 'Alpha'}
										>
											{item.status}
										</span>

									{/if}

								</td>

								<td>

									{#if editingId === item.id}

										<button
											type="button"
											class="edit-button"
											onclick={() => simpanEdit(item)}
											disabled={saving}
										>
											{saving ? 'Menyimpan...' : '💾 Simpan'}
										</button>

										<button
											type="button"
											class="delete-button"
											onclick={batalEdit}
											disabled={saving}
										>
											Batal
										</button>

									{:else}

										<button
											type="button"
											class="edit-button"
											onclick={() => mulaiEdit(item)}
										>
											✏️ Edit
										</button>

									{/if}

								</td>

							</tr>

						{/each}

					</tbody>

				</table>

			</div>

		{:else}

			<p class="empty-data">
				Data absensi tidak ditemukan.
			</p>

		{/if}

	</div>

{/if}