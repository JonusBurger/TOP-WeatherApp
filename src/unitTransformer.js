export default function unitTransform(input, mode = false) {
    if (mode) {
        const transformedInput = input;
        return transformedInput + "°C"
    }

    return input + "°F"
}