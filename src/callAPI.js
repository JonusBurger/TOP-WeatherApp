import errorHandler from "./errorHandler";

export default function callWeatchAPI() {
    const APIKEY = "B875HGFZ2SFQPRQBBAE3KLLW8";

    async function fetchCityData(city) {
        try {
            let URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${APIKEY}`;
            const response = await fetch(URL);
            const output = await processData(response);
            return output
        } catch(error) {
                errorHandler(error);
        }

    }

    async function processData(input) {

        const responseJSON = await input.json();
        const output = {"city": responseJSON.resolvedAddress, "currentWeather": responseJSON.currentConditions, "weatherForecast" : responseJSON.days};
        console.log(responseJSON);


        return output
    }

    return {
        fetchCityData
    }
}