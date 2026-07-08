<script lang="ts">
    import { page } from '$app/state';

    let sidebarOpen = true;

    const menus = [
        {
            name: 'Dashboard',
            icon: '🏠',
            url: '/'
        },
        {
            name: 'Siswa',
            icon: '👨‍🎓',
            url: '/siswa'
        },
        {
            name: 'Guru',
            icon: '👨‍🏫',
            url: '/guru'
        },
        {
            name: 'Kelas',
            icon: '🏫',
            url: '/kelas'
        },
        {
            name: 'Absensi',
            icon: '📝',
            url: '/absensi'
        }
    ];
</script>

<svelte:head>
    <title>Sistem Informasi Absensi Siswa</title>
</svelte:head>

<div class="app">

    <aside class:close={!sidebarOpen}>
        <div class="logo">
            <h2>SIAS</h2>
            <small>Absensi Siswa</small>
        </div>

        <nav>
			{#each menus as menu}
				<a
					href={menu.url}
					class:active={page.url.pathname === menu.url}
				>
					<span>{menu.icon}</span>
					<p>{menu.name}</p>
				</a>
			{/each}
        </nav>
    </aside>

    <div class="content">

        <header>

            <button
                class="toggle"
                on:click={() => sidebarOpen = !sidebarOpen}
            >
                ☰
            </button>

            <div class="title">
                Sistem Informasi Absensi Siswa
            </div>

            <div class="user">
                Admin
            </div>

        </header>

        <main>
            <slot />
        </main>

    </div>

</div>

<style>

:global(body){
    margin:0;
    font-family:Arial, Helvetica, sans-serif;
    background:#f4f6f9;
}

.app{
    display:flex;
    min-height:100vh;
}

/* ================= SIDEBAR ================= */

aside{
    width:240px;
    background:#0d47a1;
    color:white;
    transition:.3s;
    overflow:hidden;
}

aside.close{
    width:70px;
}

.logo{
    padding:25px 15px;
    text-align:center;
    border-bottom:1px solid rgba(255,255,255,.2);
}

.logo h2{
    margin:0;
}

.logo small{
    opacity:.8;
}

nav{
    margin-top:20px;
}

nav a{
    display:flex;
    align-items:center;
    gap:15px;
    padding:15px 20px;
    color:white;
    text-decoration:none;
    transition:.2s;
}

nav a:hover{
    background:#1565c0;
}

nav a.active{
    background:#1976d2;
}

nav a span{
    font-size:22px;
    width:25px;
    text-align:center;
}

aside.close nav a p,
aside.close .logo small{
    display:none;
}

/* ================= CONTENT ================= */

.content{
    flex:1;
    display:flex;
    flex-direction:column;
}

header{
    height:70px;
    background:white;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 25px;
    box-shadow:0 2px 8px rgba(0,0,0,.08);
}

.toggle{
    border:none;
    background:none;
    font-size:25px;
    cursor:pointer;
}

.title{
    font-size:22px;
    font-weight:bold;
    color:#333;
}

.user{
    background:#1976d2;
    color:white;
    padding:10px 18px;
    border-radius:20px;
}

main{
    padding:30px;
}

/* ================= MOBILE ================= */

@media(max-width:768px){

    aside{
        position:fixed;
        z-index:1000;
        height:100%;
    }

    aside.close{
        transform:translateX(-100%);
        width:240px;
    }

    .title{
        font-size:18px;
    }

}

</style>