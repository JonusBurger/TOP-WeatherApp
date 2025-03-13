import callWeatherAPI from "./callAPI";

export default function formHandler() {
    const formInput = document.getElementById("city");
    const btn = document.getElementById("btn");

    const callWeatchAPIInstance = callWeatherAPI();

    function getFormInfo() {
        const output = formInput.value;
        formInput.value = "";

        if (!output) {
            alert("Enter a City!");
        }

        return output
    }

    function eventHandler(e) {
        e.preventDefault();
        const city = getFormInfo();
        if (city) {
            console.log(city);
            const result = callWeatchAPIInstance.fetchCityData(city);
            console.log(result);    
        }
    }

    btn.addEventListener("click", (e) => eventHandler(e));
}