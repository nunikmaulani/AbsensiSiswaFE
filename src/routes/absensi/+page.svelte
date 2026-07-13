<script lang="ts">
import { onMount } from 'svelte';

const API = "http://localhost:3000";

let loading = $state(true);

let kelas = $state<any[]>([]);
let siswa = $state<any[]>([]);
let riwayat = $state<any[]>([]);

let tanggal = $state(
    new Date().toISOString().substring(0,10)
);

let kelasId = $state("");
let absensi = $state<any[]>([]);

function formatTanggal(isoString: string) {
    if (!isoString) return '-';
    return isoString.substring(0, 10);
}

async function getKelas(){
    const token = localStorage.getItem("token");
    const response = await fetch(`${API}/kelas`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
    const result = await response.json();
    kelas = result.rows ?? result.data ?? result;
}

async function getSiswa(){
    if(!kelasId){
        siswa = [];
        absensi = [];
        return;
    }

    const token = localStorage.getItem("token");
    const response = await fetch(
        `${API}/siswa?kelasId=${kelasId}`,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    const result = await response.json();
    siswa = result.rows ?? result.data ?? result;

    absensi = siswa.map((item:any)=>({
        siswaId: item.id_siswa || item.id,
        nama: item.namaSiswa || item.nama,
        status: "Hadir"
    }));
}

$effect(() => {
    getSiswa();
});

function pilihStatus(index:number, statusBaru:string){
    absensi[index].status = statusBaru;
}

async function simpanAbsensi(){
    if(!kelasId){
        alert("Pilih kelas terlebih dahulu");
        return;
    }

    if(absensi.length === 0){
        alert("Tidak ada data siswa untuk disimpan");
        return;
    }

    const token = localStorage.getItem("token");

    for(const item of absensi){
        await fetch(`${API}/absensi`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                tanggal,
                kelasId: Number(kelasId), 
                siswaId: item.siswaId,
                status: item.status
            })
        });
    }

    alert("Absensi berhasil disimpan");
    await getRiwayat(); 
}

async function getRiwayat(){
    const token = localStorage.getItem("token");
    const response = await fetch(`${API}/absensi`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    const result = await response.json();
    riwayat = result.rows ?? result.data ?? result;
}

onMount(async()=>{
    await getKelas();
    await getRiwayat();
    loading = false;
});
</script>

{#if loading}
    <div class="loading">Memuat data halaman...</div>
{:else}
    <div class="page">
        <h1>Halaman Utama Absensi Guru</h1>

        <div class="card">
            <h2>Pilih Kelas & Tanggal</h2>
            <div class="form">
                <div>
                    <label for="tanggal">Tanggal Hari Ini</label>
                    <input type="date" id="tanggal" bind:value={tanggal} />
                </div>
                <div>
                    <label for="kelas">Pilih Kelas Mengajar</label>
                    <select id="kelas" bind:value={kelasId}>
                        <option value="">-- Pilih Kelas --</option>
                        {#each kelas as k}
                            <option value={k.id_kelas || k.id}>{k.namaKelas || k.nama || k.nama_kelas || k.name}</option>
                        {/each}
                    </select>
                </div>
            </div>

            {#if absensi.length > 0}
                <div style="margin-top: 20px;">
                    <h3>Silakan Isi Kehadiran Siswa:</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="text-align: left; padding-left: 15px;">Nama Siswa</th>
                            <th>Hadir</th>
                            <th>Sakit</th>
                            <th>Izin</th>
                            <th>Alpa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each absensi as item, index}
                            <tr>
                                <td style="text-align: left; padding-left: 15px;">{item.nama}</td>
                                <td>
                                    <input 
                                        type="radio" 
                                        name="status-{index}" 
                                        value="Hadir"
                                        checked={item.status === 'Hadir'} 
                                        onchange={() => pilihStatus(index, 'Hadir')} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="radio" 
                                        name="status-{index}" 
                                        value="Sakit"
                                        checked={item.status === 'Sakit'} 
                                        onchange={() => pilihStatus(index, 'Sakit')} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="radio" 
                                        name="status-{index}" 
                                        value="Izin"
                                        checked={item.status === 'Izin'} 
                                        onchange={() => pilihStatus(index, 'Izin')} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="radio" 
                                        name="status-{index}" 
                                        value="Alpa"
                                        checked={item.status === 'Alpa'} 
                                        onchange={() => pilihStatus(index, 'Alpa')} 
                                    />
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>

                <div class="button-area">
                    <button onclick={simpanAbsensi}>Simpan Absensi Kelas</button>
                </div>
            {:else if kelasId}
                <p style="text-align: center; color: #666; margin-top: 25px; font-style: italic;">
                    Tidak ada siswa terdaftar di dalam kelas ini.
                </p>
            {/if}
        </div>

        <div class="card">
            <h2>Riwayat Absensi Terkini</h2>
            {#if riwayat.length > 0}
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal Jurnal Absen</th>
                            <th>Kelas Selesai Absen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each riwayat as r}
                            <tr>
                                <td>{formatTanggal(r.tanggal)}</td>
                                <td>{r.nama_kelas || '-'}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else}
                <p style="text-align: center; color: #888; font-style: italic;">Belum ada riwayat absensi yang tercatat.</p>
            {/if}
        </div>
    </div>
{/if}

<style>
.page{
    padding:30px;
    font-family:Georgia,serif;
    background:#f5f7fb;
    min-height:100vh;
}

h1{
    margin-bottom:20px;
}

.card{
    background:white;
    padding:20px;
    border-radius:12px;
    box-shadow:0 3px 10px rgba(0,0,0,.1);
    margin-bottom:25px;
}

.card h2{
    margin-bottom:20px;
}

.form{
    display:flex;
    gap:20px;
    margin-bottom:20px;
    flex-wrap:wrap;
}

.form div{
    display:flex;
    flex-direction:column;
}

label{
    font-weight:bold;
    margin-bottom:6px;
}

input[type="date"],
select{
    width:220px;
    height:42px;
    padding:0 10px;
    border:1px solid #ccc;
    border-radius:8px;
    font-size:15px;
    outline:none;
}

table{
    width:100%;
    border-collapse:collapse;
    margin-top:15px;
    background:white;
}

thead{
    background:#3568df;
    color:white;
}

th{
    padding:12px;
    text-align:center;
}

td{
    padding:12px;
    text-align:center;
    border-bottom:1px solid #ddd;
}

tbody tr:hover{
    background:#f3f6ff;
}

input[type="radio"]{
    transform:scale(1.2);
    cursor:pointer;
}

.button-area{
    margin-top:25px;
    display:flex;
    justify-content:center;
}

.button-area button{
    background:#3568df;
    color:white;
    border:none;
    padding:12px 30px;
    border-radius:8px;
    font-size:16px;
    cursor:pointer;
    transition:.3s;
}

.button-area button:hover{
    background:#244fb5;
}

.loading{
    text-align:center;
    padding:30px;
    font-size:18px;
}

@media(max-width:768px){
    .form{
        flex-direction:column;
    }
    input[type="date"],
    select{
        width:100%;
    }
    table{
        font-size:13px;
    }
    th,
    td{
        padding:8px;
    }
    .button-area button{
        width:100%;
    }
}
</style>