export default function callWeatchAPI() {
    const APIKEY = "B875HGFZ2SFQPRQBBAE3KLLW8";

    async function fetchCityData(city) {
        let URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${APIKEY}`;
        const response = await fetch(URL);
        await processData(response);
    }

    async function processData(input) {
        const responseJSON = await input.json();
        console.log(responseJSON);
        console.log(responseJSON.address);
    }

    return {
        fetchCityData
    }
}