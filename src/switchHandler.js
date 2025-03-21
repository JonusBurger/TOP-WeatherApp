export default function switchHandler() {
    const fahrenheitElement = document.getElementById("farenheit");
    const celsiusElement = document.getElementById("celsius");

    function setCelsiusActive() {
        fahrenheitElement.classList.add("deactive");
        celsiusElement.classList.remove("deactive");
    }
    function setFarenheitActive() {
        celsiusElement.classList.add("deactive");
        fahrenheitElement.classList.remove("deactive");
    }

    return {
        setCelsiusActive,
        setFarenheitActive
    }
}