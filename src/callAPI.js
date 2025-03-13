export default function callWeatchAPI() {
    const APIKEY = "B875HGFZ2SFQPRQBBAE3KLLW8";

    async function fetchCityData(city) {
        try {
            let URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${APIKEY}`;
            const response = await fetch(URL);
            return await processData(response);
        } catch {
            console.log("Error")
        }

    }

    async function processData(input) {
        const responseJSON = await input.json();
        const output = {"city": responseJSON.address, "weather forecast" : responseJSON.days};
        return output
    }

    return {
        fetchCityData
    }
}