export default function buildHTML() {
    const mainDiv = document.getElementById("mainDiv");
    const cellSceleton = document.querySelector(".cell");

    function emptyCells() {
        mainDiv.replaceChildren();
    }

    function buildCell() {
        let newCell = cellSceleton.cloneNode(true);   
    }

    function buildPage(weatherData) {
        // clear old Data
        emptyCells();

        // Change Header
        console.log(weatherData.city)
        // build loop for days
        for (let day of weatherData.weatherForecast) {
            console.log(day);
        }
    }

    return {
        buildPage
    }
}