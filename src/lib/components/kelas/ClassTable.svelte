<script lang="ts">
	const classes = [
		{
			id: 1,
			nama: 'X RPL 1',
			wali: 'Pak Budi',
			jumlah: 32
		},
		{
			id: 2,
			nama: 'X RPL 2',
			wali: 'Bu Sinta',
			jumlah: 30
		},
		{
			id: 3,
			nama: 'XI TKJ 1',
			wali: 'Pak Agus',
			jumlah: 31
		}
	];
</script>

<div class="table-card">

	<table>

		<thead>

			<tr>
				<th>No</th>
				<th>Nama Kelas</th>
				<th>Wali Kelas</th>
				<th>Jumlah Siswa</th>
				<th>Aksi</th>
			</tr>

		</thead>

		<tbody>

			{#each classes as kelas}

				<tr>

					<td>{kelas.id}</td>

					<td>{kelas.nama}</td>

					<td>{kelas.wali}</td>

					<td>{kelas.jumlah}</td>

					<td>

						<button class="edit-btn">
							✏️
						</button>

						<button class="delete-btn">
							🗑️
						</button>

					</td>

				</tr>

			{/each}

		</tbody>

	</table>

</div>