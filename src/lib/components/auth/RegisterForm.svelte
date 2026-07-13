<script lang="ts">
	import '$lib/styles/auth.css';
    import { register } from "$lib/services/auth";

	import Input from '$lib/components/auth/Input.svelte';
	import Button from '$lib/components/auth/Button.svelte';

	let namaGuru = $state('');
	let npmGuru = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	
    async function handleRegister(event: SubmitEvent) {
        event.preventDefault();

        if (!namaGuru.trim()) {
            alert("Nama lengkap wajib diisi.");
            return;
        }
        if (!npmGuru.trim()) {
            alert("Npm wajib diisi.");
            return;
        }

        if (!email.trim()) {
            alert("Email wajib diisi.");
            return;
        }

        if (!password) {
            alert("Password wajib diisi.");
            return;
        }

        if (password.length < 4) {
            alert("Password minimal 4 karakter.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Konfirmasi password tidak sama.");
            return;
        }

        try {

            const result = await register({
                namaGuru,
				npmGuru,
                email,
                password
            });

            alert(result.message);

            console.log(result);

        } catch (error) {

            alert(error instanceof Error
                ? error.message
                : "Terjadi kesalahan");

        }
    }
</script>

<div class="auth-container">

	<div class="left-panel">

		<h1>📚 Absensi Siswa</h1>

		<h2>Selamat Datang!</h2>

		<p>
			Buat akun untuk mulai mengelola data absensi siswa
			dengan mudah, cepat, dan efisien.
		</p>

	</div>

	<div class="right-panel">

		<div class="register-card">

			<h2>Register</h2>

			<p>Silakan buat akun baru.</p>

			<form onsubmit={handleRegister}>

				<Input
					id="nama"
					// label="Nama Lengkap"
					placeholder="Masukkan nama lengkap"
					bind:value={namaGuru}
				/>

				<Input
					id="email"
					// label="Email"
					type="email"
					placeholder="Masukkan email"
					bind:value={email}
				/>

				<Input
					id="npm"
					// label="NPM"
					placeholder="Masukkan NPM"
					bind:value={npmGuru}
				/>
				<Input
					id="password"
					// label="Password"
					type="password"
					placeholder="Masukkan password"
					showToggle={true}
					bind:value={password}
				/>

				<Input
					id="confirmPassword"
					// label="Konfirmasi Password"
					type="password"
					placeholder="Masukkan kembali password"
					showToggle={true}
					bind:value={confirmPassword}
				/>

				<Button
					type="submit"
					text="Register"
				/>

			</form>

			<div class="login-link">
				Sudah punya akun?
				<a href="/auth/login">Login</a>
			</div>

		</div>

	</div>

</div>