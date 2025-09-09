const API_KEY = '468fe84818005d645f9402e33faaaff1'; // 👈 REPLACE THIS

// Sample Umbrella Products (you can add more)
const products = [
    {
        id: 1,
        name: "Compact Travel Umbrella",
        basePrice: 399,
        image: "images/Umbrella1.jpg"
    },
    {
        id: 2,
        name: "Golf Umbrella (Extra Large)",
        basePrice: 899,
        image: "images/Umbrella2.jpg"
    },
    {
        id: 3,
        name: "Automatic Open/Close Umbrella",
        basePrice: 599,
        image: "images/Umbrella3.jpg"
    },
    {
        id: 4,
        name: "Designer Floral Umbrella",
        basePrice: 749,
        image: "images/Umbrella4.jpg"
    },
    {
        id: 5,
        name: "Green Umbrella",
        basePrice: 749,
        image: "images/Umbrella5.jpg"
    },
    {
        id: 6,
        name: "Black Umbrella",
        basePrice: 749,
        image: "images/Umbrella6.jpg"
    },
    {
        id: 7,
        name: "Red Umbrella",
        basePrice: 749,
        image: "images/Umbrella7.jpg"
    },
    {
        id: 8,
        name: "Great Umbrella",
        basePrice: 1099,
        image: "images/Umbrella8.jpg"
    },
    {
        id: 9,
        name: "Windproof Storm Umbrella",
        basePrice: 1099,
        image: "images/Umbrella9.jpg"
    },
    {
        id: 10,
        name: "Kids Cartoon Umbrella",
        basePrice: 299,
        image: "images/Umbrella10.jpg"
    }
];

let cart = [];
let isRainyTomorrow = false;

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});

// Render all products
function renderProducts(productList) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    productList.forEach(product => {
        const discountedPrice = isRainyTomorrow ? (product.basePrice * 0.9).toFixed(2) : null;
        const displayPrice = isRainyTomorrow ? discountedPrice : product.basePrice.toFixed(2);

        const card = document.createElement('div');
        card.className = 'product-card';

        // ✅ Always show original price crossed out if discounted
        let priceHtml = `<div class="product-price">₹${displayPrice}`;
        if (isRainyTomorrow) {
            priceHtml += ` <span class="original-price">₹${product.basePrice.toFixed(2)}</span>`;
        }
        priceHtml += `</div>`;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3 class="product-name">${product.name}</h3>
            ${priceHtml}
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    const finalPrice = isRainyTomorrow ? (product.basePrice * 0.9) : product.basePrice;

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: finalPrice, // ✅ Uses discounted price if applicable
            quantity: 1
        });
    }

    updateCart();
}

// Update cart UI
function updateCart() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalEl = document.getElementById('cart-total');

    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div>
                <strong>${item.name}</strong> × ${item.quantity}<br>
                ₹${item.price.toFixed(2)} each
            </div>
            <div>
                ₹${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${item.id})">✕</button>
            </div>
        `;
        cartItemsEl.appendChild(itemEl);
    });

    cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalEl.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("✅ Thank you for your purchase!\n\n" + 
          "Weather-based dynamic pricing applied where applicable.\n" +
          "Total: ₹" + document.getElementById('cart-total').textContent);
    cart = [];
    updateCart();
}

// Weather API Logic
async function checkWeather() {
    const cityInput = document.getElementById('city').value.trim();
    if (!cityInput) {
        alert("Please enter a city name!");
        return;
    }

    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const weatherDiv = document.getElementById('weather-display');

    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    weatherDiv.classList.add('hidden');

    try {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityInput)}&limit=1&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) throw new Error("City not found.");

        const { lat, lon, name } = geoData[0];

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (!forecastData.list?.length) throw new Error("Forecast unavailable.");

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        const tomorrowsForecast = forecastData.list.find(item =>
            item.dt_txt.startsWith(tomorrowStr)
        );

        if (!tomorrowsForecast) throw new Error("No data for tomorrow.");

        const { weather, main } = tomorrowsForecast;
        const condition = weather[0].main; // e.g., "Rain", "Clouds", "Clear"
        const description = weather[0].description; // e.g., "overcast clouds"
        const temp = main.temp;

        // ✅ NEW LOGIC: Apply discount for "Rain" OR "Overcast"
        isRainyTomorrow = condition.toLowerCase().includes("rain") || 
                         description.toLowerCase().includes("overcast");

        document.getElementById('location-name').textContent = name;
        document.getElementById('weather-condition').textContent = description;
        document.getElementById('weather-temp').textContent = temp.toFixed(1);

        document.getElementById('recommendation').textContent = isRainyTomorrow
            ? "🌦️ Recommended: Umbrellas 10% OFF! Possible rain — stock up & run promo!"
            : "☀️ No rain expected. Regular pricing applies.";

        weatherDiv.classList.remove('hidden');
        renderProducts(products); // Re-render with updated pricing

    } catch (error) {
        errorDiv.textContent = "❌ " + error.message;
        errorDiv.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
}
