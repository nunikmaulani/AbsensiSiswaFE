const BASE_URL = 'http://localhost:3000'; 

function getToken(): string {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('token') || '';
	}
	return '';
}

export interface Kelas {
	id_kelas: number;   
	nama_kelas: string; 
	id_guru: number;    
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

export async function createKelas(payload: Omit<Kelas, 'id_kelas'>): Promise<void> {
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

export async function updateKelas(id_kelas: number, payload: Partial<Kelas>): Promise<void> {
	const response = await fetch(`${BASE_URL}/kelas/${id_kelas}`, {
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

export async function deleteKelas(id_kelas: number): Promise<void> {
	const response = await fetch(`${BASE_URL}/kelas/${id_kelas}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${getToken()}`
		}
	});

	const result = await response.json();
	if (!response.ok) throw new Error(result.message || 'Gagal menghapus data kelas');
}