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

export interface SiswaAbsensi {
	id: number;
	nisSiswa: string;
	namaSiswa: string;
	jenisKelamin: string;
	kelasId: number;
	status?: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';
}

export interface RiwayatAbsensi {
	id: number;
	tanggal: string;
	kelasId: number;
	namaKelas: string;
}

export interface Absensi {
	id: number;
	siswaId: number;
	guruId: number;
	tanggal: string;
	status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';
	namaSiswa: string;
	nisSiswa: string;
	kelasId: number;
	namaKelas: string;
}

export async function getKelas(): Promise<Kelas[]> {
	const response = await fetch(`${BASE_URL}/kelas`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message || 'Gagal mengambil data kelas'
		);
	}

	return result.rows;
}

export async function getSiswaByKelas(
	id: number
): Promise<SiswaAbsensi[]> {
	const response = await fetch(
		`${BASE_URL}/siswa/kelas/${id}`,
		{
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message || 'Gagal mengambil data siswa'
		);
	}

	return result.rows;
}

export async function getRiwayatAbsensi(): Promise<RiwayatAbsensi[]> {
	const response = await fetch(
		`${BASE_URL}/absensi/riwayat`,
		{
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message || 'Gagal mengambil riwayat'
		);
	}

	return result.rows.map((item: any) => ({
		id: item.id,
		tanggal: item.tanggal,
		kelasId: item.kelasId,
		namaKelas: item.nama_kelas
	}));
}

export async function getAbsensiByKelasTanggal(
	kelasId: number,
	tanggal: string
): Promise<Absensi[]> {
	const response = await fetch(
		`${BASE_URL}/absensi/kelas/${kelasId}/tanggal/${tanggal}`,
		{
			headers: {
				Authorization: `Bearer ${getToken()}`
			}
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message ||
			'Gagal mengambil data absensi kelas'
		);
	}

	return result.rows;
}

export async function simpanAbsensi(data: {
	tanggal: string;
	kelasId: number;
	siswaId: number;
	status: string;
}) {
	const response = await fetch(
		`${BASE_URL}/absensi`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken()}`
			},
			body: JSON.stringify(data)
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message ||
			'Gagal menyimpan absensi'
		);
	}

	return result;
}
export async function updateAbsensi(
	id: number,
	data: {
		siswaId: number;
		guruId: number;
		tanggal: string;
		status: string;
	}
) {
	const response = await fetch(
		`${BASE_URL}/absensi/${id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken()}`
			},
			body: JSON.stringify({
				siswaId: data.siswaId,
				guruId: data.guruId,
				tanggal: data.tanggal.substring(0, 10),
				status: data.status
			})
		}
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message || 'Gagal memperbarui data absensi'
		);
	}

	return result;
}