import callWeatherAPI from "./callAPI";
import buildHTML from "./htmlHandler";
import errorHandler from "./errorHandler";

export default function formHandler() {
    const formInput = document.getElementById("city");
    const btn = document.getElementById("btn");

    const callWeatchAPIInstance = callWeatherAPI();
    const buildHTMLInstance = buildHTML();

    // Handler for Changing Units
    const switchBtn = document.getElementById("switch");
    let tempretaureTransformerActive = false;

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
        } catch(error) {
            errorHandler(error);
        }
    }

    btn.addEventListener("click", (e) => eventHandler(e));
    switchBtn.addEventListener("change", function() {
        if (this.checked) {
            tempretaureTransformerActive = true;
        } else {
            tempretaureTransformerActive = false;
        }
        })
}