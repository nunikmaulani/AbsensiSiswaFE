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
	guruId: number;
	namaGuru: string;
	jumlahSiswa: number;   
}

export interface CreateKelasRequest {
	namaKelas: string;
	guruId: number;
}

export interface UpdateKelasRequest {
	namaKelas: string;
	guruId: number;
}

export async function getKelas(): Promise<Kelas[]> {
	const response = await fetch(`${BASE_URL}/kelas`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getToken()}`
		}
	});

	const result = await response.json();
	if (!response.ok) throw new Error(result.message || 'Gagal mengambil data kelas');
	return result.rows || result;
}

export async function createKelas(
	payload: CreateKelasRequest): Promise<void> {
	const response = await fetch(`${BASE_URL}/kelas`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getToken()}`
		},
		body: JSON.stringify(payload)
	});

	const result = await response.json();
	if (!response.ok) throw new Error(result.message || 'Gagal menambahkan data kelas');
}

export async function updateKelas(
	id: number,payload: UpdateKelasRequest): Promise<void>{
	const response = await fetch(`${BASE_URL}/kelas/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getToken()}`
		},
		body: JSON.stringify(payload)
	});

	const result = await response.json();
	if (!response.ok) throw new Error(result.message || 'Gagal memperbarui data kelas');
}

export async function deleteKelas(id: number): Promise<void> {
	const response = await fetch(`${BASE_URL}/kelas/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getToken()}`
		}
	});

	const result = await response.json();
	if (!response.ok) throw new Error(result.message || 'Gagal menghapus data kelas');
}