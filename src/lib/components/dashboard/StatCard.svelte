<script lang="ts">
	interface Props {
		title: string;
		value: number;
		icon: string;
		color: string;
	}

	let { title, value, icon, color }: Props = $props();
</script>

<div class="stat-card" style={`border-top:6px solid ${color}`}>

	<div class="icon">
		{icon}
	</div>

	<h3>{title}</h3>

	<h2>{value}</h2>

</div>