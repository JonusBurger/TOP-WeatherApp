export default function unitTransform(input, mode = false) {
    if (mode) {
        const transformedInput = (input - 32) * (5/9);
        return transformedInput.toFixed(1) + "°C"
    }

    return input + "°F"
}