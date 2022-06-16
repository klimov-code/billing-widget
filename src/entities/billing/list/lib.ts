export const convert = (number: number) => ((number + Number.EPSILON) / 100).toFixed(2);
