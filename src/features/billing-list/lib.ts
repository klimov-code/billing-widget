export const convert = (number: number) => ((number + Number.EPSILON) / 100).toFixed(2);

export const random = (min: number, max: number) => Math.random() * (max - min) + min;
