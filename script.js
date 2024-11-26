const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "0692ba1ca35bae830dd56094329aa04f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(`${url}`);
        const weather_data = await response.json();

        // If city is not found, show the "location not found" message
        if (weather_data.cod === "404") {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("City not found");
            return;
        }

        // If data is valid, show weather data
        if (weather_data.main && weather_data.weather) {
            location_not_found.style.display = "none";
            weather_body.style.display = "flex";

            // Update temperature, description, humidity, and wind speed
            temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
            description.innerHTML = `${weather_data.weather[0].description}`;
            humidity.innerHTML = `${weather_data.main.humidity}%`;
            wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

            // Switch based on the weather condition and update the weather image
            switch (weather_data.weather[0].main) {
                case 'Clouds':
                    weather_img.src = "/assets/cloud.png";
                    break;
                case 'Clear':
                    weather_img.src = "/assets/clear.png";
                    break;
                case 'Rain':
                    weather_img.src = "/assets/rain.png";
                    break;
                case 'Mist':
                    weather_img.src = "/assets/mist.png";
                    break;
                case 'Snow':
                    weather_img.src = "/assets/snow.png";
                    break;
                case 'Haze':
                    weather_img.src = "/assets/haze.png";
                    break;
                default:
                    weather_img.src = "/assets/404.png"; // Fallback image for other weather conditions
                    break;
            }

            console.log(weather_data);
        } else {
            // If the response does not contain the expected data structure
            console.error("Unexpected data format received from API");
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

// Trigger search on button click
searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
