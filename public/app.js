const state = {
  shoes: [],
  filteredShoes: [],
  cart: { items: [], itemCount: 0, subtotal: 0 },
  selectedShoe: null,
};

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || 'Request failed');
  }
  return payload.data;
}

function renderFeatured() {
  const container = document.getElementById('featured-grid');
  container.innerHTML = state.shoes
    .filter((shoe) => shoe.featured)
    .map(renderProductCard)
    .join('');
}

function renderCatalog() {
  const container = document.getElementById('catalog-grid');
  const summary = document.getElementById('catalog-summary');
  summary.textContent = `${state.filteredShoes.length} shoes available`;
  container.innerHTML = state.filteredShoes.map(renderProductCard).join('');

  if (!state.filteredShoes.length) {
    container.innerHTML = '<p class="cart-empty">No shoes match the selected filters.</p>';
  }

  container.querySelectorAll('[data-detail-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      const shoe = await fetchJson(`/api/shoes/${button.dataset.detailId}`);
      state.selectedShoe = shoe;
      renderProductDetail();
      window.location.hash = 'product-detail';
    });
  });
}

function renderProductCard(shoe) {
  return `
    <article class="product-card">
      <img src="${shoe.imageUrl}" alt="${shoe.name}" />
      <div class="product-card-body">
        <p class="eyebrow">${shoe.brand} · ${shoe.category}</p>
        <h3>${shoe.name}</h3>
        <p>${shoe.description}</p>
        <div class="product-card-footer">
          <strong>${formatPrice(shoe.price)}</strong>
          <button class="button primary" type="button" data-detail-id="${shoe.id}">View details</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductDetail() {
  const container = document.getElementById('product-detail');

  if (!state.selectedShoe) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="detail-card">
      <div class="detail-gallery">
        ${state.selectedShoe.imageUrls
          .map((imageUrl) => `<img src="${imageUrl}" alt="${state.selectedShoe.name}" />`)
          .join('')}
      </div>
      <div class="detail-copy">
        <p class="eyebrow">${state.selectedShoe.brand} · ${state.selectedShoe.category}</p>
        <h2>${state.selectedShoe.name}</h2>
        <p>${state.selectedShoe.description}</p>
        <p><strong>${formatPrice(state.selectedShoe.price)}</strong></p>
        <div class="detail-sizes">
          ${state.selectedShoe.sizes
            .map(
              (size) => `
                <button class="size-pill" type="button" data-size="${size}" data-add-id="${state.selectedShoe.id}">
                  Size ${size}
                </button>
              `,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-add-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      await addToCart(button.dataset.addId, Number(button.dataset.size), 1);
      window.location.hash = 'cart';
    });
  });
}

function renderCart() {
  const cartCount = document.getElementById('cart-count');
  const subtotal = document.getElementById('cart-subtotal');
  const cartItems = document.getElementById('cart-items');

  cartCount.textContent = state.cart.itemCount;
  subtotal.textContent = `Subtotal: ${formatPrice(state.cart.subtotal)}`;

  if (!state.cart.items.length) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty. Add a shoe size from the product detail view.</p>';
    return;
  }

  cartItems.innerHTML = state.cart.items
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.imageUrl}" alt="${item.name}" />
          <div>
            <p class="eyebrow">${item.brand}</p>
            <h3>${item.name}</h3>
            <p>Size ${item.size} · Qty ${item.quantity}</p>
          </div>
          <div>
            <strong>${formatPrice(item.lineTotal)}</strong>
            <button class="button secondary" type="button" data-remove-id="${item.id}">Remove</button>
          </div>
        </article>
      `,
    )
    .join('');

  cartItems.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      state.cart = await fetchJson(`/api/cart/${button.dataset.removeId}`, { method: 'DELETE' });
      renderCart();
    });
  });
}

function renderCategoryNav() {
  const categories = [...new Set(state.shoes.map((shoe) => shoe.category))];
  const container = document.getElementById('category-nav');
  container.innerHTML = categories
    .map((category) => `<button class="category-pill" type="button" data-category="${category}">${category}</button>`)
    .join('');

  container.querySelectorAll('[data-category]').forEach((button) => {
    button.addEventListener('click', () => {
      state.filteredShoes = state.shoes.filter((shoe) => shoe.category === button.dataset.category);
      renderCatalog();
      window.location.hash = 'catalog';
    });
  });
}

function populateFilters() {
  const brandFilter = document.getElementById('brand-filter');
  const sizeFilter = document.getElementById('size-filter');
  const brands = [...new Set(state.shoes.map((shoe) => shoe.brand))];
  const sizes = [...new Set(state.shoes.flatMap((shoe) => shoe.sizes))].sort((a, b) => a - b);

  brandFilter.innerHTML += brands
    .map((brand) => `<option value="${brand}">${brand}</option>`)
    .join('');
  sizeFilter.innerHTML += sizes.map((size) => `<option value="${size}">${size}</option>`).join('');
}

async function applyFilters() {
  const params = new URLSearchParams();
  const brand = document.getElementById('brand-filter').value;
  const size = document.getElementById('size-filter').value;
  const minPrice = document.getElementById('min-price-filter').value;
  const maxPrice = document.getElementById('max-price-filter').value;

  if (brand) params.set('brand', brand);
  if (size) params.set('size', size);
  if (minPrice) params.set('minPrice', minPrice);
  if (maxPrice) params.set('maxPrice', maxPrice);

  state.filteredShoes = await fetchJson(`/api/shoes?${params.toString()}`);
  renderCatalog();
}

async function addToCart(shoeId, size, quantity) {
  state.cart = await fetchJson('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shoeId, size, quantity }),
  });
  renderCart();
}

async function bootstrap() {
  state.shoes = await fetchJson('/api/shoes');
  state.filteredShoes = state.shoes;
  state.cart = await fetchJson('/api/cart');

  populateFilters();
  renderFeatured();
  renderCategoryNav();
  renderCatalog();
  renderProductDetail();
  renderCart();

  document.getElementById('apply-filters').addEventListener('click', applyFilters);
}

bootstrap().catch((error) => {
  document.getElementById('catalog-summary').textContent = error.message;
});
