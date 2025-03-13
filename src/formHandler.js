import callWeatherAPI from "./callAPI";
import buildHTML from "./htmlHandler";

export default function formHandler() {
    const formInput = document.getElementById("city");
    const btn = document.getElementById("btn");

    const callWeatchAPIInstance = callWeatherAPI();
    const buildHTMLInstance = buildHTML();

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
        const city = getFormInfo();
        if (!city) {
            return
        }
        try {
            const result = await callWeatchAPIInstance.fetchCityData(city);
            buildHTMLInstance.buildPage(result);  
        } catch {
            console.log("Bad Request")
        }
    }

    btn.addEventListener("click", (e) => eventHandler(e));
}