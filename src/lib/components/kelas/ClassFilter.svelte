<script lang="ts">
	let { onAdd } = $props();

	let keyword = $state('');
</script>

<div class="filter-container">

	<div class="search-box">

		<input
			type="text"
			placeholder="🔍 Cari nama kelas..."
			bind:value={keyword}
		/>

	</div>

	<button
        class="add-btn"
        onclick={onAdd}
    >
        + Tambah Kelas
    </button>

</div>