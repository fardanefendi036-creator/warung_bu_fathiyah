const products = [
  {
    id: "m1",
    title: "Nasi Goreng Spesial",
    price: 25000,
    description: "Nasi goreng dengan ayam, telur, dan kerupuk.",
    img: "https://via.placeholder.com/400x300?text=Nasi+Goreng",
  },
  {
    id: "d1",
    title: "Kopi Susu Gula Aren",
    price: 18000,
    description: "Kopi susu kekinian dengan aroma gula aren.",
    img: "https://via.placeholder.com/400x300?text=Kopi+Susu",
  },
  {
    id: "j1",
    title: "Keripik Singkong Pedas",
    price: 10000,
    description: "Keripik singkong renyah dengan rasa pedas gurih.",
    img: "https://via.placeholder.com/400x300?text=Keripik+Singkong",
  },
];

const productList = document.getElementById("product-list");
const orderSection = document.getElementById("order-section");
const orderForm = document.getElementById("order-form");
const orderResult = document.getElementById("order-result");
const resultDetail = document.getElementById("result-detail");
const cancelBtn = document.getElementById("cancel-btn");

const orderItem = document.getElementById("order-item");
const orderQty = document.getElementById("order-qty");
const orderTotal = document.getElementById("order-total");

function formatRupiah(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);
}

// Tampilkan produk
products.forEach((p) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}">
    <div class="card-body">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="price">${formatRupiah(p.price)}</div>
      <button onclick="order('${p.id}')">Pesan Sekarang</button>
    </div>`;
  productList.appendChild(card);
});

// Fungsi buka form pemesanan
function order(id) {
  const product = products.find((p) => p.id === id);
  orderSection.classList.remove("hidden");
  productList.style.display = "none";
  orderItem.value = product.title;
  orderQty.value = 1;
  orderTotal.value = formatRupiah(product.price);

  orderQty.oninput = () => {
    const total = product.price * Number(orderQty.value || 1);
    orderTotal.value = formatRupiah(total);
  };
}

// Kirim pesanan
orderForm.addition = orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    nama: document.getElementById("customer-name").value,
    alamat: document.getElementById("customer-address").value,
    telepon: document.getElementById("customer-phone").value,
    item: orderItem.value,
    jumlah: orderQty.value,
    total: orderTotal.value,
  };

  // Simpan ke localStorage (simulasi)
  localStorage.setItem("lastOrder", JSON.stringify(data));

  orderSection.classList.add("hidden");
  orderResult.classList.remove("hidden");
  resultDetail.innerHTML = `
    <p><strong>Nama:</strong> ${data.nama}</p>
    <p><strong>Alamat:</strong> ${data.alamat}</p>
    <p><strong>No. Telepon:</strong> ${data.telepon}</p>
    <p><strong>Pesanan:</strong> ${data.item} (${data.jumlah}x)</p>
    <p><strong>Total:</strong> ${data.total}</p>
  `;
});

cancelBtn.onclick = () => {
  orderSection.classList.add("hidden");
  productList.style.display = "grid";
};

function backToShop() {
  orderResult.classList.add("hidden");
  productList.style.display = "grid";
}
