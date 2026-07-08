<script lang="ts">
    import { onMount } from 'svelte';

    let totalSiswa = 0;
    let totalGuru = 0;
    let totalKelas = 0;
    let totalHadir = 0;

    // Ganti endpoint sesuai backend yang dimiliki
    async function loadDashboard() {
        try {
            const [siswaRes, guruRes, kelasRes, absensiRes] = await Promise.all([
                fetch("http://localhost:3000/siswa"),
                fetch("http://localhost:3000/guru"),
                fetch("http://localhost:3000/kelas"),
                fetch("http://localhost:3000/absensi")
            ]);

            const siswa = await siswaRes.json();
            const guru = await guruRes.json();
            const kelas = await kelasRes.json();
            const absensi = await absensiRes.json();

            totalSiswa = siswa.length;
            totalGuru = guru.length;
            totalKelas = kelas.length;
            totalHadir = absensi.filter((a: any) => a.status === "H").length;
        } catch (err) {
            console.error("Gagal memuat dashboard:", err);
        }
    }

    onMount(() => {
        loadDashboard();
    });
</script>

<svelte:head>
    <title>Dashboard | Sistem Informasi Absensi Siswa</title>
</svelte:head>

<div class="dashboard">

    <div class="welcome">
        <h1>Dashboard</h1>
        <p>
            Selamat datang di Sistem Informasi Absensi Siswa.
            Gunakan menu di sebelah kiri untuk mengelola data siswa,
            guru, kelas, dan absensi.
        </p>
    </div>

    <div class="cards">

        <div class="card blue">
            <h3>Total Siswa</h3>
            <h1>{totalSiswa}</h1>
        </div>

        <div class="card green">
            <h3>Total Guru</h3>
            <h1>{totalGuru}</h1>
        </div>

        <div class="card orange">
            <h3>Total Kelas</h3>
            <h1>{totalKelas}</h1>
        </div>

        <div class="card purple">
            <h3>Hadir Hari Ini</h3>
            <h1>{totalHadir}</h1>
        </div>

    </div>

    <div class="content">

        <div class="panel">
            <h2>Informasi Sistem</h2>

            <table>
                <tr>
                    <td>Nama Aplikasi</td>
                    <td>: Sistem Informasi Absensi Siswa</td>
                </tr>

                <tr>
                    <td>Frontend</td>
                    <td>: SvelteKit 5</td>
                </tr>

                <tr>
                    <td>Backend</td>
                    <td>: Express JS (localhost:3000)</td>
                </tr>

                <tr>
                    <td>Database</td>
                    <td>: MySQL</td>
                </tr>
            </table>
        </div>

        <div class="panel">

            <h2>Menu Cepat</h2>

            <div class="buttons">

                <a href="/siswa">Data Siswa</a>

                <a href="/guru">Data Guru</a>

                <a href="/kelas">Data Kelas</a>

                <a href="/absensi">Data Absensi</a>

            </div>

        </div>

    </div>

</div>

<style>

.dashboard{
    display:flex;
    flex-direction:column;
    gap:25px;
}

.welcome{
    background:white;
    padding:25px;
    border-radius:12px;
    box-shadow:0 2px 10px rgba(0,0,0,.08);
}

.welcome h1{
    margin:0;
    color:#1565c0;
}

.welcome p{
    margin-top:10px;
    color:#666;
    line-height:1.6;
}

.cards{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
}

.card{
    color:white;
    padding:25px;
    border-radius:12px;
    box-shadow:0 5px 15px rgba(0,0,0,.1);
}

.card h3{
    margin:0;
    font-weight:normal;
}

.card h1{
    margin-top:15px;
    font-size:40px;
}

.blue{
    background:#1976d2;
}

.green{
    background:#2e7d32;
}

.orange{
    background:#ef6c00;
}

.purple{
    background:#6a1b9a;
}

.content{
    display:grid;
    grid-template-columns:2fr 1fr;
    gap:20px;
}

.panel{
    background:white;
    padding:25px;
    border-radius:12px;
    box-shadow:0 2px 10px rgba(0,0,0,.08);
}

.panel h2{
    margin-top:0;
    color:#1565c0;
}

table{
    width:100%;
    border-collapse:collapse;
}

td{
    padding:10px 0;
    border-bottom:1px solid #eee;
}

.buttons{
    display:flex;
    flex-direction:column;
    gap:15px;
}

.buttons a{
    background:#1976d2;
    color:white;
    text-decoration:none;
    padding:14px;
    border-radius:8px;
    text-align:center;
    transition:.3s;
}

.buttons a:hover{
    background:#0d47a1;
}

@media(max-width:768px){

    .content{
        grid-template-columns:1fr;
    }

}

</style>