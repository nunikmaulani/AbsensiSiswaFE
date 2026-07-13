<script lang="ts">
    import { onMount } from 'svelte';

    import '$lib/styles/dashboard.css';

    import HeaderDashboard from '$lib/components/dashboard/HeaderDashboard.svelte';
    import StatCard from '$lib/components/dashboard/StatCard.svelte';
    import AttendanceSummary from '$lib/components/dashboard/AttendanceSummary.svelte';
    import QuickAction from '$lib/components/dashboard/QuickAction.svelte';
    import SystemInfo from '$lib/components/dashboard/SystemInfo.svelte';
    import AttendanceChart from '$lib/components/dashboard/AttendanceChart.svelte';
    

    let totalGuru = $state(0);
    let totalSiswa = $state(0);
    let totalKelas = $state(0);
    let totalAbsensi = $state(0);

    let loading = $state(true);

    const tanggal = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    async function loadDashboard() {
        try {
            const token = localStorage.getItem('token');

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const [guruRes, siswaRes, kelasRes, absensiRes] = await Promise.all([
                fetch('http://localhost:3000/guru', { headers }),
                fetch('http://localhost:3000/siswa', { headers }),
                fetch('http://localhost:3000/kelas', { headers }),
                fetch('http://localhost:3000/absensi', { headers })
            ]);

            if (guruRes.ok) {
                const guru = await guruRes.json();
                totalGuru = guru.count ?? 0;
            }

            if (siswaRes.ok) {
                const siswa = await siswaRes.json();
                totalSiswa = siswa.count ?? 0;
            }

            if (kelasRes.ok) {
                const kelas = await kelasRes.json();
                totalKelas = kelas.count ?? 0;
            }

            if (absensiRes.ok) {
                const absensi = await absensiRes.json();
                totalAbsensi = absensi.count ?? 0;
            }
        } catch (error) {
            console.log(error);
        } finally {
            loading = false;
        }
    }

    onMount(loadDashboard);
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<div class="dashboard">

    <HeaderDashboard />

    {#if loading}
        <div class="loading">
            <p>Memuat Dashboard...</p>
        </div>
    {:else}
        <div class="cards">
            <StatCard
                title="Total Guru"
                value={totalGuru}
                icon="👨‍🏫"
                color="#A8D5BA"
            />

            <StatCard
                title="Total Siswa"
                value={totalSiswa}
                icon="👨‍🎓"
                color="#FFD6A5"
            />

            <StatCard
                title="Total Kelas"
                value={totalKelas}
                icon="🏫"
                color="#BDB2FF"
            />

            <StatCard
                title="Total Absensi"
                value={totalAbsensi}
                icon="📝"
                color="#FFB4A2"
            />
        </div>

        <AttendanceSummary />

        <AttendanceChart />

        <QuickAction />

        <SystemInfo />
		
    {/if}

</div>