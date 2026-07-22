const BASE_URL = 'http://localhost:3000';

function getToken() {
	return localStorage.getItem('token') || '';
}

export async function getDashboard() {
	const response = await fetch(`${BASE_URL}/dashboard`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	const result = await response.json();
	if (!response.ok) {
		throw new Error(result.message);
	}
	return result;
}