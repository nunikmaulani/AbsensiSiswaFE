<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		new Chart(canvas, {
			type: 'bar',
			data: {
				labels: [
					'Sen',
					'Sel',
					'Rab',
					'Kam',
					'Jum',
					'Sab'
				],
				datasets: [
					{
						label: 'Jumlah Kehadiran',
						data: [28, 30, 27, 29, 31, 26],
						backgroundColor: [
							'#A8D5BA',
							'#F6D6AD',
							'#AFCBFF',
							'#D5AAFF',
							'#FFD6E0',
							'#B5EAD7'
						],
						borderRadius: 10
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});
	});
</script>

<div class="chart-card">

	<h2>📊 Grafik Kehadiran Minggu Ini</h2>

	<canvas bind:this={canvas}></canvas>

</div>