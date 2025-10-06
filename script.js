const products = [
  {
    id: "m1",
    title: "Nasi Goreng Spesial",
    price: 25000,
    description: "Nasi goreng dengan ayam, telur, dan kerupuk.",
    category: "Makanan",
    img: "https://via.placeholder.com/400x300?text=Nasi+Goreng",
  },
  {
    id: "d1",
    title: "Kopi Susu Gula Aren",
    price: 18000,
    description: "Kopi susu kekinian dengan aroma gula aren.",
    category: "Minuman",
    img: "https://via.placeholder.com/400x300?text=Kopi+Susu",
  },
  {
    id: "j1",
    title: "Keripik Singkong Pedas",
    price: 10000,
    description: "Keripik singkong renyah dengan rasa pedas gurih.",
    category: "Jajanan",
    img: "https://via.placeholder.com/400x300?text=Keripik+Singkong",
  },
];

function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
}

const list = document.getElementById("product-list");

products.forEach((p) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}" />
    <div class="card-body">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="price">${formatRupiah(p.price)}</div>
      <button onclick="order('${p.title}', ${p.price})">Pesan Langsung</button>
    </div>
  `;

  list.appendChild(card);
});

function order(title, price) {
  const message = `Halo, saya ingin pesan ${title} seharga ${formatRupiah(price)}.`;
  const phone = "6281234567890"; // Ganti dengan nomor WhatsApp kamu
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
