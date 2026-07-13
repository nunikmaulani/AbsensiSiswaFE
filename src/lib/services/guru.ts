const BASE_URL = 'http://localhost:3000';

export interface Guru {
	id: number;
	namaGuru: string;
	npmGuru: string;
	email: string;
}

export interface CreateGuruRequest {
	namaGuru: string;
	npmGuru: string;
	email: string;
	password: string;
}

export interface UpdateGuruRequest {
	namaGuru: string;
	npmGuru: string;
	email: string;
	password?: string;
}

function getToken() {
	return localStorage.getItem('token');
}

export async function getGuru(): Promise<Guru[]> {
	const response = await fetch(`${BASE_URL}/guru?limit=100`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Gagal mengambil data guru');
	}

	return result.rows || result;
}

export async function createGuru(data: CreateGuruRequest) {
	const response = await fetch(`${BASE_URL}/guru`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Gagal menambahkan guru');
	}

	return result;
}

export async function updateGuru(
	id: number,
	data: UpdateGuruRequest
) {
	const response = await fetch(`${BASE_URL}/guru/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken()}`
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || 'Gagal mengubah data guru');
	}

	return result;
}

export async function deleteGuru(id: number) {
    const response = await fetch(`${BASE_URL}/guru/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Gagal menghapus data guru');
    }

    return result;
}
