export default function buildHTML() {
    const forecastDiv = document.getElementById("forecastDiv");
    const headerSection = document.querySelector(".cityHeader");
    const cellSceleton = document.querySelector(".cell");

    function emptyCells() {
        forecastDiv.replaceChildren();
    }

    function buildCell(dayInfo) {
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
        avgTemp.innerText = dayInfo.temp;
        minTemp.innerText = dayInfo.tempmin;
        maxTemp.innerText = dayInfo.tempmax;
        rainChance.innerText = `${dayInfo.precipprob}% Chance of rain`;
        
        forecastDiv.appendChild(newCell)
    }

    function buildTodayInfo(currentData) {
        console.log(currentData);
    }

    function buildHeader(cityName) {
        headerSection.innerText = cityName;
    }

    function buildPage(weatherData) {
        // clear old Data
        emptyCells();

        // Change Header
        buildHeader(weatherData.city);

        // build current Info
        buildTodayInfo(weatherData.currentWeather);
        // build loop for days
        for (let day of weatherData.weatherForecast.slice(1,8)) {
            buildCell(day);
        }
    }

    return {
        buildPage
    }
}