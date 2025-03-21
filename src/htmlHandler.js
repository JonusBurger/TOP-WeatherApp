import unitTransform from "./unitTransformer";


const iconContext = require.context('../assets/icons', false, /\.png$/);
const MAPICONS = {
    "snow" : iconContext('./snowy.png'),
    "rain" : iconContext('./rainy.png'),
    "fog" : iconContext('./cloud.png'),
    "wind" : iconContext('./windy.png'),
    "cloudy" : iconContext('./cloudy.png'),
    "partly-cloudy-day" : iconContext('./cloudy.png'),
    "clear-day" : iconContext('./sun.png'),
    "partly-cloudy-night" : iconContext('./cloudy.png'),
    "clear-night" : iconContext('./sun.png'),
};

export default function buildHTML() {
    const forecastDiv = document.getElementById("forecastDiv");
    const headerSection = document.querySelector(".cityHeader");
    const cellSceleton = document.querySelector(".cell");
    const currentDataDiv = document.querySelector(".currentDataDiv");

    function emptyCells() {
        forecastDiv.replaceChildren();
    }

    function addTextToElement(element, text) {
        element.replaceChildren();
        const textElement = document.createElement("p");
        textElement.innerText = text;
        element.appendChild(textElement);
    }

    function emptyElement(element) {
        for (let child of element.childNodes) {
            child.innerText = "";
        }
    }

    function buildCell(dayInfo, transform) {
        // build Sceleton
        let newCell = cellSceleton.cloneNode(true);   

        // Fill Sceleton with day Data from API Call
        const dayDate = newCell.querySelector(".day");
        const avgTemp = newCell.querySelector(".medianTemp");
        const minTemp = newCell.querySelector(".mintemp");
        const maxTemp = newCell.querySelector(".maxtemp");
        const rainChance = newCell.querySelector(".rain");
        const icons = newCell.querySelector(".icons");

        addTextToElement(dayDate, dayInfo.datetime);
        addTextToElement(avgTemp, unitTransform(dayInfo.temp, transform));
        addTextToElement(minTemp, "T: " + unitTransform(dayInfo.tempmin, transform));
        addTextToElement(maxTemp, "H: " + unitTransform(dayInfo.tempmax, transform));
        addTextToElement(rainChance, `${dayInfo.precipprob}% Chance of rain`);
        
        forecastDiv.appendChild(newCell)
    }

    function buildTodayInfo(weatherData, transform) {
        const basicDataDiv = currentDataDiv.querySelector(".basicDiv");
        emptyElement(basicDataDiv);
        buildTodayBasicInfo(basicDataDiv, weatherData, transform);
        removeSkeletonFromElement(currentDataDiv)
    }

    function buildTodayBasicInfo(element, weatherData, transform) {
        const currentTemp = element.querySelector(".currentTemp");
        const currentIcon = element.querySelector(".currentIcon");
        const currentTempMin = element.querySelector(".currentTempMin");
        const currentTempMax = element.querySelector(".currentTempMax");

        addTextToElement(currentTemp, unitTransform(weatherData.currentWeather.temp, transform));

        // Display Icon of current weather
        emptyElement(currentIcon);
        const imgLink = MAPICONS[weatherData.currentWeather.icon];
        const img = loadIcon(imgLink, true);
        currentIcon.appendChild(img);

        addTextToElement(currentTempMin, "T: " + unitTransform(weatherData.weatherForecast[0].tempmin, transform));
        addTextToElement(currentTempMax, "H: " + unitTransform(weatherData.weatherForecast[0].tempmax, transform));
    }

    function loadIcon(path, large = false) {
        const img = document.createElement("img");
        img.src = path;
        const classIcon = large ? "largeIcon" : "Icon";
        img.classList.add(classIcon);
        return img
        
    }

    function buildHeader(cityName) {
        headerSection.innerText = cityName;
        removeSkeletonFromElement(headerSection);
    }

    function buildPage(weatherData, transform = false) {
        // clear old Data
        emptyCells();

        // Change Header
        buildHeader(weatherData.city);

        // build current Info
        buildTodayInfo(weatherData, transform);
        // build loop for days
        for (let day of weatherData.weatherForecast.slice(1,8)) {
            buildCell(day, transform);
        }
        removeSkeletonFromElement(forecastDiv);
    }

    function addSceletonAll() {
        forecastDiv.classList.add("skeleton");
        headerSection.classList.add("skeleton");
        currentDataDiv.classList.add("skeleton");
    }

    function removeSkeletonFromElement(element) {
        element.classList.remove("skeleton");
    }

    return {
        buildPage,
        addSceletonAll
    }
}


// To-DO: https://www.flaticon.com/free-icon/cloudy_1163657?term=weather&page=1&position=2&origin=style&related_id=1163657 <--Download