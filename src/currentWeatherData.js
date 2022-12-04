const locationData = data.records.location[0];

const weatherElements = locationData.weatherElement.reduce(
    (neededElements, item) => {
        if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
        }
        return neededElements;
    },
    {}
);

const currentWeatherData = {
    observationTime: locationData.time.obsTime,
    locationName: locationData.locationName,
    description: '多雲時晴',
    temperature: weatherElements.TEMP,
    windSpeed: weatherElements.WDSD,
    humid: weatherElements.HUMD,
};