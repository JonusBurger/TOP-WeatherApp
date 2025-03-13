import callWeatherAPI from "./callAPI";

const callWeatchAPIInstance = callWeatherAPI();

callWeatchAPIInstance.fetchCityData("London");