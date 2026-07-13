<script lang="ts">
	import '$lib/styles/absensi.css';

	import AttendanceStats from '$lib/components/absensi/AttendanceStats.svelte';
	import AttendanceFilter from '$lib/components/absensi/AttendanceFilter.svelte';
	import AttendanceTable from '$lib/components/absensi/AttendanceTable.svelte';
</script>

<svelte:head>
	<title>Data Absensi</title>
</svelte:head>

<div class="attendance-page">

	<h1>📋 Data Absensi</h1>

	<p class="subtitle">
		Kelola data kehadiran siswa
	</p>

	<AttendanceStats />

	<AttendanceFilter />

	<AttendanceTable />

</div>