<script lang="ts">
	import '$lib/styles/auth.css';

	import Input from '$lib/components/auth/Input.svelte';
	import Button from '$lib/components/auth/Button.svelte';
	
	import { login } from '$lib/services/auth';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');

	async function handleLogin(event: SubmitEvent) {
	event.preventDefault();

	if (!email.trim()) {
		alert('Email wajib diisi.');
		return;
	}

	if (!password) {
		alert('Password wajib diisi.');
		return;
	}

	try {
		const result = await login({
			email,
			password
		});

		console.log(result);

		// untuk menyimpan token
		localStorage.setItem('token', result.token);

		alert('Login berhasil');

		goto('/dashboard');

	} catch (error) {
		alert(
			error instanceof Error
				? error.message
				: 'Terjadi kesalahan'
		);
	}
}
</script>

<div class="auth-container">

	<div class="left-panel">

		<h1>📚 Absensi Siswa</h1>

		<h2>Selamat Datang Kembali!</h2>

		<p>
			Masuk ke akun Anda untuk mulai mengelola
			data absensi siswa.
		</p>

	</div>

	<div class="right-panel">

		<div class="register-card">

			<h2>Login</h2>

			<p>Silakan masuk ke akun Anda.</p>

			<form onsubmit={handleLogin}>

				<Input
					id="email"
					label="Email"
					type="email"
					placeholder="Masukkan email"
					bind:value={email}
				/>

				<Input
					id="password"
					label="Password"
					type="password"
					placeholder="Masukkan password"
					bind:value={password}
				/>

				<Button
					type="submit"
					text="Login"
				/>

			</form>

			<div class="login-link">
				Belum punya akun?
				<a href="/auth/register">Register</a>
			</div>

		</div>

	</div>

</div>