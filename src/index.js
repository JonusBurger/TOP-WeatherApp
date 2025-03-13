import callWeatherAPI from "./callAPI";

const callWeatchAPIInstance = callWeatherAPI();

const result = callWeatchAPIInstance.fetchCityData("London");
console.log(result);