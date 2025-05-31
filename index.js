const apiKey = "b4a2301o72e63fba90bf194b6f011t48";

function displayCurrentTime() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  document.getElementById(
    "current-date-time"
  ).textContent = `${day} ${hours}:${minutes}`;
}

displayCurrentTime();

document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("city-input");
  const city = input.value.trim();

  if (city) {
    document.getElementById("city-name").textContent = city;
    fetchWeatherData(city);
  }
});

function fetchWeatherData(city) {
  const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched Data:", data);

      if (data && data.temperature) {
        const temperature = Math.round(data.temperature.current);
        const weatherDescription = data.condition.description;
        const humidity = data.temperature.humidity;
        const wind = data.wind.speed;

        document.getElementById("temperature").innerHTML = `☀️ ${temperature}`;
        document.getElementById("weather-description").textContent =
          weatherDescription;
        document.getElementById("humidity").innerHTML = `${humidity}%`;
        document.getElementById("wind-speed").innerHTML = `${wind} km/h`;
      } else {
        console.error("Unexpected API response structure:", data);
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}
