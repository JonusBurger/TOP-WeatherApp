import callWeatherAPI from "./callAPI";
import buildHTML from "./htmlHandler";
import errorHandler from "./errorHandler";
import switchHandler from "./switchHandler";

export default function formHandler() {
    const formInput = document.getElementById("city");
    const btn = document.getElementById("btn");

    const callWeatchAPIInstance = callWeatherAPI();
    const buildHTMLInstance = buildHTML();

    // Handler for Changing Units
    const switchBtn = document.getElementById("switch");
    let tempretaureTransformerActive = false;
    const switchHandlerInstance = switchHandler();
    let weatherData;

    function getFormInfo() {
        const output = formInput.value;
        formInput.value = "";

        if (!output) {
            alert("Enter a City!");
        }

        return output
    }

    async function eventHandler(e) {
        e.preventDefault();
        buildHTMLInstance.addSceletonAll();
        const city = getFormInfo();
        if (!city) {
            return
        }
        try {
            const result = await callWeatchAPIInstance.fetchCityData(city);
            buildHTMLInstance.buildPage(result, tempretaureTransformerActive);  
            weatherData = result;
        } catch(error) {
            errorHandler(error);
        }
    }

    btn.addEventListener("click", (e) => eventHandler(e));
    switchBtn.addEventListener("change", function() {
        if (this.checked) {
            tempretaureTransformerActive = true;
            switchHandlerInstance.setCelsiusActive();
            if (weatherData) {
                buildHTMLInstance.buildPage(weatherData, tempretaureTransformerActive);
            }
        } else {
            tempretaureTransformerActive = false;
            switchHandlerInstance.setFarenheitActive();
            if (weatherData) {
                buildHTMLInstance.buildPage(weatherData, tempretaureTransformerActive);
            }
        }
        })
}