 const apiKey = "a9cd17ad5b3e31218c036de2f17a92dd"; 
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const cityInput = document.getElementById('city-input');
        const searchBtn = document.getElementById('search-btn');
        const weatherBox = document.getElementById('weather');
        const welcomeView = document.getElementById('welcome');
        const errorMsg = document.getElementById('error');
        const loadingIcon = document.getElementById('loading');
        const appContainer = document.getElementById('app-container');

        async function checkWeather(city) {
            if (!city) return;

            // UI State management
            errorMsg.style.display = 'none';
            loadingIcon.style.display = 'block';
            welcomeView.style.display = 'none';
            weatherBox.classList.remove('active');

            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                
                if (response.status == 404) {
                    throw new Error("City not found");
                }

                const data = await response.json();
                
                // Update UI with data
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('temp-val').textContent = Math.round(data.main.temp);
                document.getElementById('humidity-val').textContent = data.main.humidity + "%";
                document.getElementById('wind-val').textContent = data.wind.speed + " km/h";

                // Icon Mapping & Background colors
                const iconElement = document.getElementById('main-icon');
                const weatherMain = data.weather[0].main;
                
                updateTheme(weatherMain, iconElement);

                loadingIcon.style.display = 'none';
                weatherBox.classList.add('active');

            } catch (err) {
                loadingIcon.style.display = 'none';
                errorMsg.style.display = 'block';
                welcomeView.style.display = 'block';
            }
        }

        function updateTheme(condition, iconElement) {
            let iconClass = "fa-solid ";
            let gradient = "";

            switch(condition) {
                case "Clouds":
                    iconClass += "fa-cloud";
                    gradient = "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)";
                    break;
                case "Clear":
                    iconClass += "fa-sun";
                    gradient = "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)";
                    break;
                case "Rain":
                    iconClass += "fa-cloud-showers-heavy";
                    gradient = "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)";
                    break;
                case "Drizzle":
                    iconClass += "fa-cloud-rain";
                    gradient = "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)";
                    break;
                case "Mist":
                case "Haze":
                case "Fog":
                    iconClass += "fa-smog";
                    gradient = "linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)";
                    break;
                case "Snow":
                    iconClass += "fa-snowflake";
                    gradient = "linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)";
                    break;
                case "Thunderstorm":
                    iconClass += "fa-cloud-bolt";
                    gradient = "linear-gradient(135deg, #0f0c29 0%, #302b63 100%, #24243e 100%)";
                    break;
                default:
                    iconClass += "fa-cloud-sun";
                    gradient = "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)";
            }

            iconElement.className = iconClass + " main-weather-icon";
            appContainer.style.background = gradient;
        }

        searchBtn.addEventListener('click', () => {
            checkWeather(cityInput.value);
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                checkWeather(cityInput.value);
            }
        });