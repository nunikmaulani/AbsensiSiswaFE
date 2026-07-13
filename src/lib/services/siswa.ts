const BASE_URL = 'http://localhost:3000';

function getToken(): string {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('token') || '';
	}
	return '';
}

export interface Kelas {
	id: number;
	namaKelas: string;
}

export interface Siswa {
	id: number;
	namaSiswa: string;
	nisSiswa: string;
	jenisKelamin: 'Laki-laki' | 'Perempuan';
	kelasId: number;
}

export interface SiswaPayload {
	namaSiswa: string;
	nisSiswa: string;
	jenisKelamin: 'Laki-laki' | 'Perempuan';
	kelasId: number;
}

export async function getSiswa(): Promise<Siswa[]> {
	const response = await fetch(`${BASE_URL}/siswa?limit=100`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Gagal mengambil data siswa');
	}

	return result.rows;
}

export async function getDaftarKelas(): Promise<Kelas[]> {
	const response = await fetch(`${BASE_URL}/kelas`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Gagal mengambil data kelas');
	}

	return result.rows;
}

export async function createSiswa(data: SiswaPayload) {
	const response = await fetch(`${BASE_URL}/siswa`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Gagal menambah siswa');
	}

	return result;
}

export async function updateSiswa(
	id: number,
	data: SiswaPayload
) {
	const response = await fetch(`${BASE_URL}/siswa/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Gagal mengubah siswa');
	}

	return result;
}

export async function deleteSiswa(id: number) {
	const response = await fetch(`${BASE_URL}/siswa/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Gagal menghapus siswa');
	}

	return result;
}