export const convertToString = (number: number) => ((number + Number.EPSILON) / 100).toFixed(3);
