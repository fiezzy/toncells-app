export const asciiToHex = (addressStr: string): string => {
  let arr1 = [];

  for (let n = 0, l = addressStr.length; n < l; n++) {
    let hex = Number(addressStr.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }

  return arr1.join("");
};
