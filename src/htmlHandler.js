import unitTransform from "./unitTransformer";

const MAPICONS = {
    "snow" : "../assets/icons/snowy.png",
    "rain" : "../assets/icons/rainy.png",
    "fog" : "../assets/icons/cloud.png",
    "wind" : "../assets/icons/windy.png",
    "cloudy" : "../assets/icons/cloud.png",
    "partly-cloudy-day" : "../assets/icons/cloudy.png",
    "clear-day" : "../assets/icons/sun.png",
    "partly-cloudy-night" : "../assets/icons/cloudy.png",
    "clear-night" : "../assets/icons/sun.png",
};

export default function buildHTML() {
    const forecastDiv = document.getElementById("forecastDiv");
    const headerSection = document.querySelector(".cityHeader");
    const cellSceleton = document.querySelector(".cell");
    const currentDataDiv = document.querySelector(".currentDataDiv");

    function emptyCells() {
        forecastDiv.replaceChildren();
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

        dayDate.innerText = dayInfo.datetime;
        avgTemp.innerText = unitTransform(dayInfo.temp, transform);
        minTemp.innerText = "T: " + unitTransform(dayInfo.tempmin, transform);
        maxTemp.innerText = "H: " + unitTransform(dayInfo.tempmax, transform);
        rainChance.innerText = `${dayInfo.precipprob}% Chance of rain`;
        
        forecastDiv.appendChild(newCell)
    }

    function buildTodayInfo(weatherData, transform) {
        const basicDataDiv = currentDataDiv.querySelector(".basicDiv");
        emptyElement(basicDataDiv);
        buildTodayBasicInfo(basicDataDiv, weatherData, transform);
    }

    function buildTodayBasicInfo(element, weatherData, transform) {
        const currentTemp = element.querySelector(".currentTemp");
        const currentIcon = element.querySelector(".currentIcon");
        const currentTempMin = element.querySelector(".currentTempMin");
        const currentTempMax = element.querySelector(".currentTempMax");

        currentTemp.innerText = unitTransform(weatherData.currentWeather.temp, transform);
        // Display Icon of current weather
        emptyElement(currentIcon);
        const imgLink =  MAPICONS.weatherData.currentWeather.icon;
        const img = new Image(); // Create a new Image object
        img.onload = () => {
            // You can now use the image, e.g., append it to the DOM
            currentIcon.appendChild(img);
        };
        img.src = imgLink;

        currentTempMin.innerText = "T: " + unitTransform(weatherData.weatherForecast[0].tempmin, transform);
        currentTempMax.innerText = "H: " + unitTransform(weatherData.weatherForecast[0].tempmax), transform;
    }

    function buildHeader(cityName) {
        headerSection.innerText = cityName;
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
    }

    return {
        buildPage
    }
}


// To-DO: https://www.flaticon.com/free-icon/cloudy_1163657?term=weather&page=1&position=2&origin=style&related_id=1163657 <--Download