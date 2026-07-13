<script lang="ts">
    import '$lib/styles/guru.css';

    import { onMount } from 'svelte';

    import GuruHeader from './GuruHeader.svelte';
    import GuruModal from './GuruModal.svelte';
    
    import { getGuru, deleteGuru } from '$lib/services/guru';
    import type { Guru } from '$lib/services/guru';

    let daftarGuru = $state<Guru[]>([]);
    let keyword = $state('');
    let modalTerbuka = $state(false);
    let guruDipilih = $state<Guru | null>(null);

    function handleTambahGuru() {
        guruDipilih = null;
        modalTerbuka = true;
    }

    function handleEditGuru(guru: Guru) {
        guruDipilih = guru;
        modalTerbuka = true;
    }

    async function handleHapusGuru(id: number, nama: string) {
        const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus guru "${nama}"?`);
        if (!konfirmasi) return;

        try {
            await deleteGuru(id); 
            alert('Guru berhasil dihapus.');
            loadGuru(); 
        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : 'Gagal menghapus data guru.');
        }
    }

    function tutupModal() {
        modalTerbuka = false;
    }

    onMount(() => {
        loadGuru();
    });

    const hasilPencarian = $derived(
        daftarGuru.filter((guru) =>
            guru.namaGuru
                .toLowerCase()
                .includes(keyword.toLowerCase())
        )
    );

    async function loadGuru() {
        try {
            daftarGuru = await getGuru();
        } catch (error) {
            console.error(error);
            alert('Gagal mengambil data guru.');
        }
    }
</script>

<div class="guru-container">

    <GuruHeader onTambah={handleTambahGuru} />

    <div class="guru-toolbar">
        <input
            type="text"
            class="search-input"
            placeholder="🔍 Cari nama guru..."
            bind:value={keyword}
        />
    </div>

    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Guru</th>
                    <th>NPM</th>
                    <th>Email</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {#each hasilPencarian as guru, index}
                    <tr>
                        <td>{index + 1}</td>
                        <td>{guru.namaGuru}</td>
                        <td>{guru.npmGuru}</td>
                        <td>{guru.email}</td>
                        <td class="aksi">
                            
                            <button class="btn-edit" onclick={() => handleEditGuru(guru)}>
                                Edit
                            </button>

                           
                            <button class="btn-delete" onclick={() => handleHapusGuru(guru.id, guru.namaGuru)}>
                                Hapus
                            </button>
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td colspan="5" class="empty-data">
                            Data guru tidak ditemukan.
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<GuruModal
    open={modalTerbuka}
    guru={guruDipilih}
    onClose={tutupModal}
    onSuccess={loadGuru}
/>