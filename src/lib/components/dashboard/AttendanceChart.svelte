<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	interface Props {
		grafik: {
			tanggal: string;
			total: number;
		}[];
	}

	let { grafik }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	function formatTanggal(tanggal: string) {
		return new Date(tanggal).toLocaleDateString('id-ID', {
			day: '2-digit',
			month: 'short'
		});
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: grafik.map(item => formatTanggal(item.tanggal)),
				datasets: [
					{
						label: 'Jumlah Kehadiran',
						data: grafik.map(item => item.total),
						backgroundColor: [
							'#A8D5BA',
							'#F6D6AD',
							'#AFCBFF',
							'#D5AAFF',
							'#FFD6E0',
							'#B5EAD7',
							'#9FE2BF'
						],
						borderRadius: 12,
						borderSkipped: false
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: {
					duration: 1000
				},
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							precision: 0
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true
					}
				}
			}
		});

		return () => chart?.destroy();
	});

	$effect(() => {
		if (!chart) return;

		chart.data.labels = grafik.map(item => formatTanggal(item.tanggal));

		chart.data.datasets[0].data = grafik.map(item => item.total);

		chart.update();
	});
</script>

<div class="chart-card">
	<h2>📊 Grafik Kehadiran 7 Hari Terakhir</h2>

	<div class="chart-wrapper">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>