<script lang="ts">
	import { onMount } from 'svelte';


	let kelas = $state<any[]>([]);
	let filteredKelas = $state<any[]>([]);
	let guru = $state<any[]>([]);


	let loading = $state(true);
	let search = $state('');

	let totalKelas = $state(0);
	let totalSiswa = $state(0);
	let kelasAktif = $state(0);



	let showForm = $state(false);
	let editMode = $state(false);
	let selectedId = $state<number | null>(null);



	let formKelas = $state({

		namaKelas:'',
		guruId:''

	});



	const API = "http://localhost:3000";





	// ==========================
	// AMBIL DATA KELAS
	// ==========================

	async function getKelas(){

		try{

			const token = localStorage.getItem('token');


			const response = await fetch(`${API}/kelas`,{

				headers:{
					Authorization:`Bearer ${token}`
				}

			});


			const result = await response.json();


			console.log("DATA KELAS",result);



			kelas = result.rows ?? result.data ?? result;


			filteredKelas = kelas;



			totalKelas = kelas.length;

			kelasAktif = kelas.length;



			totalSiswa = kelas.reduce(
				(total,item)=>
				total + (item.jumlahSiswa ?? 0),
				0
			);



		}catch(error){

			console.log(error);

		}
		finally{

			loading=false;

		}

	}







	// ==========================
	// AMBIL DATA GURU
	// ==========================


	async function getGuru(){

		try{

			const token = localStorage.getItem('token');


			const response = await fetch(`${API}/guru`,{

				headers:{
					Authorization:`Bearer ${token}`
				}

			});


			const result = await response.json();



			console.log("DATA GURU",result);



			guru =
				result.rows ??
				result.data ??
				result;



		}catch(error){

			console.log(error);

		}


	}







	function cariKelas(){

		const keyword = search.toLowerCase();


		filteredKelas = kelas.filter(item=>

			item.namaKelas
			.toLowerCase()
			.includes(keyword)

		);

	}








	// ==========================
	// TAMBAH
	// ==========================


	function tambahKelas(){

		showForm=true;

		editMode=false;


		formKelas={

			namaKelas:"",

			guruId:""

		};

	}








	// ==========================
	// EDIT
	// ==========================


	function editKelas(item:any){

		showForm=true;

		editMode=true;


		selectedId=item.id;


		formKelas={

			namaKelas:item.namaKelas,

			guruId:item.guruId

		};


	}









	// ==========================
	// SIMPAN
	// ==========================


	async function simpanKelas(){

		const token = localStorage.getItem('token');


		let url = `${API}/kelas`;

		let method="POST";



		if(editMode){

			url=`${API}/kelas/${selectedId}`;

			method="PUT";

		}





		const response = await fetch(url,{

			method,

			headers:{

				"Content-Type":"application/json",

				Authorization:
				`Bearer ${token}`

			},


			body:JSON.stringify({

				namaKelas:
				formKelas.namaKelas,


				guruId:
				Number(formKelas.guruId)

			})

		});



		console.log(
			await response.json()
		);



		showForm=false;


		getKelas();


	}










	// ==========================
	// HAPUS
	// ==========================


	async function hapusKelas(id:number){


		if(!confirm(
			"Yakin hapus kelas?"
		)) return;



		const token = localStorage.getItem('token');



		await fetch(
			`${API}/kelas/${id}`,
			{

			method:"DELETE",

			headers:{

				Authorization:
				`Bearer ${token}`

			}

		});



		getKelas();

	}








	onMount(()=>{

		getKelas();

		getGuru();

	});


</script>





<div class="page">


<h1>
📚 Data Kelas
</h1>


<div class="cards">


<div class="card hijau">

<h3>Total Kelas</h3>

<p>{totalKelas}</p>

</div>



<div class="card biru">

<h3>Total Siswa</h3>

<p>{totalSiswa}</p>

</div>



<div class="card kuning">

<h3>Kelas Aktif</h3>

<p>{kelasAktif}</p>

</div>


</div>

<div class="toolbar">


<input

placeholder="Cari kelas..."

bind:value={search}

oninput={cariKelas}

/>


<button
class="tambah"
onclick={tambahKelas}
>

+ Tambah Kelas

</button>


</div>


{#if showForm}


<div class="form">


<h2>

{editMode
?
"Edit Kelas"
:
"Tambah Kelas"}

</h2>


<input

placeholder="Nama Kelas"

bind:value={formKelas.namaKelas}

/>

<select bind:value={formKelas.guruId}>


<option value="">

Pilih Wali Kelas

</option>



{#each guru as item}


<option value={item.id}>

{item.namaGuru}

</option>


{/each}

</select>

<button onclick={simpanKelas}>

Simpan

</button>



<button onclick={()=>showForm=false}>

Batal

</button>


</div>


{/if}



{#if loading}

<p>
Loading...
</p>


{:else}


<table>


<thead>

<tr>

<th>No</th>

<th>Nama Kelas</th>

<th>Wali Kelas</th>

<th>Jumlah Siswa</th>

<th>Aksi</th>

</tr>


</thead>


<tbody>


{#each filteredKelas as item,index}



<tr>


<td>
{index+1}
</td>


<td>
{item.namaKelas}
</td>


<td>
{item.namaGuru ?? "-"}
</td>


<td>
{item.jumlahSiswa ?? 0}
</td>

<td>


<button
class="edit"
onclick={()=>editKelas(item)}
>

✏️

</button>

<button
class="hapus"
onclick={()=>hapusKelas(item.id)}
>

🗑️

</button>


</td>


</tr>

{/each}

</tbody>

</table>

{/if}

</div>

<style>

.page{

padding:25px;

}

h1{

font-size:36px;

font-family:Georgia;

margin-bottom:35px;

}

.cards{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:30px;

margin-bottom:30px;

}

.card{

height:220px;

border-radius:20px;

display:flex;

align-items:center;

justify-content:center;

flex-direction:column;

color:white;

}

.card h3{

font-size:25px;

}
.card p{

font-size:45px;

font-weight:bold;

}

.hijau{

background:#8bd3a8;

}

.biru{

background:#91afe8;

}

.kuning{

background:#ffd38f;

}

.toolbar{

display:flex;

gap:20px;

margin-bottom:25px;

}

.toolbar input{

flex:1;

height:55px;

border-radius:12px;

border:1px solid #ddd;

padding:0 20px;

font-size:18px;

}

.tambah{

background:#3568df;

color:white;

border:none;

padding:15px 25px;

border-radius:12px;

}

.form{

background:white;

padding:25px;

border-radius:15px;

box-shadow:0 5px 20px #ddd;

margin-bottom:25px;

}

.form input,
.form select{

width:100%;

height:55px;

margin-bottom:15px;

border-radius:12px;

border:1px solid #ddd;

padding:0 15px;

font-size:18px;

}

.form button{

background:#3568df;

color:white;

border:none;

padding:12px 25px;

border-radius:10px;

margin-right:10px;

}

table{

width:100%;

border-collapse:collapse;

}

th{

background:#edf2fb;

padding:20px;

font-size:20px;

text-align:left;

}

td{

padding:20px;

border-bottom:1px solid #eee;

font-size:18px;

}

.edit,
.hapus{

width:50px;

height:35px;

background:white;

border:1px solid #999;

border-radius:5px;

cursor:pointer;

margin-right:10px;

}



</style>