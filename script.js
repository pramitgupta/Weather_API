const API_KEY = '468fe84818005d645f9402e33faaaff1'; // 👈 REPLACE THIS
const UMBRELLA_BASE_PRICE = 500; // Base price in your currency (e.g., ₹500)

async function checkWeather() {
    const cityInput = document.getElementById('city').value.trim();
    if (!cityInput) {
        alert("Please enter a city name!");
        return;
    }

    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    // Show loading, hide result/error
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');

    try {
        // Step 1: Get coordinates for city (geocoding)
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityInput)}&limit=1&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            throw new Error("City not found. Please check spelling.");
        }

        const { lat, lon, name } = geoData[0];

        // Step 2: Get 5-day forecast (we'll check tomorrow)
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        if (!forecastData.list || forecastData.list.length === 0) {
            throw new Error("Could not fetch forecast.");
        }

        // Get tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        // Find first forecast entry for tomorrow
        const tomorrowsForecast = forecastData.list.find(item => {
            return item.dt_txt.startsWith(tomorrowStr);
        });

        if (!tomorrowsForecast) {
            throw new Error("No forecast data for tomorrow.");
        }

        const { weather, main } = tomorrowsForecast;
        const condition = weather[0].main; // e.g., "Rain", "Clear"
        const description = weather[0].description;
        const temp = main.temp;

        // Step 3: Apply business logic — Dynamic Pricing
        let finalPrice = UMBRELLA_BASE_PRICE;
        let recommendation = "";
        let isRainy = condition.toLowerCase().includes("rain");

        if (isRainy) {
            finalPrice = UMBRELLA_BASE_PRICE * 0.9; // 10% discount
            recommendation = "🌧️ Recommended Action: Increase umbrella stock + run promo!";
        } else {
            recommendation = "☀️ No rain tomorrow. Regular pricing applies.";
        }

        // Step 4: Display results
        document.getElementById('location').textContent = name;
        document.getElementById('weather-desc').textContent = description;
        document.getElementById('temp').textContent = temp.toFixed(1);
        document.getElementById('price').textContent = `₹${finalPrice.toFixed(2)}`;
        document.getElementById('recommendation').textContent = recommendation;

        resultDiv.classList.remove('hidden');
    } catch (error) {
        errorDiv.textContent = "❌ Error: " + error.message;
        errorDiv.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
}
