<script lang="ts">
    import { Eye, EyeOff } from '@lucide/svelte';
    import type { SvelteHTMLElements } from 'svelte/elements';
    import '$lib/styles/auth.css';

    // 1. Ekstrak tipe input ke dalam type alias terpisah agar TypeScript tidak bingung
    type HTMLInputProps = SvelteHTMLElements['input'];

    // 2. Sekarang interface bisa meng-extend identifier 'HTMLInputProps' dengan aman
    interface Props extends HTMLInputProps {
        type?: string;
        placeholder?: string;
        value: string;
        id?: string;
        showToggle?: boolean;
    }

    // 3. Destructuring props Svelte 5 seperti biasa
    let {
        type = "text",
        placeholder = "",
        value = $bindable(),
        id = "",
        showToggle = false,
        ...restProps // Menampung autocomplete, readonly, dll.
    }: Props = $props();

    let isVisible = $state(false);

    const inputType = $derived(
        showToggle
            ? (isVisible ? "text" : "password")
            : type
    );
</script>

<div class="form-group">
    <div class="input-wrapper">
        <input
            id={id || undefined}
            type={inputType}
            placeholder={placeholder || undefined}
            bind:value={value}
            {...restProps} 
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