// ./src/WeatherApp.js
import React from 'react';
import { useState } from 'react';
import Rain from "./image/rain.svg";
import Flow from "./image/airFlow.svg";
import Cloudy from "./image/day-cloudy.svg"
const WeatherApp = () => {
    fetch(
        'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization= &locationName=臺北',
    )
        .then(response => response.json())
        .then(data => {
            const locationData = data.records.location[0];
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                    if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                        neededElements[item.elementName] = item.elementValue;
                    }
                    return neededElements;
                },
                {},
            );
            setCurrentWeather({
                observationTime: locationData.time.obsTime,
                locationName: locationData.locationName,
                description: '多雲時晴',
                temperature: weatherElements.TEMP,
                windSpeed: weatherElements.WDSD,
                humid: weatherElements.HUMD,
            });
        });
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: '2019-10-02 22:10:00',
        locationName: '臺北市',
        description: '多雲時晴',
        temperature: 30,
        windSpeed: 0.1,
        humid: 0.1,
    });
    return (
        <div className="container">
            <div className="weather-card">
                <div className="Location">
                    <span>{currentWeather.locationName}</span>
                </div>
                <div className="Description">
                    <span>
                        {new Intl.DateTimeFormat('zh-TW', {
                        hour: 'numeric',
                        minute: 'numeric',
                        }).format(new Date(currentWeather.observationTime))}
                        {' '}
                        {currentWeather.description}
                    </span>
                </div>
                <div className="CurrentWeacher">
                    <div className="Temperature">
                        <span>
                            {Math.round(currentWeather.temperature)}
                        </span>
                        <span className="c"><sup>°C</sup></span>
                        <img src={Cloudy}/>
                    </div>
                </div>
                <div className="AirFlow">
                    <img src={Flow}/>
                    <span>{currentWeather.windSpeed} m/h</span>
                </div>
                <div className="Rain">
                    <img src={Rain}/>
                    <span>{currentWeather.humid * 100}%</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;