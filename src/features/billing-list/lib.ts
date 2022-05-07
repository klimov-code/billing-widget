export const priceConvert = (price: number) => ((price + Number.EPSILON) / 100).toFixed(2);

export const round = (number: number): number => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};
