/*
 *  React Weather Application
 *  Name: Nicholas Raynes
 *  Date: November 6th 2022
 *  Description: A weather app where a user can enter a city name and then it
 *  displays the data related to the weather of the city through an external API.
 */

import "./styles.css";
import React, { useState } from "react";

const api = {
  key: "b7214983211ca378df507c10506cbac8",
  base: "https://api.openweathermap.org/data/2.5/"
};

export default function App() {
  
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
        });
    }
  };
  
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
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  
    return (
     <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 16) ? 'App Warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main !== "undefined") ? (
        <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

