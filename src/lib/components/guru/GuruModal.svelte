<script lang="ts">
	import '$lib/styles/guru.css';
    import Input from '$lib/components/auth/Input.svelte';
    import { createGuru } from '$lib/services/guru';
    import type { Guru } from '$lib/services/guru';

	interface Props {
		open: boolean;
        guru: Guru | null;
		onClose: () => void;
        onSuccess: () => void;
	}

	let {
        open,
        guru,
        onClose,
        onSuccess
    }: Props = $props();

	let namaGuru = $state('');
	let npmGuru = $state('');
	let email = $state('');
	let password = $state('');

    $effect(() => {
        if (guru) {
            namaGuru = guru.namaGuru;
            npmGuru = guru.npmGuru;
            email = guru.email;
            password = '';
        } else {
            namaGuru = '';
            npmGuru = '';
            email = '';
            password = '';
        }
    });

	async function simpanGuru() {

	if (!namaGuru || !npmGuru || !email || !password) {
		alert('Semua data wajib diisi.');
		return;
	}

	try {

		await createGuru({
			namaGuru,
			npmGuru,
			email,
			password
		});

		alert('Guru berhasil ditambahkan.');

		onSuccess();
        onClose();

	} catch (error) {

		alert(
			error instanceof Error
				? error.message
				: 'Terjadi kesalahan.'
		);

	}

    }
</script>

{#if open}
	<div class="modal-overlay">

		<div class="modal">

			<h2>
                {guru ? 'Edit Guru' : 'Tambah Guru'}
            </h2>

			<div class="form-group">
				<label for="namaGuru">Nama Guru</label>

				<input
                    id="namaGuru"
                    type="text"
                    placeholder="Masukkan nama guru"
                    bind:value={namaGuru}
                />
			</div>

			<div class="form-group">
				<label for="npm">NPM</label>

				<Input
                    id="npm"
                    type="text"
                    placeholder="Masukkan NPM"
                    bind:value={npmGuru}
                />
			</div>

			<div class="form-group">
				<label for="email">Email</label>

				<Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email"
                    bind:value={email}
                />
			</div>

			<div class="form-group">
				<label for="password">Password</label>

				<Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    showToggle={true}
                    bind:value={password}
                />
			</div>

			<div class="modal-button">

				<button
					class="btn-cancel"
					onclick={onClose}
				>
					Batal
				</button>

				<button
					class="btn-save"
					onclick={simpanGuru}
				>
					{guru ? 'Update' : 'Simpan'}
				</button>

			</div>
        
		</div>

	</div>
{/if}