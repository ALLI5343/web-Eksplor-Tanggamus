const listKontainer = document.getElementById('destinasi-list');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.btn-filter');

let dataWisataGlobal =[];

async function muatDataWisata() {
    try {
        const response = await fetch('data.json');
        const dataDestinasi = await response.json();

        tampilkanKeLayar(dataDestinasi);
    } catch (error) {
        console.error("Terjadi kesalahan saat memuat data:", error);
    }
}

function tampilkanKeLayar(wisata) {
    listKontainer.innerHTML = "";

    wisata.forEach(item => {
        const formatRupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(item.harga_tiket);

        const kartuHTML = `
         <div class="card" onclick="bukaDetail(${item.id})">
            <img src="Gambar/${item.gambar}" alt="${item.name}">
            <div class="card-content">
                <span class="category">${item.kategori}</span>
                <span class="rating">⭐${item.rating}</span>
                <h3>${item.nama}</h3>
                <p>${item.deskripsi}</p>
                <hr>
                <p class="price">${formatRupiah}</p>
            </div>
        </div>
        `;
        listKontainer.innerHTML += kartuHTML;
    });
}

searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const hasilCari = dataWisataGlobal.filter(item => 
        item.nama.toLowerCase().includes(keyword)
    );
    tampilkanKeLayar(hasilCari);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active')

        const kategoriTerpilih = btn.dataset.category;

        if (kategoriTerpilih === "Semua") {
            tampilkanKeLayar(dataWisataGlobal);
        } else {
            const hasilFilter = dataWisataGlobal.filter(item => item.kategori === kategoriTerpilih);
            tampilkanKeLayar(hasilFilter);
        }
    });
});

function bukaDetail(id) {
    const item = dataWisataGlobal.find(d => d.id === id);
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML =  `
    <img src="gambar/${item.gambar}" style="width:100% border-radius:10px margin-bottom:15px;">
    <h2>${item.nama}</h2>
    <p><strong>lokasi:</strong>${item.lokasi}</p>
     <p><strong>deskripsi:</strong>${item.deskripsi}</p>
      <p><strong>fasilitas:</strong>${item.fasilitas.join(', ')}</p>
    `;
    modal.style.display = "block";
}

document.querySelector('.close-btn').onclick = () => {
    document.getElementById('detailModal').style.display = "none";
};
muatDataWisata();