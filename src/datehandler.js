export default function dateHandler() {
    const DAYMAPPING = [
        "Monday",
        "Tuesday",
        "Wednsday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    function getDayName(date) {
        let currentDate = new Date(date);
        const dayId = currentDate.getDay();
        return DAYMAPPING[dayId]
    }

    return {
        getDayName
    }
}