<script lang="ts">
	import '$lib/styles/layout.css';

	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { children } = $props();

	let loading = $state(true);
	let sidebarOpen = $state(true);

	const menus = [
		{ name: 'Dashboard', icon: '🏠', url: '/dashboard' },
		{ name: 'Guru', icon: '👨‍🏫', url: '/guru' },
		{ name: 'Siswa', icon: '👨‍🎓', url: '/siswa' },
		{ name: 'Kelas', icon: '🏫', url: '/kelas' },
		{ name: 'Absensi', icon: '📝', url: '/absensi' }
	];

	onMount(async () => {
		// Halaman login tidak perlu dicek token
		if (page.url.pathname === '/auth/login') {
			loading = false;
			return;
		}

		const token = localStorage.getItem('token');

		if (!token) {
			await goto('/login', { replaceState: true });
			return;
		}

		loading = false;
	});
</script>
{#if loading}

	<div class="loading">
		<h2>Loading...</h2>
	</div>

{:else if page.url.pathname === '/auth/login'}

	{@render children()}

{:else}

<div class="container">

	<aside class:close={!sidebarOpen}>

		<div class="logo">
			<h2>SIAS</h2>
			<p>Sistem Absensi</p>
		</div>

		<nav>

			{#each menus as menu}

				<a
					href={menu.url}
					class:active={page.url.pathname === menu.url}
				>
					<span>{menu.icon}</span>

					{#if sidebarOpen}
						<p>{menu.name}</p>
					{/if}

				</a>

			{/each}

		</nav>

	</aside>

	<div class="main">

		<header>

			<button
				class="toggle"
				onclick={() => sidebarOpen = !sidebarOpen}
			>
				☰
			</button>

			<h2>Sistem Informasi Absensi Siswa</h2>

			<div class="user">
				Guru
			</div>

		</header>

		<main>
			{@render children()}
		</main>

	</div>

</div>

{/if}

<style>
	.loading{
	height:100vh;
	display:flex;
	justify-content:center;
	align-items:center;
	background:#f4f6f9;
	}
</style>