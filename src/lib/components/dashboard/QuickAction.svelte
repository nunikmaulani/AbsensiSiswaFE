<script lang="ts">
	import { goto } from '$app/navigation';

	function goToGuru() {
		goto('/guru');
	}

	function goToSiswa() {
		goto('/siswa');
	}

	function goToAbsensi() {
		goto('/absensi');
	}
</script>

<div class="quick-action">

	<h2>⚡ Aksi Cepat</h2>

	<div class="buttons">

		<button onclick={goToGuru}>
			👨‍🏫 Tambah Guru
		</button>

		<button onclick={goToSiswa}>
			👨‍🎓 Tambah Siswa
		</button>

		<button onclick={goToAbsensi}>
			📝 Input Absensi
		</button>

	</div>

</div>