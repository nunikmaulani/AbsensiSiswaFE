<script lang="ts">
import { Eye, EyeOff } from '@lucide/svelte';
import '$lib/styles/auth.css';

	interface Props {
		// label: string;
		type?: string;
		placeholder?: string;
		value: string;
		id?: string;
		showToggle?: boolean;
		
	}

	let {
		// label,
		type = "text",
		placeholder = "",
		value = $bindable(),
		id = "",
		showToggle = false
	}: Props = $props();

	let isVisible = $state(false);

	const inputType = $derived(
		showToggle
			? (isVisible ? "text" : "password")
			: type
	);

</script>

<div class="form-group">
	<!-- <label for={id}>{label}</label> -->

	<div class="input-wrapper">
		<input
			id={id}
			type={inputType}
			placeholder={placeholder}
			autocomplete="new-password"
			bind:value
		/>

		{#if showToggle}
			<button
				type="button"
				class="toggle-password"
				onclick={() => (isVisible = !isVisible)}
			>
				{#if isVisible}
					<EyeOff size={20} />
				{:else}
					<Eye size={20} />
				{/if}
			</button>
		{/if}
	</div>
</div>