const API_KEY = '468fe84818005d645f9402e33faaaff1'; // 👈 REPLACE THIS

// Sample Umbrella Products (you can add more)
const products = [
    {
        id: 1,
        name: "Compact Travel Umbrella",
        basePrice: 399,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nextdirect.com%2Fin%2Fen%2Fstyle%2Fsu071685%2F699427&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABAE"
    },
    {
        id: 2,
        name: "Golf Umbrella (Extra Large)",
        basePrice: 899,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nytimes.com%2Fwirecutter%2Freviews%2Fbest-umbrella%2F&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABAL"
    },
    {
        id: 3,
        name: "Automatic Open/Close Umbrella",
        basePrice: 599,
        image: "hhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sunumbrellas.in%2FLADIES%2Fa-series-blue-2-fold---uv-protective-umbrella%2F397%2Fdetail&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABAV"
    },
    {
        id: 4,
        name: "Designer Floral Umbrella",
        basePrice: 749,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.johns.in%2Fproducts%2Fjohns-uncle-john-gents-mono-colour-umbrella-685mm%3Fsrsltid%3DAfmBOopI-rsM5ESPi34LMh9uBMLMjAgM42nv9jcScehYn2APERGKP5jR&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABAf"
    },
   {
        id: 5,
        name: "Green Umbrella",
        basePrice: 749,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.decathlon.in%2Fp%2F8602667%2Fwaterproof-umbrella-medium-size-123cm-coverage-uv-protection-auto-open-red&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABAp"
    },
    {
        id: 6,
        name: "Black Umbrella",
        basePrice: 749,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.sunumbrellas.in%2FGENTS%2Fz-series-blue--3-fold---uv-protective-umbrella%2F406%2Fdetail&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABA9"
    },
    {
        id: 7,
        name: "Red Umbrella",
        basePrice: 749,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jiomart.com%2Fp%2Fhomeandkitchen%2Faxaka-rainy-season-use-hand-rainbow-umbrella-for-men-and-women-multicolour%2F602723706&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABAz"
    },
    {
        id: 8,
        name: "Great Umbrella",
        basePrice: 1099,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ubuy.co.in%2Fproduct%2F8W5X40T8O-toyfunny-transparent-clear-umbrella-umbrella-pp%3Fsrsltid%3DAfmBOop7Wi0S5U0nVtrwngLlm2jukLqyuzJYnXQU8TwerLEWcbbwEmjK&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABBQ"
    },
    {
        id: 9,
        name: "Windproof Storm Umbrella",
        basePrice: 1099,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vistaprint.in%2Fclothing-bags%2Fumbrellas%2Fsun-stick-umbrellas&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABBX"
    },
    {
        id: 10,
        name: "Kids Cartoon Umbrella",
        basePrice: 299,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fjollybrolly.co.uk%2Fblogs%2Fblog%2F10-different-ways-to-use-an-umbrella%3Fsrsltid%3DAfmBOorgKW8U1oIYC5DyrKO8pJpLjsqCAKIcengeURH_FvZCp8pvXFZt&psig=AOvVaw20hfWSx8AU8WmF9Oh3DtAY&ust=1757500052445000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiemYe8y48DFQAAAAAdAAAAABBr"
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
        const discountedPrice = isRainyTomorrow ? (product.basePrice * 0.9).toFixed(2) : product.basePrice;
        const isDiscounted = isRainyTomorrow;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">
                ₹${discountedPrice}
                ${isDiscounted ? `<div class="original-price">₹${product.basePrice}</div>` : ''}
            </div>
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
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: isRainyTomorrow ? product.basePrice * 0.9 : product.basePrice,
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
        // Step 1: Geocode city
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityInput)}&limit=1&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) throw new Error("City not found.");

        const { lat, lon, name } = geoData[0];

        // Step 2: Get forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (!forecastData.list?.length) throw new Error("Forecast unavailable.");

        // Get tomorrow’s date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        const tomorrowsForecast = forecastData.list.find(item =>
            item.dt_txt.startsWith(tomorrowStr)
        );

        if (!tomorrowsForecast) throw new Error("No data for tomorrow.");

        const { weather, main } = tomorrowsForecast;
        const condition = weather[0].main;
        const description = weather[0].description;
        const temp = main.temp;

        isRainyTomorrow = condition.toLowerCase().includes("rain");

        // Update UI
        document.getElementById('location-name').textContent = name;
        document.getElementById('weather-condition').textContent = description;
        document.getElementById('weather-temp').textContent = temp.toFixed(1);

        document.getElementById('recommendation').textContent = isRainyTomorrow
            ? "🌧️ Recommended: Umbrellas 10% OFF! Stock up & run promo!"
            : "☀️ No rain tomorrow. Regular pricing applies.";

        weatherDiv.classList.remove('hidden');

        // Re-render products with updated pricing
        renderProducts(products);

    } catch (error) {
        errorDiv.textContent = "❌ " + error.message;
        errorDiv.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
}
