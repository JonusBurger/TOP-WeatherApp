export default function unitTransform(input, mode = false) {
    if (mode) {
        return input + "°C"
    }

    return input + "°F"
}