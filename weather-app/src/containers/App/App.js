import React, { useState } from "react";

function App() {
  const api = {
    key: "4b3e61d509a14cd79c90d406e79d5d1a",
    baseURL: "https://api.openweathermap.org/data/2.5/",
  };

  // **********************************************************
  const [form, setForm] = useState({ city: "" });
  const [weather, setWeather] = useState([]); //Array of objects(json) or JSON array
  // **********************************************************
  // *********************Event handlers***********************
  // -----this is API fetching and also event handler for serach button-----
  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Please insert valid data");
    } else {
      const data = await fetch(
        `${api.baseURL}weather?q=${form.city}&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((data) => data);
      // console.log(data);
      setWeather({ weather: data });

      // now All data goes to 'weather' so far.
    }
  }

  const inputHandler = (e) => {
    let value = e.target.value;
    setForm({ city: value });

    // console.log(form.city);
  };
  // ***********************************************************
  // ***************none event handlers functions***************
  let d = new Date();
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year} `;
  };
  // ------------------------------
  const kelvinToCelsius = () => {
    let kelvin = weather.weather.main.temp;
    let celsius = Math.round(kelvin - 273.15);
    return celsius;
  };

  // ------------------------------
  return (
    // Dynamic CSS
    <div
      className={
        weather.weather != undefined
          ? weather.weather.main.temp > 289.15
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <form className="search-box">
          <input
            type="text"
            onChange={(e) => inputHandler(e)}
            className="search-bar"
            placeholder="City..."
            name="city"
          ></input>
          <button
            type="submit"
            onClick={(e) => weatherData(e)}
            className="search-button"
          >
            <img src="https://img.icons8.com/ios-filled/50/ffffff/detective.png" />{" "}
          </button>
        </form>
        {/* *** */}
        {weather.weather != undefined ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.weather.name} , {weather.weather.sys.country}
              </div>
              <div className="date">{dateBuilder(d)}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{kelvinToCelsius()}°C</div>
              <div className="weather">
                {weather.weather.weather[0].description}
              </div>
            </div>
          </div>
        ) : null}
        {/* *** */}
      </main>
    </div>
  );
}

export default App;
