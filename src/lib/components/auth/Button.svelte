<script lang="ts">

	interface Props {
		text: string;
		type?: "button" | "submit";
	}

	let {
		text,
		type = "button"
	}: Props = $props();

</script>

<button {type}>
	{text}
</button>