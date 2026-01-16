export function calculateFinalPrice(price, discount = 0) {
  if (!price || discount <= 0) return Math.round(price);

  return Math.round(price - (price * discount) / 100);
}
