export const getBetterPair = (prices: Array<number>) => {

  const pricesFixedNan = prices.map((price) => {
    return isNaN(price)? 0 : price;
  })

  const maxPrice = Math.max(...pricesFixedNan);
  const ind = pricesFixedNan.indexOf(maxPrice);
  return ind === 0 ? {
    dex1: 0,
    dex2: 1,
    ind: 0
  } : ind === 1 ? {
    dex1: 0,
    dex2: 2,
    ind: 1
  } : ind === 2 ? {
    dex1: 1,
    dex2: 0,
    ind: 2
  } : ind === 3 ? {
    dex1: 1,
    dex2: 2,
    ind: 3
  } : ind === 4 ? {
    dex1: 2,
    dex2: 0,
    ind: 4
  } : {
    dex1: 2,
    dex2: 1,
    ind: 5
  }
}