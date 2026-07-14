<script lang="ts">

	interface Props {
		hadir: number;
		izin: number;
		sakit: number;
		alpha: number;
	}

	let {
		hadir,
		izin,
		sakit,
		alpha
	}: Props = $props();

</script>

<div class="summary">

	<h2>📊 Ringkasan Kehadiran Hari Ini</h2>

	<div class="summary-grid">

		<div class="summary-card hadir">
			<h3>Hadir</h3>
			<h1>{hadir}</h1>
		</div>

		<div class="summary-card izin">
			<h3>Izin</h3>
			<h1>{izin}</h1>
		</div>

		<div class="summary-card sakit">
			<h3>Sakit</h3>
			<h1>{sakit}</h1>
		</div>

		<div class="summary-card alpha">
			<h3>Alpha</h3>
			<h1>{alpha}</h1>
		</div>

	</div>

</div>