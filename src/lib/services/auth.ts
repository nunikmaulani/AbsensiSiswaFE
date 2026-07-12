const BASE_URL = 'http://localhost:3000';

export interface RegisterRequest {
	namaGuru: string;
	npmGuru: string;
	email: string;
	password: string;
}

export async function register(data: RegisterRequest) {
	const response = await fetch(`${BASE_URL}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Registrasi gagal');
	}

	return result;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export async function login(data: LoginRequest) {
	const response = await fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Login gagal');
	}

	return result;
}